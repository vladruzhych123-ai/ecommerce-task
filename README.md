# Riešenie testovacej úlohy – Integrácia a Automatizácia

Nie som programátor/vývojár, preto sa pri integráciách spolieham na no-code nástroje ako je **Make** (predtým Integromat). Je to efektívnejšie riešenie, ktoré šetrí čas aj náklady na vývoj, a zároveň je veľmi stabilné.

---

## 1. Postup napojenia (Workflow)
Hoci v mojom testovacom e-shope nie je aktívny platený doplnok Shoptet API, postup by bol nasledovný:
* **Webhook:** V administrácii Shoptetu (*Nastavenia → API → Webhooky*) by som nastavil odosielanie udalosti „Vytvorenie objednávky“ (`order:create`).
* **Prepojenie:** Ako cieľovú URL adresu by som vložil webhook vygenerovaný v nástroji Make.
* **Zápis:** Make prijme dáta o objednávke a automaticky vytvorí nový riadok v priradenej Google tabuľke.

---

## 2. Aké dáta z objednávky by si poslal?
Pre efektívny reporting by som vybral tieto kľúčové polia:
* **Identifikácia:** Číslo objednávky (kód).
* **Zákazník:** Meno, priezvisko a e-mail.
* **Produkty:** SKU kódy produktov a ich množstvo (pre prehľad skladu).
* **Financie:** Celková suma objednávky a mena.
* **Logistika:** Spôsob platby a dopravy.

---

## 3. Aký nástroj/prístup by si použil?
Jednoznačne **Make.com**.
* **Prečo:** Má pripravené moduly priamo pre Shoptet aj Google Sheets. Nemusím písať kód pre zložité prihlasovanie (OAuth2) do Google účtu, Make to vyrieši za mňa. 
* **Spoľahlivosť:** Ak sa zápis raz nepodarí, nástroj ho automaticky zopakuje, čím predchádzame strate dát.

---

## 4. Logika spracovania (Postupnosť krokov)
Logiku spracovania definujem ako sled krokov v integračnom nástroji:
1. **PRIJMI** dáta (JSON) zo Shoptet Webhooku po každej novej objednávke.
2. **MAPUJ** získané polia (napr. `billingAddress.fullName` → stĺpec "Meno" v tabuľke).
3. **ZAPÍŠ** tieto údaje do nového riadku v Google Sheets.
4. **NOTIFIKUJ** (voliteľné), ak by proces náhodou zlyhal, aby som mohol chybu manuálne opraviť.
