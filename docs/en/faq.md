# Frequently asked questions

A short list of questions we expect from potential consumers. If yours is not here, ask on the [GitHub discussions](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions) or e-mail [tpeg@ceda.cz](mailto:tpeg@ceda.cz) and we will add it.

---

## Service & delivery

### Do you broadcast TPEG over DAB?

**No.** The pilot is **IP-only**. TPEG is often associated with DAB broadcast because TPEG1 was designed primarily with broadcast in mind, but TPEG2 is delivery-channel-agnostic. We deliver TPEG2 XML over HTTPS — see the [Protocol](/technical/protocol) page.

If your use case specifically requires DAB transport, the pilot service does not cover it. Let us know — interest from real consumers helps shape what comes next.

### How often is the data updated?

Update cadence depends on the format. Recommended polling intervals are documented in each format's FSP `FORMAT.yaml`. As a rough orientation:

- **TPEG2-TEC** — minute-scale, driven by source events;
- **TPEG2-TFP** — sub-minute to minute scale for flow snapshots.

Polling faster than recommended will not give you fresher data — the upstream source does not update faster.

### What is the coverage area?

The Czech road network managed by ŘSD: motorways, expressways, and selected first-class roads. Exact coverage is in the FSP for each format.

---

## Cost, terms, and access

### How much does the pilot cost?

**Free of charge** for evaluation and integration testing during the pilot. See the [terms of use](/about/license) for the conditions and [pilot scope & status](/pilot/) for caveats about availability.

### Who can subscribe?

Any identified organisation with a stated use case. We do not exclude commercial users from the pilot, but we expect transparency about intended use. The [subscription process](/subscribe/) lists what to include in the request.

### Will the service still be there in six months?

We do not guarantee it. The pilot exists to be evaluated; based on the evaluation, the service may be made permanent, may be transferred to a different operator, or may be discontinued. We will give active subscribers **prior notice** of any planned change via the operational e-mail address you supply.

---

## Technical

### Which TPEG2 application formats do you publish?

**TPEG2-TEC** (events) and **TPEG2-TFP** (flow & prediction). See [Technical → Formats](/technical/formats/).

### How do I validate my parser?

Use the XSD and `samples/` from each format's FSP repository. The procedure is described on each format page ([TEC](/technical/formats/tpeg2-tec), [TFP](/technical/formats/tpeg2-tfp)).

### Which location referencing methods do you use?

Per-format. Both formats support **TMC** for compatibility and **OpenLR** for map-independent referencing. The exact set per format is in the FSP `FORMAT.yaml`.

---

_This FAQ will grow as questions come in. Help us shape it: [open a discussion](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions)._
