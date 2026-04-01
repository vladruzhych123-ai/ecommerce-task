# Riešenie testovacej úlohy — Integrácia (Make / Integromat)

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
