# Frequently asked questions

A short list of questions we expect from people thinking about subscribing. If yours isn't here, ask on [GitHub discussions](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions) or e-mail [tpeg@ceda.cz](mailto:tpeg@ceda.cz) and we'll add it.

## Service & delivery

### Do you broadcast TPEG over DAB?

**No.** The pilot is **IP-only**. TPEG is often associated with DAB because TPEG1 was designed mainly with broadcast in mind, but TPEG2 doesn't care about the delivery channel. We deliver TPEG2 XML over HTTPS. See the [Protocol](/technical/protocol) page.

If your use case specifically needs DAB transport, the pilot doesn't cover it. Let us know anyway. Interest from real consumers helps shape what comes next.

### How often is the data updated?

It depends on the format. Recommended polling intervals are shared with subscribers at onboarding. Roughly:

- **TPEG2-TEC**: minute-scale, driven by source events.
- **TPEG2-TFP**: 5 minutes for flow snapshots.

Polling faster than recommended won't give you fresher data. The upstream source doesn't update faster.

### What is the coverage area?

Czechia (CZ0): motorways, the arterial road network, regional roads, and urban and local roads. Transport modes covered are car, truck, motorcycle, and bus. Full breakdown is on the [Technical → Coverage](/technical/#coverage) page.

## Cost, terms, and access

### How much does the pilot cost?

**Free** for evaluation and integration testing during the pilot. See the [terms of use](/about/license) for the conditions and [pilot scope & status](/pilot/) for caveats about availability.

### Who can subscribe?

Any identified organisation or individual. We don't exclude commercial users from the pilot, and we welcome hearing about intended use. The [subscription process](/subscribe/) lists what to include in the request.

### Will the service still be there in six months?

Yes. The pilot is guaranteed to run until **June 2027**. After that, the service may become permanent, move to a different operator, or be stopped, depending on the evaluation outcome. We'll give active subscribers prior notice of any planned change by e-mail, using the operational address you give us.

## Technical

### Which TPEG2 application formats do you publish?

**TPEG2-TEC** (events) and **TPEG2-TFP** (flow & prediction). See [Technical → Formats](/technical/formats/).

### How do I validate my parser?

Use the XSD and `samples/` from each format's FSP repository. The procedure is on each format page ([TEC](/technical/formats/tpeg2-tec), [TFP](/technical/formats/tpeg2-tfp)).

### Which location referencing methods do you use?

Per-format. Both formats support **TMC** for compatibility and **OpenLR** for map-independent referencing.

_The FAQ will grow as questions come in. [Open a discussion](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions) if you have one._
