# Spec: ENS Support (Name + Optional Avatar)

## Context
Across apps, the connected wallet “launch” button currently displays a shortened address via `fAddress(account.address)` (see `packages/*/app/app/[tab]/page.tsx`).

This spec adds ENS resolution so users see a human-readable identifier when available.

## Goals
- When a wallet is connected, resolve the address to an ENS name and display it instead of the shortened address.
- Fall back to the current shortened address when no ENS name exists or resolution fails.
- Keep behavior consistent across all locker apps (`crv`, `prisma`, `yb`).

## Non-Goals
- No requirement to support non-ENS naming systems (e.g. Unstoppable Domains).
- No changes to wallet connection flow (RainbowKit).

## UX Requirements
- Header/connect button shows:
  - `vitalik.eth` (or similar) if resolvable
  - otherwise `0x1234...abcd`
- Names should not overflow the button:
  - If too long, truncate with CSS (preferred) rather than altering the ENS string.
- Loading state:
  - Option A: show shortened address immediately, then swap to ENS when loaded.
  - Option B: show a subtle skeleton/ellipsis until resolved.
  - Prefer A to avoid layout shift and “blank” states.

Optional enhancement (separate checkbox):
- Show ENS avatar in the header button (small 20–24px) when available.

## Proposed Implementation
1. Add a shared hook in `--lib`, e.g. `packages/--lib/hooks/useEnsDisplay.ts`:
   - Input: `address?: 0x…`
   - Output: `{displayName: string; ensName?: string; isLoading: boolean}`
   - Uses wagmi:
     - `useEnsName({address, chainId: 1})`
     - (optional) `useEnsAvatar({name: ensName, chainId: 1})`
   - Fallback displayName:
     - `fAddress(address)` when no ENS name or during error
2. Update each app’s Earn page header usage to pass `launchText={displayName}`:
   - `packages/crv/app/app/[tab]/page.tsx`
   - `packages/prisma/app/app/[tab]/page.tsx`
   - `packages/yb/app/app/[tab]/page.tsx`

If we also want ENS in other places (account modal trigger, etc.), apply the same hook where `fAddress(...)` is used.

## Acceptance Criteria
- With a connected wallet that has ENS:
  - Header button shows the ENS name.
- With a connected wallet without ENS:
  - Header button shows the shortened address (unchanged from today).
- With wallet disconnected:
  - Header button shows “Connect Wallet” (unchanged).
- No crashes on unsupported networks; ENS lookup is limited to mainnet (`chainId: 1`).

## Manual QA Steps
- Connect a wallet with known ENS on mainnet and confirm name display.
- Connect a wallet without ENS and confirm fallback.
- Toggle connect/disconnect and verify button text updates correctly.

## Open Questions
- Do we want ENS resolution only on mainnet, or also on testnets where applicable?
- Should we cache ENS name in localStorage to avoid repeated lookups, or rely on wagmi caching?

