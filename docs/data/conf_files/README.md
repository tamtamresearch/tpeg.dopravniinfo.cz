# Configuration directory format

This folder contains yaml files and directories, which can be compiled into `conf.yaml` configuration file.

[[_TOC_]]

## Concepts

Configuration directory might have following structure, resembling expected configuration dictionary:

```shell
$ tree conf_files
conf_files
├── access_points.yaml
├── conformance.yaml
├── formats
│   ├── cz-ndic_d2-common-v1.1.yaml
│   ├── cz-ndic_d2-common-v1.2.yaml
│   ├── cz-ndic_d2-fcd-v1.0.yaml
│   ├── cz-ndic_d2-fcd-v1.1.yaml
│   ├── cz-ndic_d2-itp-situation-v1.0.yaml
│   ├── cz-ndic_d2-itp-table-v1.0.yaml
│   ├── cz-ndic_d2-predefined-location-set-v1.1.yaml
│   ├── cz-ndic_d2-predefined-location-set-v1.2.yaml
│   ├── cz-ndic_d2-restrictions-v1.1.yaml
│   ├── cz-ndic_d2-restrictions-v1.2.yaml
│   ├── cz-ndic_d2-traffic-status-v1.1.yaml
│   ├── cz-ndic_d2-travel-time-v1.1.yaml
│   ├── cz-ndic_d2-vms-table-v1.0.yaml
│   ├── cz-ndic_d2-vms-table-v1.1.yaml
│   ├── cz-ndic_d2-vms-v1.0.yaml
│   ├── cz-ndic_d2-vms-v1.1.yaml
│   ├── cz-ndic_d2-weather-v1.1.yaml
│   ├── cz-ndic_d2-weather-v1.2.yaml
│   ├── cz-ndic_ddr-common-v3.2.5.yaml
│   ├── cz-ndic_ddr-common-v3.4.yaml
│   ├── cz-ndic_ddr-fcd-v1.0.yaml
│   ├── cz-ndic_ddr-fcd-v1.1.yaml
│   ├── cz-ndic_ddr-fcd-v2.0.yaml
│   ├── cz-ndic_ddr-winter-v3.2.5.yaml
│   ├── cz-ndic_lod-srti-sparql-v1.0.yaml
│   ├── epip-netex-timetable.yaml
│   ├── rds-tmc-format.yaml
│   └── tisa_tmc-location-table-v2.6.yaml
├── organizations.yaml
├── persons.yaml
├── protocols
│   ├── cz-ndic_pull-v1.0.yaml
│   ├── cz-ndic_pull-v1.1.yaml
│   ├── cz-ndic_push-v1.0.yaml
│   ├── cz-ndic_push-v1.1.yaml
│   ├── cz-ndic_sparql-v1.0.yaml
│   ├── open-data-protocol.yaml
│   └── rds-tmc-protocol.yaml
├── providers
│   ├── cz-mdcr.yaml
│   └── cz-ndic.yaml
├── pubformats.yaml
├── README.md
├── registry_metadata.yaml
├── sources
│   ├── _deleted
│   │   ├── cz-ndic_d2-predefined-location-set.yaml
│   │   ├── cz-ndic_d2-travel-time.yaml
│   │   ├── cz-ndic_d2-vms-table.yaml
│   │   └── cz-ndic_tmc-location-table-v8.0.yaml
│   ├── _not_used
│   │   ├── cz-ndic_ddr-winter-pull.yaml
│   │   └── cz-ndic_ddr-winter.yaml
│   ├── _staged
│   │   ├── _staged_cz-ndic_ddr-common-push-v2.yaml
│   │   ├── _staged_cz-ndic_ddr-levels-v2.0.yaml
│   │   ├── cz-ndic_d2-common-pull-v1.2.yaml
│   │   ├── cz-ndic_d2-common-v1.2.yaml
│   │   ├── cz-ndic_d2-pls-fcd-v1.2.yaml
│   │   ├── cz-ndic_d2-pls-traffic-status-v1.2.yaml
│   │   ├── cz-ndic_d2-pls-weather-v1.2.yaml
│   │   ├── cz-ndic_d2-restrictions-v1.2.yaml
│   │   └── cz-ndic_d2-weather-v1.2.yaml
│   ├── cz-mdcr_NeTEx-timetables-v1.0.yaml
│   ├── cz-ndic_d2-common-pull.yaml
│   ├── cz-ndic_d2-common.yaml
│   ├── cz-ndic_d2-fcd-v2.yaml
│   ├── cz-ndic_d2-fcd.yaml
│   ├── cz-ndic_d2-itp-table.yaml
│   ├── cz-ndic_d2-pls-fcd-v1.1.yaml
│   ├── cz-ndic_d2-pls-traffic-status-v1.1.yaml
│   ├── cz-ndic_d2-pls-weather-v1.1.yaml
│   ├── cz-ndic_d2-restrictions.yaml
│   ├── cz-ndic_d2-traffic-status.yaml
│   ├── cz-ndic_d2-vms-fixed-v1.1.yaml
│   ├── cz-ndic_d2-vms-mobile-v1.1.yaml
│   ├── cz-ndic_d2-vms-table-fixed-v1.1.yaml
│   ├── cz-ndic_d2-vms-table-mobile-v1.1.yaml
│   ├── cz-ndic_d2-weather.yaml
│   ├── cz-ndic_ddr-common-pull.yaml
│   ├── cz-ndic_ddr-common.yaml
│   ├── cz-ndic_ddr-fcd-v2.yaml
│   ├── cz-ndic_ddr-fcd.yaml
│   ├── cz-ndic_ddr-levels.yaml
│   ├── cz-ndic_lod-srti-sparql.yaml
│   ├── cz-ndic_rds-tmc-service.yaml
│   ├── cz-ndic_tmc-location-table-v10.1.yaml
│   └── cz-ndic_tmc-location-table-v9.0.yaml
└── terms_and_conditions.yaml

8 directories, 85 files
```

### Configuration schema

The resulting configuration file has prescribed structure, see `../confschema.py`

On top level it has following keys:

- access_points
- conformance
- formats
- organizations
- persons
- protocols
- providers
- pubformats
- registry_metadata
- sources
- terms_and_conditions

You may consider these to be sort of tables with records.

### Normalized configuration

Resulting configuration file is normalized to allow usable diffs.

The normalization does a simple thing: sort top two levels of keys in the dictionary.

### Compilation

Folders and YAML files (with stripped `.yaml` extension) define configuration keys and their content is loaded as their value. Compilation takes into account only top two levels.

Folders prefixed with `_` are ignored.
