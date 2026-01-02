# Spec: yYB Home APY Uses yvyYB APR

## Context
The yYB marketing home page currently renders an APR value using the global boosted staker APR (`data.utilities.globalAverageApr`). The request is to show the yvyYB vault APR-derived APY instead, so the homepage reflects the same vault yield users earn via yvyYB.

## Goals
- Show the yvyYB vault APR-derived APY on the yYB home page.
- Keep the existing fallback behavior when the value is unavailable (display placeholder).
- Align the homepage value with the vault APY displayed elsewhere in the yYB app.

## Non-Goals
- No changes to other product home pages (`crv`, `prisma`).
- No visual redesign of the hero/CTA layout.
- No changes to how APR/APY is computed in shared hooks beyond wiring the correct value.

## Proposed Implementation
- Update `packages/yb/app/page.tsx`:
  - Replace the current use of `data.utilities.globalAverageApr` with the yvyYB vault APR-derived APY.
  - Prefer the existing `useVaultApy(YDAEMON, ENV)` hook (already used elsewhere) to compute APY from the yvyYB APR source.
  - If the returned APY is zero or undefined, keep the placeholder ("—%") and tooltip copy.
  - Confirm the label reads "APY" (or "APR" if product wants to keep labeling); keep in sync with the chosen value.

## Acceptance Criteria
- On the yYB home page, the displayed yield value is derived from the yvyYB vault APR and rendered as APY.
- The displayed value matches the yvyYB vault APY shown in in-app surfaces (e.g., experience toggle or vault data box).
- If the yvyYB APR value is unavailable, the placeholder appears instead of a misleading number.
- No changes to `crv` or `prisma` home pages.

## Manual QA Steps
- Run `bun dev:yb` and open the yYB home page (`/`).
- Compare the hero APY value against the yvyYB vault APY shown in the app (e.g., experience toggle/vault data box).
- Confirm the placeholder appears if APR/APY data is zero/unavailable (e.g., simulate by disconnecting data or during first-week migration).
