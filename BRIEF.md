# web tpeg.dopravniinfo.cz

This repository provides site for Pilot TPEG service in Czechia.

Title: Pilot TPEG service in Czechia
Description: Study and pilot service of the TPEG standard in Czechia

GitHub repository: https://github.com/tamtamresearch/tpeg.dopravniinfo.cz

Use it for:

- issue tracker
- discussions

Developped by:

- CEDA Maps a.s.
- TamTam Research

## Purpose

- Public relation
- Present the project:
    - scope: in pilot mode, can be stopped in near future
    - status: beta
- Explain how to subscribe and consume the content
    - subscription process
        - email to CEDA Maps [tpeg@ceda.cz]
            - specify, that this information are required in the subscription process:
                - First Name
                - Last Name
                - E-mail
                - Company name
                - Position
                - Purpose, expected data usage
    - protocols and formats used (all what is needed to implement consumption)
    - support of (potential) consumers
- Get contact to potential consumers and learn about them:
    - learn about their needs and expectations
    - get feedback to our service

## Topics

- license for the data provided
    - `./docs/en/about/terms-of-use.md`
- issue tracker (GitHub)
- What is TPEG
- What is pilot test of TPEG at ŘSD/NDIC/ČR
- technical specifications
    - protocol(s)
    - formats (link to dedicated FSP repository)
- subscription process: how to
- FAQ
    - Do you broadcat TPEG over DAB?
- Value proposition
- Questionary: business domain, intended use of data, ...
- language(s): English (use Czech only if explicitly asked to use it by ŘSD)

## Platform

- static GitHub pages
- served on domain tpeg.dopravniinfo.cz
- framework:
    - VitePress
    - Markdown files optionally edited by Obsidian using relative links
- GitHub discussions, issues
- DNS records for registr.dopravniinfo.cz (to support GitHub pages on given domain)

## Technical

### Coverage

The coverage for TPEG2-TEC and TPEG2-TFP matches the source data coverage, which is:

| Parameter       | Value                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| area            | CZ0                                                                     |
| network         | Motorways, Arterial road network, Regional roads, Urban and local roads |
| transport modes | car, truck, motorcycle, bus                                             |

## Content

### Format Specification Package repositories

We use so called Format Specification Package (FSP) repositories, documenting used data format. The FSP contains:

- FORMAT.yaml: metadata about the format, incl. links to sample folder and to entry xsd file for validation
    - `x-format:cz-ndic_tpeg2-tfp-v0.1`: <https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1>
    - `x-format:cz-ndic_tpeg2-tec-v0.1`: <https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1>
