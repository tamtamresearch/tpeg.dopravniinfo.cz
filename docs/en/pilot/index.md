# Pilot scope & status

## Status at a glance

|                          |                                              |
| ------------------------ | -------------------------------------------- |
| **Stage**                | Pilot, beta                                  |
| **Service availability** | Best-effort, no SLA                          |
| **Cost to consumer**     | Free, for evaluation and integration testing |
| **Operator**             | CEDA Maps a.s.                               |
| **Data source**          | ŘSD / NDIC                                   |
| **May be discontinued?** | Yes, at short notice                         |

## What's in scope

The pilot publishes traffic information for the Czech road network in two TPEG2 application formats:

- **[TPEG2-TEC](/technical/formats/tpeg2-tec)**: traffic events (incidents, congestion, road works).
- **[TPEG2-TFP](/technical/formats/tpeg2-tfp)**: traffic flow and predicted travel times on monitored road segments.

Delivery is over the IP protocol described in the [Technical](/technical/) section.

## Goals

**Validate the format choices.** Confirm that TPEG2-TEC and TPEG2-TFP, as profiled for the Czech road network, work in practice for independent consumers.

**Build a small consumer community.** Find real consumers, learn their use cases, fold their feedback into the format profiles and the data itself.

**Inform a go/no-go decision.** What we learn from the pilot will feed into a decision about whether TPEG2 distribution becomes a permanent part of Czech TTI.

## What's not in scope

- **No production SLA, support contract, or guaranteed retention.** The service can be paused or stopped between two updates of this page.
- **No DAB or other broadcast delivery.** Pilot delivery is IP-only.
- **Not all TPEG2 application formats.** Only TEC and TFP are published. Parking, weather, fuel price, and the rest are out of scope for now.
- **Not a registry or national access point.** That's a different system maintained elsewhere.

## How to engage

- Want to try the data? Start with [how to subscribe](/subscribe/).
- Want to discuss the format profile or a use case? [Open a discussion](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions) on GitHub.
- Found a defect? [File an issue](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/issues).

See the [changelog](./changelog) for what's changed.
