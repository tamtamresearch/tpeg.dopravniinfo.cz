# Pilot scope & status

The **Pilot TPEG service in Czechia** is a pilot deployment of the [TPEG](/tpeg/) standard for distribution of traffic and travel information on the Czech road network.

Commissioned by the Czech road and motorway directorate **[ŘSD](/about/contacts#rsd)** (Ředitelství silnic a dálnic) and its national traffic information centre **NDIC** (Národní dopravní informační centrum). Operated by **[CEDA Maps a.s.](/about/contacts#ceda)** in cooperation with **[TamTam Research s.r.o.](/about/contacts#tamtamresearch)** as technical partner.

## Status at a glance

|                                  |                                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Stage**                        | Pilot, beta                                                                                                |
| **Service availability**         | Best-effort, no SLA                                                                                        |
| **Guaranteed feed availability** | Until **June 2027**                                                                                        |
| **Cost to consumer**             | Free of charge                                                                                             |
| **Operator**                     | [CEDA Maps a.s.](/about/contacts#ceda)                                                                     |
| **Technical partner**            | [TamTam Research s.r.o.](/about/contacts#tamtamresearch)                                                   |
| **Data source**                  | [ŘSD / NDIC](/about/contacts#rsd), via the [Czech National Access Point](https://registr.dopravniinfo.cz/) |
| **After June 2027**              | Continuation depends on the evaluation outcome                                                             |

## Source data

The pilot ingests DATEX II feeds from [ŘSD / NDIC](/about/contacts#rsd), published via the [Czech National Access Point](https://registr.dopravniinfo.cz/), and converts them to TPEG2 before publishing:

| Output format | DATEX II source(s)                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **TPEG2-TEC** | [DATEX II - Common Traffic Information (snapshot)](https://registr.dopravniinfo.cz/en/sources/cz-ndic_d2-common-pull/)                                                                                             |
| **TPEG2-TFP** | [DATEX II - FCD data v2](https://registr.dopravniinfo.cz/en/sources/cz-ndic_d2-fcd-v2/) and [DATEX II - FCD data (predefined locations) v1.1](https://registr.dopravniinfo.cz/en/sources/cz-ndic_d2-pls-fcd-v1.1/) |

## What's in scope

The pilot publishes traffic information for the Czech road network in two TPEG2 application formats:

- **[TPEG2-TEC](/technical/formats/tpeg2-tec)**: traffic events (incidents, congestion, road works).
- **[TPEG2-TFP](/technical/formats/tpeg2-tfp)**: traffic flow and predicted travel times on monitored road segments.

Delivery is over the IP protocol described in the [Technical](/technical/) section.

## Goals

**Validate the format choices.** Confirm that TPEG2-TEC and TPEG2-TFP work in practice for independent consumers.

**Build a small consumer community.** Find real consumers, learn their use cases, fold their feedback into the formats and the data itself.

**Support the go/no-go decision.** What we learn from the pilot will feed into a decision about whether TPEG2 distribution becomes a permanent part of Czech TTI.

## What's out of scope

- **No production SLA, support contract, or guaranteed availability.** The pilot has a minimum committed duration (see status table) but no formal availability guarantee within that period.
- **No DAB or other broadcast delivery.** The pilot delivers data only over the internet.
- **Not all TPEG2 application formats.** Only TEC and TFP are published. Parking, weather, fuel price, and the rest are out of scope for now.

## After the pilot

The pilot is a step toward a **permanent TPEG2 service** for Czechia, not the end goal. Whether it becomes permanent depends on what we learn here and on real consumer interest. The more concretely you tell us what you'd use the data for, the stronger the case.

Got a question or a tentative use case? Feedback during the pilot shapes what comes after. [Get in touch](/about/contacts) or [open a discussion](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions).

## How to engage

- Want to try the data? Start with [how to subscribe](/subscribe/#subscribe-to-the-feed).
- Curious but not ready to integrate? [Register your interest](/subscribe/#register-your-interest) and we'll keep you in the loop.
- Want to discuss the formats or a use case? [Open a discussion](https://github.com/tamtamresearch/tpeg.dopravniinfo.cz/discussions) on GitHub.
