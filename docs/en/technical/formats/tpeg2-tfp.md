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

- **level of service (LOS)**, indicating the current traffic flow state;
- average vehicle **speed**;
- **free-flow travel time**;
- **delay** relative to free-flow conditions;
- data **quality indicator**;
- traffic information **broken down by vehicle class**: all vehicles, passenger cars, or lorries.

TFP and TEC complement each other. TEC tells you _that there's an incident with a 30-minute delay_; TFP tells you _the actual measured traffic conditions on this stretch right now_.

## Feeds

TPEG2-TFP is published as two complementary feeds:

- **Static feed, predefined locations**: the catalogue of monitored road segments with their identifiers, geometry, and location references. Updates infrequently, when the segment catalogue changes.
- **Dynamic feed, live measurements**: the actual traffic state data, including average speed, level of service, delay, and a related quality indicator. Each message is linked to the corresponding road segment definition in the static feed through the **messageID** element. Updates every 5 minutes.

Consumers typically fetch the static feed once and refresh it occasionally, then poll the dynamic feed at the cadence their use case needs.

The two feeds map to two separate ŘSD/NDIC DATEX II source feeds; see [Source data](/pilot/#source-data) on the Pilot page.

## Location referencing

Flow segments are anchored using TPEG2's supported location referencing methods:

- **TMC**: for compatibility with existing client maps;
- **OpenLR**: for map-independent referencing of arbitrary segments.

## Where to get the spec

- **FSP**: [tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1)

The FSP repository contains `FORMAT.yaml`, the entry XSD, and `samples/`.

[Let us know](/about/issues) about any XSD, live-feed, or sample mismatch.

## See also

- [Protocol](/technical/protocol), how TFP messages are delivered.
- [TPEG2-TEC](./tpeg2-tec), the companion event format.
- [What is TPEG](/tpeg/), the primer.
