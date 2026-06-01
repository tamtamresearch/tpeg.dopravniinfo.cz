# TPEG2-TFP, Traffic Flow & Prediction

TPEG2 **Traffic Flow & Prediction** as published on the Czech road network.

|                 |                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Identifier**  | `x-format:cz-ndic_tpeg2-tfp-v0.1`                                                                                    |
| **Family**      | TPEG2 ([ISO 21219-1:2023](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-1:ed-1:v1:en))                            |
| **Application** | TFP, Traffic Flow & Prediction ([ISO 21219-18:2019](https://www.iso.org/obp/ui/en#iso:std:iso:21219:-18:ed-1:v1:en)) |
| **Encoding**    | XML                                                                                                                  |
| **Status**      | Pilot                                                                                                                |

## What it carries

TPEG2-TFP describes **traffic flow** on the road network: quantitative state, not narrative events. Per monitored segment it can carry:

- current **speed** or **travel time**;
- **flow level** (free flow, heavy, stationary, …);
- **predicted** travel time or speed over the near future, where prediction data is available;
- **confidence or quality** indicators where the source provides them.

TFP and TEC complement each other. TEC tells you _that there's an incident with a 30-minute delay_; TFP tells you _the actual measured travel time on this stretch right now and in 15 minutes_.

## Location referencing

Flow segments are anchored using TPEG2's supported location referencing methods:

- **TMC**: for compatibility with existing client maps;
- **OpenLR**: for map-independent referencing of arbitrary segments.

## Where to get the spec

- **FSP**: [tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1)

The FSP repository contains `FORMAT.yaml`, the entry XSD, and `samples/`.

[File an issue](/about/issues) for any XSD, live-feed, or sample mismatch.

## See also

- [Protocol](/technical/protocol), how TFP messages are delivered.
- [TPEG2-TEC](./tpeg2-tec), the companion event format.
- [What is TPEG](/tpeg/), the primer.
