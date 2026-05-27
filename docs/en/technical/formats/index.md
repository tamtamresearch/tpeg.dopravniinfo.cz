# Formats

The pilot publishes two TPEG2 application formats. Each format is documented in its own **Format Specification Package (FSP)** — a small GitHub repository containing:

- `FORMAT.yaml` — metadata about the format (name, version, profile, links);
- the entry **XSD** schema for validation;
- a `samples/` folder with representative messages.

This page lists the formats; click through for the per-format details on this site, and from there to the FSP repository.

## Published formats

### [TPEG2-TEC](./tpeg2-tec) — Traffic Event Compact

Traffic events affecting the Czech road network: incidents, congestion, road works, and similar disruptive events.

- Identifier: `x-format:cz-ndic_tpeg2-tec-v0.1`
- FSP: [tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1)

### [TPEG2-TFP](./tpeg2-tfp) — Traffic Flow & Prediction

Current traffic flow and predicted travel times on monitored road segments.

- Identifier: `x-format:cz-ndic-tpeg2-tfp-v0.1`
- FSP: [tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1)

## Profiling

Both formats are **Czech profiles** of the corresponding TPEG2 application format: the underlying standard is the ISO/TISA specification, but vocabularies, code lists, and location-referencing choices are profiled for the Czech road network. The FSP `FORMAT.yaml` documents the profile.

## What is _not_ here

The pilot does not publish other TPEG2 applications (parking, weather, fuel price, …). If your use case requires one of those, please [tell us](/about/contacts) — interest from real consumers is one of the signals we use to plan future formats.
