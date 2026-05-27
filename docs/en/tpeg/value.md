# Why TPEG fits this pilot

Why CEDA Maps and ŘSD are running a TPEG2 pilot, and what we think it offers to a consumer.

## What's in it for consumers

**Open data model.** TPEG2 is specified in ISO 21219. A client built against the spec can be reused across countries and providers. You're not locked to one supplier.

**Built for end-user delivery.** DATEX II is mostly a back-office exchange format between authorities. TPEG2's application formats (TEC, TFP, and the rest) are designed for delivery to navigation devices, in-car systems, and traffic apps. They're compact, language-aware, and message-management aware.

**Stable location referencing.** TPEG2 supports several location referencing methods, including TMC and OpenLR. Messages can be resolved against your own map without coupling tightly to ours.

**Incremental updates.** The protocol works with message lifecycles: _create_, _update_, _cancel_. You don't have to re-parse the full traffic picture on every cycle.

## What's in it for Czechia

**Fills a gap.** Czech TTI distribution today is mostly DATEX II and TMC. TPEG2 sits between DATEX II (back-office) and TMC over RDS (last mile), with a modern data model.

**Aligns with international practice.** TPEG2 is used by traffic information providers and broadcasters across Europe and Asia. Publishing TPEG2 here lowers the barrier for international consumers.

## Caveats

- **TPEG2 is heavier than TMC.** Message volume and complexity are higher. If your channel is very constrained, TMC may still be the better pick.
- **Tooling is thinner than for DATEX II.** Open-source TPEG2 tooling is less mature. Part of the point of the pilot is to surface and fix this.
- **It's a pilot.** The technical value is real, but there are no operational commitments. See [scope and status](/pilot/).

Got a use case in mind and want to talk through whether TPEG2 fits? [Get in touch](/about/contacts).
