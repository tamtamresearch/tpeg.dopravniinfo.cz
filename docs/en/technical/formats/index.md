# Formats

The pilot publishes two TPEG2 application formats. Each one is documented in its own **Format Specification Package (FSP)**, a small GitHub repository with:

- `FORMAT.yaml`: metadata about the format (name, version, schema);
- the entry **XSD** schema for validation;
- a `samples/` folder with representative messages.

This page lists the formats. Click through for the per-format page on this site, and from there to the FSP.

## Published formats

### [TPEG2-TEC](./tpeg2-tec), Traffic Event Compact

Traffic events on the Czech road network: incidents, congestion, road works, and similar disruptive events.

- FSP: [tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tec-v0.1)

### [TPEG2-TFP](./tpeg2-tfp), Traffic Flow & Prediction

Current traffic flow and predicted travel times on monitored road segments. Delivered as two feeds: a **static** catalogue of predefined locations and a **dynamic** stream of measurements. See [Feeds](./tpeg2-tfp#feeds).

- FSP: [tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1](https://github.com/tamtamresearch/x-format_cz-ndic_tpeg2-tfp-v0.1)
