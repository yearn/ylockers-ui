# Spec: APR/APY Hybrid Odometer Display

## Context
APR/APY values are currently rendered as plain formatted strings (e.g. `fPercent(...)`) in multiple places, notably:
- `packages/--lib/components/ExperienceToggle.tsx` (staker APR + vault APY pills)
- `packages/--lib/components/YbsDataBox.tsx` (active/projected/user APRs)
- `packages/--lib/components/VaultDataBox.tsx` (estimated auto-compound APY)

This spec explores a “hybrid” number display: most digits remain static, while the final displayed digit subtly “odometer slides” within its slot to convey additional precision beyond the cutoff.

## Goals
- Provide a subtle sense of live movement without making the number hard to read.
- Keep the currently displayed precision (e.g. `12.34%`) while using hidden precision to drive the final digit’s vertical offset.
- Motion should be smooth and consistent (no jitter) even when upstream data updates infrequently.
- Easy to opt-in per surface (start with 1–3 high-visibility locations).

## Non-Goals
- No new visual redesign of the APR/APY cards/pills.
- No animation of all digits (only the final displayed digit gets motion).
- No attempt to make the value “more accurate”; this is a presentation/UX enhancement.

## Proposed UX Behavior
For a display with `shownDecimals = 2`:
- Render the formatted percent string as usual, but replace the final digit (the 2nd decimal) with a “digit tape”.
- The tape shows 0–9 stacked vertically; the active digit is centered.
- The tape is translated slightly up/down based on the next hidden decimal (`hiddenDecimals = 1`), producing a fractional offset.

Example:
- Value: `12.345%`
- Visible: `12.34%`
- Final visible digit: `4`
- Hidden digit: `5` → tape offset `0.5` of a digit height (halfway toward `5`)

## Smoothing Model
To avoid jumpy movement:
- Maintain a “previous sample” of the APR/APY (e.g. from ~60 seconds ago) and tween toward the latest value over a fixed interval.
- Use a monotonic interpolation timebase (wall-clock) so the motion speed is consistent.

Implementation options:
1. Use `framer-motion` (already a dependency) to animate a numeric `MotionValue` from `prev` → `next`.
2. A lightweight `requestAnimationFrame` loop (only if avoiding framer in this component).

## Proposed Implementation
1. Create a shared component in `--lib`, e.g. `packages/--lib/components/AnimatedPercent.tsx`:
   - Props:
     - `value: number` (fractional, same units expected by `fPercent`)
     - `shownDecimals?: number` (default `2`)
     - `hiddenDecimals?: number` (default `1`)
     - `sampleMs?: number` (default `60000`)
     - `className?: string`
     - `fallback?: React.ReactNode` (for the existing `🌈✨%` case)
   - Behavior:
     - Animates internal value from last sample to latest.
     - Formats the “static” prefix digits (`12.3`) + renders an animated last digit tape for the final digit (`4`) + appends `%`.
2. Start by integrating in these high-signal locations only:
   - `packages/--lib/components/ExperienceToggle.tsx`
   - `packages/--lib/components/VaultDataBox.tsx`
   - (Optional) one value in `packages/--lib/components/YbsDataBox.tsx` (e.g. Average APR)
3. Avoid applying this to large lists/tables (`Vaults`) initially to prevent perf regressions.

## Accessibility
- Ensure the displayed text still reads correctly with screen readers (e.g. include an `aria-label` with the full formatted percent).
- Respect `prefers-reduced-motion`: render static text only when enabled.

## Acceptance Criteria
- The “final digit” of selected APR/APY displays has subtle vertical motion reflecting hidden precision.
- Motion is smooth for at least 60 seconds between samples (no jitter on re-render).
- With `prefers-reduced-motion`, the display is fully static and matches current formatting.
- No layout shift: the animated digit occupies fixed width/height equal to a normal digit.

## Manual QA Steps
- Open any app (`bun dev:crv`, `bun dev:prisma`, `bun dev:yb`) and check:
  - Toggle pills show stable, readable numbers.
  - The last digit moves subtly (no full rolling).
  - Refreshing doesn’t cause violent jumps.
  - Toggle OS/browser reduced-motion setting and confirm animation stops.

## Open Questions
- Should the hidden precision be derived from actual extra decimals (preferred) or from a deterministic synthetic function to guarantee motion even when values are constant?
- Do we want the tape to move only upward (always “counting up”), or reflect the true direction of change (up/down)?

