---
layout: home

hero:
    name: "Národní registr dopravních informací České republiky"
    text: ""
    tagline: ""
    image:
        src: /images/ŘSD_logo.svg
        alt: ŘSD
    actions:
        - theme: alt
          text: Poskytovatelé
          link: ./providers
        - theme: brand
          text: Zdroje
          link: ./sources
        - theme: alt
          text: Protokoly
          link: ./protocols
        - theme: alt
          text: Formáty
          link: ./formats
        - theme: alt
          text: O stránce
          link: ./about
---

# Národní registr dopravních informací České republiky

Registr slouží tuzemským i zahraničním **zájemcům o odběr dopravních informací**. Poskytuje zejména přehled poskytovatelů, jejich zdrojů dopravních informací, včetně technického popisu formátů a protokolu výměny, a v neposlední řadě i informace, s kým a jak odběr informací sjednat. Registr obsahuje zejména:

- [seznam poskytovatelů](providers/index) dopravních informací;
- [přehled zdrojů](sources/index) informací, které lze odebírat, obsahující kompletní informace ke každému zdroji;
- návod jak sjednat odběr dopravních informací (dle zdroje).

Více informací o funkci Registru[^new_version]:

- [systémy a účastníci poskytování dopravních informací](about/systems);
- [struktura informací v Registru](about/structure);
- [otázky a odpovědi](about/faq);
- [rámec a stav implementace Registru, changelog](about/scope).

## Koncept Registru

Národní registr dopravních informací ("Registr") je implementace **Národního přístupového místa** dle požadavků Směrnice o ITS [2010/40/EU](https://eur-lex.europa.eu/eli/dir/2010/40) a její aktualizace [2023/2661](https://eur-lex.europa.eu/eli/dir/2023/2661) a souvisejících Nařízení s přenesenou pravomocí:

- Nařízení Komise č. [886/2013](https://eur-lex.europa.eu/eli/reg_del/2013/886) „poskytování informací souvisejících s bezpečností silničního provozu“, dále odkazované jako `srti`
- Nařízení Komise č. [885/2013](https://eur-lex.europa.eu/eli/reg_del/2013/885) „poskytování informací o parkovacích místech pro nákladní dopravu“, dále odkazované jako `sstp`
- Nařízení Komise č. [2022/670](https://eur-lex.europa.eu/eli/reg_del/2022/670) „poskytování informací o dopravním provozu v reálném čase“, dále odkazované jako `rtti`
- Nařízení Komise č. [2017/1926](https://eur-lex.europa.eu/eli/reg_del/2017/1926) „poskytování multimodálních informačních služeb o cestování v celé Unii“, dále odkazované jako `mmtis`

Tato nařízení stanovují jednotlivým členským zemím EU zřídit a provozovat informační službu (Národní přístupové místo) o všech relevantních poskytovaných dopravních informacích[^type_of_info] na svém území.

Národní přístupové místo je implementováno jako **meta datový** portál. Distribuční rozhraní jednotlivých poskytovatelů (kde dochází ke skutečnému odběru dopravních informací) jsou mimo rámec implementace.

[^new_version]: V přípravě je verze 2.0 která významně změní funkčnost systému (očekávaný termín spuštění nové verze je polovina 2026).

[^type_of_info]: Povinně jde pouze o informace vyjmenované v Nařízeních Komise.\_info]: Mandatory only traffic information listed in Commission Regulations.
