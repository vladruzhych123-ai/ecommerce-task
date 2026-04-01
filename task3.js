/* ÚLOHA: Debugging kódu pre pridávanie do košíka
  V poskytnutom kóde som našiel 3 chyby, ktoré by bránili správnemu fungovaniu.
*/

// --- OPRAVENÝ KÓD ---

document.addEventListener('DOMContentLoaded', function() {
  const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
  
  addToCartBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      // OPRAVA 1: Doplnené zátvorky () pre volanie funkcie
      e.preventDefault(); 
      
      const productId = btn.getAttribute('data-product');
      
      // OPRAVA 2: .val() zmenené na .value (štandardný JavaScript)
      const quantityField = document.querySelector('#qty-' + productId);
      const quantity = quantityField ? quantityField.value : 1; 
      
      fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          qty: quantity
        })
      })
      // OPRAVA 3: Doplnené zátvorky () k metóde .json()
      .then(response => response.json()) 
      .then(data => {
        console.log('Pridané do košíka', data);
      });
    });
  });
});

/*
--- VYSVETLENIE CHÝB ---

1. Chýbajúce volanie e.preventDefault()
   Problém: preventDefault je metóda, ktorú je potrebné vyvolať pomocou zátvoriek. 
   Bez nich by došlo k predvolenej akcii prehliadača, čo by prerušilo AJAX volanie.

2. Zámena jQuery syntaxe .val() s čistým JavaScriptom
   Problém: Metóda .val() patrí do jQuery. V čistom JavaScripte (document.querySelector) 
   táto metóda neexistuje a spôsobila by chybu TypeError. Používa sa vlastnosť .value.

3. Chýbajúce volanie metódy response.json()
   Problém: json() je metóda, ktorá spracováva prichádzajúce dáta. Bez zátvoriek 
   by premenná v nasledujúcom kroku neobsahovala JSON objekt, ale len definíciu funkcie.
*/
