# Spec: Token Logos In Earn Toggle

## Context
The “Earn” page uses `packages/--lib/components/ExperienceToggle.tsx` to render a 2-option toggle:
- `EARN {env.stableTokenName}` → `/app/stake`
- `EARN {env.lockerTokenName}` → `/app/deposit`

This spec adds token logos to each option (stable token + locker token), e.g. `crvUSD` + `yYB` (or `yCRV`).

## Goals
- Show the stable token logo in the left pill and the locker token logo in the right pill.
- Keep the current text labels and APY pill unchanged.
- No layout shift when logos load (fixed size).
- Graceful fallback when an icon can’t be resolved (don’t break the toggle).

## Non-Goals
- No redesign of the toggle layout/colors.
- No changes to routing (`/app/stake`, `/app/deposit`) or APY calculations.
- No new design system / icon library work beyond what’s needed for these two logos.

## UX Requirements
- Logo appears inline between `EARN` and the token name (or immediately before the token name).
- Logo size: 18–20px, circular (or rounded) crop.
- Spacing: 6–8px between logo and text.
- Works on mobile and desktop; click target remains the full pill.
- Accessibility: meaningful `alt` text (e.g. `crvUSD logo`), decorative if redundant.

## Data / Assets
Preferred source: Smol Assets token logos (already allowed by Next image `remotePatterns` in apps).

Proposed URL shape:
- `${env.smolAssetsUrl}/token/1/${tokenAddress}/logo-128.png`

Token addresses:
- stable token: `env.stableToken`
- locker token: `env.lockerToken`

Fallbacks (in order):
1. If token address is `zeroAddress` or missing, omit the logo (text-only).
2. If the image fails to load, hide it (text-only).

## Proposed Implementation
1. Extend `TEnv` to include `smolAssetsUrl: string` (or `tokenLogoBaseUrl: string`).
   - File: `packages/--lib/tools/envType.ts`
2. Add `smolAssetsUrl` to each app’s exported `ENV` object:
   - `packages/crv/constants.ts`
   - `packages/prisma/constants.ts`
   - `packages/yb/constants.ts`
3. Ensure `packages/yb/constants.ts` has a real `STABLE_TOKEN` address for `crvUSD` (not `zeroAddress`) so the logo can resolve.
4. Update `packages/--lib/components/ExperienceToggle.tsx`:
   - Compute `stableLogoSrc` and `lockerLogoSrc` from `env.smolAssetsUrl` + addresses.
   - Render each logo via `next/image` (or `ImageOrFallback` with a “hide on error” strategy).
   - Keep the existing flex layout; add a small inline flex wrapper for `EARN + logo + symbol`.

## Acceptance Criteria
- In `crv`, toggle shows `crvUSD` logo on the left and `yCRV` logo on the right.
- In `yb`, toggle shows `crvUSD` logo on the left and `yYB` logo on the right.
- In `prisma`, toggle shows `mkUSD` logo on the left and `yPRISMA` logo on the right.
- If an icon URL fails, the toggle still renders correctly with text only.
- No visible horizontal “jump” when icons load.

## Manual QA Steps
- `bun dev:crv` → open `/app/stake` and `/app/deposit`; verify both pills show the correct icons.
- `bun dev:yb` → same.
- `bun dev:prisma` → same.
- Resize to mobile width; ensure pills remain readable and clickable.

## Open Questions
- Should we prefer local `public/*-logo.svg` assets when present (e.g. `packages/crv/public/ycrv-logo.svg`), or standardize on Smol Assets everywhere?
- Do we want a shared placeholder asset for failed icons, or is “text-only on failure” acceptable?

