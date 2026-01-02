# Spec: Clamp Active APR Range Length

## Context
In the Earn panel (active APR range) the min/max values are displayed with two decimal places. When both values reach 5 digits total (e.g. `123.45%`), the range layout no longer has room for the arrow, and the arrow icon drops off.

## Goals
- Keep the arrow visible between the min/max active APR values.
- Clamp the displayed APR value length so large values don’t overflow.
- Reduce precision when APRs are >= 100% (no need for two decimal places).

## Non-Goals
- No redesign of the Earn panel layout or typography.
- No changes to APR computations or data sources.
- No changes to other APR/APY surfaces outside the active/projected range.

## Proposed Implementation
- Update `packages/--lib/components/YbsDataBox.tsx` where `activeApr` and `projectedApr` are formatted.
- Introduce a helper formatter for range values (min/max):
  - If APR >= 100, reduce to a shorter format (e.g. 0 or 1 decimal) to keep the numeric portion to 4 digits max.
  - If APR < 100, keep the current two-decimal formatting.
- Apply the formatter to both min and max values used in the range rows.

## Acceptance Criteria
- When active or projected APR values are >= 100%, the displayed values are clamped to 4 digits max (e.g. `123%` or `123.4%`, but not `123.45%`).
- The range arrow remains visible between min/max values in the Earn panel.
- APRs below 100% retain the current two-decimal formatting.
- No changes to other APR/APY displays outside the range rows.

## Manual QA Steps
- Run `bun dev:crv` or `bun dev:yb` and open the Earn panel (`/app/...`).
- Simulate or mock active/projected APRs >= 100% and verify:
  - Values are clamped to 4 digits max.
  - The arrow remains visible between min/max values.
- Verify APR values < 100% still show two decimals.
