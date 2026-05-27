# Value proposition

Why we — CEDA Maps and ŘSD — are running a TPEG2 pilot, and what we believe it offers to a consumer.

## For consumers

**1. Open, ISO-standardised data model.**
TPEG2 is specified through ISO 21219. A consumer implementation built against the standard can be reused across countries and providers — not locked to one supplier.

**2. Designed for end-user delivery.**
Unlike DATEX II, which is primarily a back-office exchange format, TPEG2 application formats (TEC, TFP, …) are tuned for delivery to **navigation devices, in-car systems, and traffic apps** — compact, language-aware, and message-management-friendly.

**3. Stable location referencing.**
TPEG2 supports multiple location referencing methods (ULR, TMC, OpenLR), so messages can be resolved against the consumer's own map without tight coupling to the provider's network model.

**4. Incremental updates.**
The protocol is built around message lifecycles — _create_, _update_, _cancel_ — so consumers do not need to re-parse the full traffic picture on every cycle.

## For Czechia

**5. Closes a gap in national TTI provisioning.**
Existing Czech traffic information distribution is built around DATEX II and TMC. TPEG2 fills the gap between back-office formats (DATEX II) and last-mile encodings (TMC over RDS), with a modern data model.

**6. Aligned with international practice.**
TPEG2 is used by traffic information providers and broadcasters across Europe and Asia. Aligning Czech distribution with TPEG2 lowers the integration barrier for international consumers.

## Honest caveats

- **TPEG2 is heavier than TMC.** Message volume and complexity are higher. For very constrained delivery channels, TMC may still be preferable.
- **Toolchain maturity varies.** Open-source TPEG2 tooling is thinner than for DATEX II. The pilot exists in part to surface and address this.
- **This is a pilot.** Value-add is real, but operational commitments are not. See the [pilot scope and status](/pilot/) page.

If you have a use case in mind and want to discuss whether TPEG2 fits, [get in touch](/about/contacts).
