# Spec: “Earn” Copy + “Stake/Deposit/Activate” Terminology

## Context
On the Earn page (`packages/*/app/app/[tab]/page.tsx`), the main card title (`<h1>`) currently uses language like:
- `Stake ${LOCKER_TOKEN_NAME}` for the left side (stake/unstake/claim/get/learn)
- `Auto-Compound ${LOCKER_TOKEN_NAME}` for the right side (deposit/withdraw/learn)

However, the UI conceptually presents two earning modes (see `packages/--lib/components/ExperienceToggle.tsx`):
- Earn `{STABLE_TOKEN_NAME}` (native “boosted staker” / manual mechanics)
- Earn `{LOCKER_TOKEN_NAME}` (vault auto-compounding)

The intent is to align the wording with user mental model (“Earn X”) and reconsider whether “Stake” is the best verb.

## Goals
- Replace the main card title copy with:
  - Left side: `Earn {STABLE_TOKEN_NAME}`
  - Right side: `Earn {LOCKER_TOKEN_NAME}`
- Explore replacing the verb “Stake” in tabs and section labels with a clearer term:
  - Candidates: `Deposit`, `Activate`, or another term consistent with receipt-token vs non-receipt flows.
- Keep meaning consistent across apps (`crv`, `prisma`, `yb`).

## Non-Goals
- No changes to onchain behavior, receipts, or contract interactions.
- No full copy rewrite of every paragraph in the app; focus on navigation labels and the main title first.
- No visual redesign of the tabs/toggle.

## UX / Copy Requirements
1. Main card title:
   - When in “native earning” tabs (`stake`, `unstake`, `claim`, `get`, `learn_more_stake`):
     - Title shows `Earn {STABLE_TOKEN_NAME}`
   - When in “vault earning” tabs (`deposit`, `withdraw`, `learn_more_deposit`, and any vault-related get tab like `get2`):
     - Title shows `Earn {LOCKER_TOKEN_NAME}`
2. Verb selection principles:
   - Avoid ambiguous “Stake” where it reads like “assets are at stake” rather than “staked to earn”.
   - Prefer terms that distinguish:
     - Native mode: user’s y<Asset> is “activated” (boost mechanics apply; rewards are in stable token).
     - Vault mode: user “deposits” into a vault and earns more y<Asset> (auto-handled; receipt-token semantics).
3. Consistency:
   - Whatever terms are chosen must be used in:
     - Sub-tab labels (`Header` items inside `TabContent`)
     - Section subtitles (`<span className="font-thin pb-1 ...">...`)

## Proposed Implementation (Phased)
### Phase 1 (Low risk): Main card title only
Update `TabContent` `<h1>` in each app:
- Files:
  - `packages/yb/app/app/[tab]/page.tsx`
  - `packages/prisma/app/app/[tab]/page.tsx`
  - `packages/crv/app/app/[tab]/page.tsx`
- Replace the current `Stake ...` and `Auto-Compound ...` title mapping with:
  - `Earn ${STABLE_TOKEN_NAME}` for leftActive tabs
  - `Earn ${LOCKER_TOKEN_NAME}` for rightActive tabs

### Phase 2 (Exploration): Rename “Stake” tab + labels
Decide the new verb for native mode:
- Option A: `Activate` / `Deactivate` (instead of Stake/Unstake)
- Option B: `Deposit` / `Withdraw` (native mode uses Deposit too; risk: conflates with vault deposit)
- Option C: Keep `Stake` but add clarifier copy (e.g. “Activate (Stake)”), then later simplify.

After choosing, update:
- Sub-tabs in each app’s `TabContent`:
  - Replace item text `Stake`, `Unstake` with chosen terms.
- Key section labels on those screens (keep the rest unchanged initially).

## Acceptance Criteria
- When navigating between native/vault tabs, the main title reads “Earn {token}” matching the Earn toggle.
- No broken routing: tab links remain the same (`/app/stake`, `/app/deposit`, etc.).
- Copy changes are consistent across `crv`, `prisma`, `yb`.

## Manual QA Steps
- `bun dev:yb`, `bun dev:prisma`, `bun dev:crv`
- For each app:
  - Visit `/app/stake` → title shows `Earn {STABLE_TOKEN_NAME}`
  - Visit `/app/deposit` → title shows `Earn {LOCKER_TOKEN_NAME}`
  - Click through sub-tabs and confirm titles remain correct for the mode.

## Open Questions
- Should vault-mode title be `Earn {LOCKER_TOKEN_NAME}` or `Earn More {LOCKER_TOKEN_NAME}` (to reflect compounding)?
- For `crv`, which tabs count as “vault mode” given `get2` exists?
- Do we want to rename “Claim Rewards” to something that matches the “Earn {STABLE_TOKEN_NAME}” framing?

