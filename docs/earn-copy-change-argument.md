# Argument Document: Earn Copy & Terminology Changes

## Executive Summary

This document presents balanced arguments for and against the proposed language changes in the "Earn" Copy + "Stake/Deposit/Activate" Terminology spec. The core proposal is to unify card titles around "Earn {token}" language and potentially rename the "Stake" verb to "Activate" or "Deposit" to better reflect underlying mechanics.

---

## ARGUMENTS IN FAVOR

### 1. **Alignment with User Mental Model**

**Reasoning:** Users interact with these products to *earn* returns, not to "stake" in the abstract. The current titles ("Stake crvUSD", "Auto-Compound Prisma") obscure the primary user intent.

**Impact:** A unified "Earn {token}" framing directly mirrors how users explain their activity ("I'm earning stable tokens" vs. "I'm staking—whatever that means"). This reduces cognitive load and clarifies the value proposition at a glance.

---

### 2. **Disambiguation of "Stake"**

**Reasoning:** "Stake" is ambiguous:

- Literal: Assets are at risk / in danger.
- Crypto colloquial: Assets are locked to produce returns.
- The current UI uses it for the *native* earning mode but not consistently across all app variants.

**Impact:** Replacing "Stake" with "Activate" (for native mode) creates a clearer mental boundary:

- **Activate** = user's balance is "activated" in a boost/rewards scheme (stable-token earnings).
- **Deposit** = user's balance is deposited into a vault (locker-token auto-compounding).

This distinction educates users about two fundamentally different earning mechanics without requiring them to read docs.

---

### 3. **Consistency Across Multi-App Suite**

**Reasoning:** The ylockers-ui suite includes `crv`, `prisma`, and `yb` apps, each serving different tokens. Currently, terminology may drift between apps or remain unclear per app.

**Impact:** Standardizing on "Earn {token}" and consistent verbs across all three apps reinforces a cohesive product family and simplifies onboarding when users move between apps.

---

### 4. **Reduced Jargon Barrier for New Users**

**Reasoning:** Crypto-native users understand "stake," but mainstream users do not. Yield farming is still a niche product; the language should be accessible.

**Impact:** "Earn" is universally understood; "Activate" is clearer than "Stake" for non-crypto users. Over time, this lowers the entry barrier and may expand addressable audience.

---

### 5. **Better SEO & Findability**

**Reasoning:** Users searching "how to earn passive income with crvUSD" are more likely to land on the page if the title explicitly says "Earn crvUSD" rather than "Stake crvUSD."

**Impact:** Modest but cumulative benefit to organic traffic and user discovery.

---

## ARGUMENTS AGAINST

### 1. **Losing Precision of Industry Terminology**

**Reasoning:** In DeFi, "stake" and "deposit" have specific technical meanings. Removing "stake" flattens the distinction between PoS-like staking and vault deposits.

**Impact:** Power users and auditors may find the UI less precise. Documentation must compensate with more explanatory text. For a protocol-focused product, this loss of clarity may be a step backward.

---

### 2. **Risk of User Confusion During Transition**

**Reasoning:** Existing users are accustomed to "Stake" and "Auto-Compound" language. Rebranding mid-product lifecycle can create friction: "Where did the Stake tab go?" "Is this a different product?"

**Impact:** Short-term support burden, possible user disorientation, and reduced trust if the change is not well-communicated. Analytics may show a dip in engagement if users can't immediately locate familiar flows.

---

### 3. **"Earn {token}" Title May Become Generic / Non-Differentiating**

**Reasoning:** Many yield products use "Earn" in their titles. The proposed change makes Yearn's UI language indistinguishable from competitors (e.g., Lido's "Earn ETH," Aave's "Earn AAVE").

**Impact:** Loses an opportunity to reinforce brand identity. The specificity of "Stake" and "Auto-Compound" once made the UI memorable; "Earn" is bland.

---

### 4. **Difficulty Implementing "Activate" Consistently**

**Reasoning:** The term "Activate" is borrowed from other products (e.g., "activate a card"); it's not standard in DeFi. Implementation risks include:

- "Activate" does not clearly convey that rewards are *earned*—it sounds like an on/off switch.
- Users may think they need to "activate" on every interaction (not a one-time event).
- "Activate"/"Deactivate" asymmetry is awkward compared to "Stake"/"Unstake."

**Impact:** Additional documentation and tutorial overhead. The new term may require as much explanation as the old one, negating the clarity benefit.

---

### 5. **Breaking Existing Patterns Across Yearn Ecosystem**

**Reasoning:** Other Yearn products (vaults, governance, etc.) use "Stake" for reward mechanisms. Changing only ylockers-ui creates fragmentation within the Yearn brand.

**Impact:** Inconsistency within Yearn's product suite could confuse users who use multiple Yearn products. Any future unification would require retroactive changes to this interface.

---

### 6. **"Deposit" Overload in Vault Mode**

**Reasoning:** Using "Deposit" for both the native mode (if Option B is chosen) and vault mode creates ambiguity: "Deposit" for what? To earn what?

**Impact:** If "Deposit" is chosen as the universal verb, users may conflate the two modes, defeating the purpose of linguistic distinction. This option is the weakest and likely introduces *more* confusion than it solves.

---

## COMPARATIVE RISK ASSESSMENT

| Factor | Favor Change | Against Change |
|--------|--------------|-----------------|
| User clarity (new users) | ✅ High | ❌ Neutral/negative |
| Industry precision | ❌ Lower | ✅ Maintained |
| Brand differentiation | ❌ Reduced | ✅ Preserved |
| Implementation ease | ❌ Medium effort | ✅ No effort |
| Transition cost | ❌ Medium (support, docs) | ✅ None |
| Cross-ecosystem consistency | ❌ Reduces Yearn unity | ✅ Maintains it |

---

## RECOMMENDATION

The **strongest argument in favor** is **user clarity for mainstream audiences**. The **strongest argument against** is **loss of industry precision and transition friction**.

A **balanced middle path** might be:

1. **Adopt "Earn {token}" titles immediately** (low risk, high readability gain).
2. **Defer the "Stake" → "Activate" verb change** to a future phase, with more user research and feedback first.
3. **If verb change proceeds, pilot with one app** (`yb` or `crv`) before rolling out to all three, to measure confusion and support impact.

This approach captures the primary benefit (clearer titles) while minimizing transition risk and allowing time to validate "Activate" resonates with users before broad deployment.

---

## Conclusion

Both positions are defensible. The change benefits accessibility and mental-model alignment but sacrifices precision and carries execution risk. The merits depend on **priority**: Is the product optimizing for mainstream onboarding, or for power-user clarity? The answer to that question should drive the final decision.
