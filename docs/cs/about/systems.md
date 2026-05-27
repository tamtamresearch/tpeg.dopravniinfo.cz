# Systémy a účastníci poskytování dopravních informací

Proces výměny dopravních informací zahrnuje řadu systémů, účastníků a procesů, které jsou zde popsány, abychom lépe pochopili kontext Registru dopravních informací.

## Zdroje a jejich přístupové body

**Zdroj dopravních informací** je schopen popsat určitý typ dopravní informace, např. nehody, uzavírky, data z meteo-hlásek atp. a je dostupný k odběru.

Tyto informace jsou poskytovány přes tzv. **přístupové body** (také distribuční rozhraní), což je často např. url, na který může odběratel zaslat HTTP požadavek a danou informaci získat v odpovědi. Může jít ale i o systém, který naopak informace aktivně odesílá např. na url odběratele (tzv. PUSH).

## Poskytovatel a jeho zástupci

Jeden nebo více zdrojů dopravních informací a souvisejících přístupových bodů je provozováno konkrétním **poskytovatelem dopravních informací**.

Každý ze zdrojů dopravních informací může být spravován pověřeným
**správcem zdroje dopravních informací**, se kterým se řeší zřízení
konkrétních odběrů, případně se s ním řeší související technické
problémy. Řešení případných problémů lze eskalovat na **zodpovědnou
osobu poskytovatele**.

![Systémy a účastníci poskytování dopravních informací](/docs/img/cs/domain.png)

## Národní registr dopravních informací (tyto stránky)

**Národní registr dopravních informací** poskytuje informace, potřebné ke zřízení odběru dopravních informací. Jde zejména o přehled poskytovatelů, jejich zdrojů dopravních informací, včetně technického popisu formátů a protokolu výměny, a v neposlední řadě i informace, s kým a jak odběr informací sjednat.

## Odběratel

**Zástupce odběratele** v registru najde potřebné informace a využije je při:

- zhodnocení vhodnosti konkrétních zdrojů dopravních informací;
- sjednání odběru dopravních informací;
- implementaci odběru dopravních informací;
- implementaci importu přijatých informací do vlastního informačního systému.
