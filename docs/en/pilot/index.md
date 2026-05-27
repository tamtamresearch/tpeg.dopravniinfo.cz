# Pilot scope & status

## Status at a glance

|                          |                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Stage**                | Pilot, beta                                                                         |
| **Service availability** | Best-effort, no SLA                                                                 |
| **Cost to consumer**     | Free, for evaluation and integration testing                                        |
| **Operator**             | CEDA Maps a.s.                                                                      |
| **Data source**          | ŘSD / NDIC, via the [Czech National Access Point](https://registr.dopravniinfo.cz/) |
| **May be discontinued?** | Yes, at short notice                                                                |

## Upstream data

The pilot ingests DATEX II feeds from ŘSD / NDIC, published via the [Czech National Access Point](https://registr.dopravniinfo.cz/), and converts them to TPEG2 before publishing:

| Output format | Upstream DATEX II source(s)                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **TPEG2-TEC** | [DATEX II - Common Traffic Information (snapshot)](https://registr.dopravniinfo.cz/en/sources/cz-ndic_d2-common-pull/)                                                                                             |
| **TPEG2-TFP** | [DATEX II - FCD data v2](https://registr.dopravniinfo.cz/en/sources/cz-ndic_d2-fcd-v2/) and [DATEX II - FCD data (predefined locations) v1.1](https://registr.dopravniinfo.cz/en/sources/cz-ndic_d2-pls-fcd-v1.1/) |

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

## After the pilot

The pilot is a step toward a **permanent TPEG2 service** for Czechia, not the end goal. Whether it becomes permanent depends on what we learn here and on real consumer interest. The more concretely you tell us what you'd use the data for, the stronger the case.

Got a question or a tentative use case? We'd rather hear it now than miss the chance to fold it into the format profile. [Get in touch](/about/contacts) or [open a discussion](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions).

## How to engage

- Want to try the data? Start with [how to subscribe](/subscribe/).
- Want to discuss the format profile or a use case? [Open a discussion](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions) on GitHub.
- Found a defect? [File an issue](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/issues).
