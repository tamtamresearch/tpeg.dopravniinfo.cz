---
layout: home

hero:
    name: "Czech National Traffic Information Registry"
    text: ""
    tagline: "Search and explore"
    image:
        src: /images/ŘSD_logo.svg
        alt: RSD
    actions:
        - theme: alt
          text: Providers
          link: ./providers
        - theme: brand
          text: Sources
          link: ./sources
        - theme: alt
          text: Protocols
          link: ./protocols
        - theme: alt
          text: Formats
          link: ./formats
        - theme: alt
          text: About
          link: ./about
---

# Czech National Traffic Information Registry

National Traffic Information Registry ("Registry") provides information to organisations **interested** in traffic data subscription. It contains mainly overview of traffic information sources and their providers including the technical description of the formats and protocols and information about subscription process. The registry contains this information for subscribers:

- [List of providers](providers/index) of traffic information;
- [List of sources](sources/index) of traffic information available for subscription, with all required information about the source;
- Instructions how to make a subscription (per source).

Following links provide more information about the functionality[^new_version]:

- [Information structure in registry](about/structure)
- [Systems and roles in traffic information distribution](about/systems)
- [FAQs](about/faq)
- [Status of the registry implementation, changelog](about/scope)

## Concept of the Registry

The National Traffic Information Register ("Register") is the implementation of the **National Access Point** in accordance with the requirements of the ITS Directive [2010/40/EU](https://eur-lex.europa.eu/eli/dir/2010/40) amended by [2023/2661](https://eur-lex.europa.eu/eli/dir/2023/2661) and its related Delegated Regulations

- Commission Regulation no. [886/2013](https://eur-lex.europa.eu/eli/reg_del/2013/886) „provision of safety related traffic information“, referred to as `srti`
- Commission Regulation no. [885/2013](https://eur-lex.europa.eu/eli/reg_del/2013/885) „provision of parking information for safe and secure truck parking“, referred to as `sstp`
- Commission Regulation no. [2022/670](https://eur-lex.europa.eu/eli/reg_del/2022/670) „provision of real time traffic information“ , referred to as `rtti`
- Commission Regulation [2017/1926](https://eur-lex.europa.eu/eli/reg_del/2017/1926) "provision of EU-wide multimodal travel information services", referred to as `mmtis`

These regulations require the individual EU Member States to establish and operate an information service (National Access Point) for all relevant traffic information provided[^type_of_info] within their territory.

The National access point is implemented as **metadata directory**. Distribution interfaces of individual providers (where the data are subscribed to) are out of the scope.

[^new_version]: Version 2.0 is currently in preparation, which will significantly change the system's functionality (the expected launch date of the new version is mid-2026).

[^type_of_info]: Mandatory only traffic information listed in Commission Regulations.
