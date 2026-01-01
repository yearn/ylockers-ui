# Spec: Prioritize “Get y<Asset>” When Locker Balance Is 0

## Context
Each app’s Earn screen (`packages/*/app/app/[tab]/page.tsx`) has a left-side set of sub-tabs rendered via the app `Header` component. One of these is the “Get y<Asset>” tab:
- `crv`: “Get yCRV” (`/app/get`, `/app/get2`) → Zap UI (`packages/crv/components/Zap`)
- `prisma`: “Get yPRISMA” (`/app/get`) → Mint UI
- `yb`: “Get yYB” (`/app/get`) → Mint UI

Currently the default “Earn” entrypoint is `/app/stake`, even when the connected wallet has `0` locker token balance (i.e. they can’t stake yet).

## Goal
When a connected wallet has `0` locker token balance, guide the user toward the “Get y<Asset>” flow by prioritizing that tab.

## Non-Goals
- No changes to onchain behavior or zap/mint logic.
- No changes to the top-level nav structure beyond what’s required to prioritize the tab.

## Definition: “Underlying Asset”
For this feature, “underlying asset” means the locker token the user must hold to stake:
- locker token balance = `useData(...).data.locker.balance`

## Proposed UX Behavior (Least-Surprising)
When wallet is connected and `locker.balance === 0n`:
1. Visually prioritize “Get y<Asset>” in the left sub-tab bar:
   - Move it to the first position in the items list.
   - Add a notification dot (reusing `Header`’s `notification` indicator).
2. Add a small inline CTA in the Stake view (only when on `/app/stake`):
   - “You have 0 {LOCKER_TOKEN_NAME}. Get {LOCKER_TOKEN_NAME} to start earning.”
   - Link to `/app/get` (or `/app/get2` if that’s the canonical get route).

Optional (more aggressive) behavior to consider later:
- Auto-redirect from `/app/stake` → `/app/get` for connected wallets with `0` locker balance (one-time per session).

## Implementation Notes
Data source:
- `packages/--lib/hooks/useData.ts` already provides `data.locker.balance`.

Where to implement:
- In each app’s `TabContent` header items builder inside `packages/*/app/app/[tab]/page.tsx`:
  - Reorder `items` when `data.locker.balance === 0n`.
  - Set `notification: true` on the “Get …” item when prioritized.
  - Render the inline CTA in the `tab === 'stake'` branch when balance is 0.

Routing:
- For apps with only `/app/get`, use that.
- For `crv`, decide which route is canonical for “get”:
  - If both `/app/get` and `/app/get2` are kept, ensure the CTA goes to the preferred one and the tab label matches.

## Acceptance Criteria
- With wallet connected and `locker.balance === 0n`:
  - “Get y<Asset>” appears first in the left sub-tabs and shows a notification dot.
  - The Stake tab shows a clear CTA linking to the Get flow.
- With wallet connected and `locker.balance > 0n`:
  - Sub-tab ordering and visuals match current behavior (no dot).
- With wallet disconnected:
  - No special prioritization is applied.

## Manual QA Steps
- Connect a wallet with 0 locker token:
  - Visit `/app/stake` and confirm the CTA + tab prioritization.
  - Click the “Get …” tab and ensure the existing zap/mint flow works unchanged.
- Connect a wallet with non-zero locker token:
  - Confirm no “Get …” prioritization appears.

## Open Questions
- Should the “0 balance” check consider vault holdings/staked positions too (e.g. `staker.balance` or `strategy.balance`)?
- For `crv`, should we consolidate `/app/get` and `/app/get2` so there is a single canonical “Get yCRV” route?

