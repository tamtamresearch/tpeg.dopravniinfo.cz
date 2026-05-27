# TPEG2-TFP — Traffic Flow & Prediction

Czech profile of the TPEG2 **Traffic Flow & Prediction** application format.

|                 |                                   |
| --------------- | --------------------------------- |
| **Identifier**  | `x-format:cz-ndic-tpeg2-tfp-v0.1` |
| **Family**      | TPEG2 (ISO 21219)                 |
| **Application** | TFP — Traffic Flow & Prediction   |
| **Encoding**    | XML                               |
| **Status**      | Pilot · v0.1                      |

## What it carries

TPEG2-TFP describes **traffic flow** on the road network — quantitative state, not narrative events. Per monitored segment it can carry:

- current **speed** and/or **travel time**;
- **flow level** (free flow, heavy, stationary, …);
- **predicted** travel time or speed over the near future, where prediction data is available;
- **confidence / quality** indicators where the source provides them.

TFP and TEC are designed to complement each other: TEC tells you _that there is an incident with a 30-minute delay_, TFP tells you _the actual measured travel time on this stretch right now and in 15 minutes_.

## Location referencing

Flow segments are anchored using the location referencing methods supported by TPEG2:

- **TMC** — for compatibility with existing client maps;
- **OpenLR** — for map-independent referencing of arbitrary segments.

The supported set is documented in the FSP `FORMAT.yaml`.

## Where to get the spec

- 📦 **FSP**: [tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1)

The FSP repository contains `FORMAT.yaml`, the entry XSD, and `samples/`.

> ⚠️ The pilot format is **v0.1**. Expect refinements as we learn from real consumers.

## Validating your parser

Same procedure as for TEC:

1. Clone the FSP.
2. Validate a `samples/` message against the entry XSD.
3. Run the sample through your parser and compare against documented fields.

[File an issue](/about/issues) for any XSD / live-feed / sample mismatch.

## See also

- [Protocol](/technical/protocol) — how TFP messages are delivered.
- [TPEG2-TEC](./tpeg2-tec) — the companion event format.
- [What is TPEG](/tpeg/) — for a primer on the standard family.
