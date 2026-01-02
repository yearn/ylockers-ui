# Spec: Boost Diagram With Wallet + Vault Context

## Context
Earn flows reference “boost” mechanics (weeks-to-max boost, ranges 1.0x–2.5x). Today the UI mainly uses a static image (`/charge.png`) in stake-related content, which doesn’t reflect the connected wallet’s current boost or the vault’s effective boost.

This spec explores upgrading that visual to a data-driven “boost diagram” that:
- Shows the user’s current boost progress (filled elements across weeks/levels).
- Shows an “Earn y<Asset>” (vault) boost state (e.g. effective boost for the vault strategy).
- Optionally overlays an average boost marker for context.

## Goals
- Replace or augment the static boost image with a reusable, data-driven component.
- Visualize the connected wallet’s *current* boost state clearly and compactly.
- Add a vault-mode variant that communicates the vault’s effective boost (or “max boost” if applicable).
- Keep the diagram consistent across apps (`crv`, `prisma`, `yb`).

## Non-Goals
- No changes to boost calculations or onchain logic.
- No complex animations required (optional subtle transitions only).
- No bespoke per-app diagram redesign; aim for a shared `--lib` component with theming via Tailwind classes.

## Data Sources (Existing)
From `packages/--lib/hooks/useData.ts` / `data.utilities`:
- `userActiveBoostMultiplier` (wallet current boost multiplier)
- `userProjectedBoostMultiplier` (wallet projected boost multiplier)
- `globalAverageBoostMultiplier` (average boost multiplier across stakers)
- Existing APR ranges already imply min/max boost (1.0x–2.5x)

Open question for vault boost:
- Yes: we can query the vault’s *staking account* (the `lockerTokenVaultStrategy` address) against the same onchain Utilities contract used for wallet boost:
  - `Utilities.getUserActiveBoostMultiplier(env.lockerTokenVaultStrategy)` → vault effective boost multiplier (scaled by `1e18`, like `userActiveBoostMultiplier`).
  - Optional label helper: `YearnBoostedStaker.approvedWeightedStaker(env.lockerTokenVaultStrategy)` → whether the vault strategy is whitelisted/“weighted” (i.e. should earn max boost immediately on new stakes).
- UX implication:
  - Prefer showing the numeric boost when available, but label it as “Auto-boosted (handled for you)” (and/or “Whitelisted”) to avoid implying it’s user-controlled.
  - If `approvedWeightedStaker` is `true`, it’s safe to present “Max boost” messaging (2.5x) for the vault.

## UX Requirements
Wallet diagram (native Earn stable token mode):
- Render a 4-week ladder (or whatever week model is canonical for the product) with discrete fill states.
- Fill should reflect current `userActiveBoostMultiplier`:
  - 1.0x = “week 0 / base”
  - 2.5x = “week 4 / max”
- Include a small label: `Your boost: {x}x`
- Optional: show `Projected boost: {x}x` in a lighter style.
- Optional: show an “Average” marker line based on `globalAverageBoostMultiplier`.

Vault diagram (Earn y<Asset> mode):
- Show a similar ladder but labeled as “Vault boost”.
- If vault boost is known, fill accordingly; if assumed max, show “Max boost” badge.
- If unknown, show “Boost handled by vault” with neutral/disabled fill.

## Proposed Component API
Add `packages/--lib/components/BoostDiagram.tsx`:
- Props:
  - `mode: 'wallet' | 'vault'`
  - `currentBoost: number` (e.g. `1.37`)
  - `projectedBoost?: number`
  - `averageBoost?: number`
  - `maxBoost?: number` (default `2.5`)
  - `weeks?: number` (default `4`)
  - `className?: string`

Internals:
- Convert boost multiplier to a normalized progress `p = (currentBoost - 1) / (maxBoost - 1)`.
- Map `p` to filled segments across `weeks` (discrete), plus optionally a partial fill within the active segment.
- Keep layout fixed-size to avoid jank.

## Integration Targets (First Pass)
Replace the static `/charge.png` usage in stake sections:
- `packages/yb/app/app/[tab]/page.tsx` (stake panel content)
- `packages/prisma/app/app/[tab]/page.tsx` (stake panel content)
- `packages/crv/app/app/[tab]/page.tsx` (stake panel content)

Add vault diagram in deposit panels (right side):
- Start with `VaultDataBox` or the deposit page sidebar, depending on where it’s most visible.

## Acceptance Criteria
- With wallet connected:
  - Wallet boost diagram fills reflect `userActiveBoostMultiplier`.
  - Average marker (if enabled) reflects `globalAverageBoostMultiplier`.
- With wallet disconnected:
  - Diagram renders in a neutral state (no crash, no NaN).
- Vault mode shows a clear “vault boost” visualization or a deliberate “handled by vault / max boost” message.
- No layout breakage on mobile/desktop.

## Manual QA Steps
- Run `bun dev:yb`, `bun dev:prisma`, `bun dev:crv`.
- Connect a wallet with non-zero staked balance and verify the diagram changes.
- Compare the diagram state with the numeric boost multiplier shown elsewhere (if present).
- Check both native and vault modes for readability.

## Open Questions
- Is the boost schedule always “4 weeks to max” across all lockers, or does it vary by app?
- For vault boost:
  - Use `Utilities.getUserActiveBoostMultiplier(env.lockerTokenVaultStrategy)` (and optionally `approvedWeightedStaker`) rather than treating vault boost as unknowable.
  - Still label vault mode as “Auto-boosted (handled for you)” even when a numeric multiplier is shown.
