# Typy informací v Registru

Účelem Registru je poskytnout úplnou informaci pro zřízení odběru dopravní informace včetně související implementace odběru a importu.

## Specifikace formátu

Specifikace formátu obsahuje:

- Popis účelu formátu a jeho obecné koncepce
- Vzorky dat
- Schémata (např. W3C XML Schéma, JSON Schéma atp.)

Specifikace formátu by měla postačit k tomu, aby odběratel implementoval import dat do vlastního informačního systému.

## Specifikace protokolu

Specifikace protokolu přesně popisuje technické provedení přenosu informací k odběrateli. Tato specifikace by měla plně postačit k implementaci samotného odběru.

## Specifikace procesu zřízení odběru

Postup zřízení odběru popisuje kroky, vedoucí ke zřízení a zahájení
odběru dopravních informací.

Tento postup se může případně odvolávat na konkrétní hodnoty
vyplývající z kontextu daného zdroje dopravních informací, jako jsou
přístupová místa, správce odběru nebo zodpovědná osoba poskytovatele.

Proces zřízení odběru je vždy specifický pro daného poskytovatele.

## Specifikace zdroje dopravních informací

- **textový popis** poskytovaných informací a jejich základních koncepcí,
- odkazuje na **jeden nebo více použitých formátů** (jeden zdroj může
  např. vyžadovat jeden formát pro popis míst měření a druhý formát pro
  poskytování samotných naměřených hodnot),
- odkazuje na **jeden nebo více použitých protokolů**,
- hodnoty specifických parametrů zdroje,
- **stav implementace daného zdroje**, např. zda je v testovacím či provozním režimu, kdy se předpokládají změny implementace atp,
- identitu **poskytovatele**,
- volitelně také odkaz na **správce zdroje** dopravních informací,
- odkaz na **proces zřízení odběru** (pokud se liší pro daný zdroj).
