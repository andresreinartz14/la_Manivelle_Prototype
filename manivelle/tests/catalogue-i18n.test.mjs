import test from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
import {PRODUCTS,BRANCHES,CATEGORIES} from '../dist/domain.mjs';
import {translateText} from '../dist/i18n.mjs';

test('the expanded catalogue has 50 distinct, reservable, bilingual entries',()=>{
  assert.equal(PRODUCTS.length,50);
  assert.equal(new Set(PRODUCTS.map(p=>p.id)).size,50);
  for(const product of PRODUCTS){
    assert.ok(product.name&&product.nameEn&&product.description&&product.descriptionEn,`Missing bilingual copy: ${product.id}`);
    assert.ok(BRANCHES[product.branch]);
    assert.ok(CATEGORIES.some(c=>c.name===product.category));
    assert.ok(Number.isFinite(product.price)&&product.price>0);
    assert.equal(translateText(product.name,'en'),product.nameEn);
    assert.equal(translateText(product.description,'en'),product.descriptionEn);
  }
});
test('every catalogue image is bundled locally',async()=>{
  await Promise.all(PRODUCTS.map(p=>access(new URL('../dist/assets/'+p.asset,import.meta.url))));
});
test('dynamic labels, dates, availability errors and notifications translate',()=>{
  assert.equal(translateText('50 résultats','en'),'50 results');
  assert.equal(translateText('1 résultat','en'),'1 result');
  assert.equal(translateText('31–45 sur 50 objets','en'),'31–45 of 50 items');
  assert.equal(translateText('Panier, 2 articles','en'),'Cart, 2 items');
  assert.equal(translateText('6 November 2026, préparation','en'),'6 November 2026, preparation');
  assert.equal(translateText('Un emprunt dure au maximum 7 jours.','en'),'A loan lasts a maximum of 7 days.');
  assert.equal(translateText('Bienvenue Alice. Votre sélection est conservée.','en'),'Welcome Alice. Your selection is preserved.');
  assert.equal(translateText('La Manivelle Genève · Panier','en'),'La Manivelle Genève · Cart');
});
test('French and unrecognised visitor text remain intact',()=>{
  const input='Je voudrais un objet pour mon jardin 🌱';
  assert.equal(translateText(input,'en'),input);
  assert.equal(translateText('50 résultats','fr'),'50 résultats');
  assert.equal(translateText('  Ajouter au panier  ','en'),'  Add to cart  ');
});
