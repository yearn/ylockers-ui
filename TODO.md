# TODO

Lightweight, in-repo running list while reviewing/using the app.

## Inbox (triage later)
- [ ] (YYYY-MM-DD) **{type}**: {short summary} — {where/route} — {notes} — spec: `docs/specs/<slug>.md`

## Bugs
- [ ] (YYYY-MM-DD) {summary} — {expected} / {actual} — {repro steps}

## UX / UI
- [ ] (2026-01-01) Explore adding token logos to the tab switcher for “Earn crvUSD” and “Earn yYB” (or yCRV equivalent) — tab switch component — spec: `docs/specs/experience-toggle-token-logos.md`.
- [ ] (2026-01-01) Explore APR/APY number display that blends static text with odometer-style motion: keep main digits static, and animate the final shown digit’s position based on additional precision (e.g., using the value from 1 minute ago for smooth/consistent motion) — APR/APY UI (ExperienceToggle/Ticker/etc.) — spec: `docs/specs/apr-apy-hybrid-odometer-display.md`.
- [ ] (2026-01-01) Zap tab (“Get y<Asset>”) should be prioritized when wallet has 0 balance of the underlying asset — define behavior (default tab? highlight CTA?) and implement in relevant app(s) (e.g. `crv`, `yb`, `prisma`) — spec: `docs/specs/get-tab-priority-when-zero-locker-balance.md`.
- [ ] (2026-01-01) Explore copy/terminology in main card header + tabs: replace “Stake {LOCKER_TOKEN_NAME} / Auto-Compound {LOCKER_TOKEN_NAME}” with “Earn {STABLE_TOKEN_NAME} / Earn {LOCKER_TOKEN_NAME}”; evaluate whether “Stake” should become “Deposit” or “Activate” for native earning vs vault receipt-token flow — spec: `docs/specs/earn-copy-and-activate-terminology.md`.
- [ ] (2026-01-01) Explore a more comprehensive boost diagram: show current wallet boost as filled week/level elements; add an “Earn {LOCKER_TOKEN_NAME}” vault boost visualization; consider an average-boost demarcation line for staked y<Asset> — spec: `docs/specs/boost-diagram-wallet-and-vault.md`.
- [ ] (YYYY-MM-DD) {summary} — {screen} — {why it matters}

## Tech Debt
- [ ] (YYYY-MM-DD) {summary} — {package/path} — {idea}

## Docs
- [ ] (YYYY-MM-DD) {summary} — {file/section}

## Done
- [x] (2026-01-01) Add `TODO.md` backlog file.
