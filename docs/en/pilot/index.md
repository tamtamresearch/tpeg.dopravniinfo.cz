# Pilot scope & status

## Status at a glance

|                          |                                              |
| ------------------------ | -------------------------------------------- |
| **Stage**                | Pilot · Beta                                 |
| **Service availability** | Best-effort, no SLA                          |
| **Cost to consumer**     | Free, for evaluation and integration testing |
| **Operator**             | CEDA Maps a.s.                               |
| **Data source**          | ŘSD / NDIC                                   |
| **May be discontinued?** | Yes, at short notice                         |

## What is in scope

The pilot publishes traffic information for the Czech road network in two TPEG2 application formats:

- **[TPEG2-TEC](/technical/formats/tpeg2-tec)** — traffic events (incidents, congestion, road works).
- **[TPEG2-TFP](/technical/formats/tpeg2-tfp)** — traffic flow and predicted travel times on monitored road segments.

Delivery is over the **IP protocol** described in the [Technical](/technical/) section.

## Goals of the pilot

1. **Validate the format choices.** Confirm that TPEG2-TEC and TPEG2-TFP, as profiled for the Czech road network, are usable in practice by independent consumers.
2. **Build a small consumer community.** Find real consumers, understand their use cases, and incorporate their feedback into the format profiles and the data itself.
3. **Inform the go/no-go decision.** Outputs from the pilot will feed into a decision about whether to make TPEG2 distribution a permanent part of the Czech TTI offering.

## What is _not_ in scope

- **Production SLA, support contracts, or guaranteed retention.** The service can be paused or stopped between two updates of this page.
- **DAB or other broadcast delivery.** Pilot delivery is IP-only.
- **All TPEG2 application formats.** Only TEC and TFP are published. Other applications (parking, weather, fuel price, …) are out of scope for now.
- **A registry / national access point.** That is a different system maintained elsewhere.

## How to engage

- Want to **try the data**? Start with the [subscription process](/subscribe/).
- Want to **discuss the format profile or use cases**? Open a [discussion on GitHub](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions).
- Found a **defect**? File an [issue](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/issues).

See the [changelog](./changelog) for what has changed and when.
