const en = require('./src/locales/en.json');
const tr = require('./src/locales/tr.json');
const no = require('./src/locales/no.json');

function findMissing(base, compare, baseLang, compareLang) {
  const missing = Object.keys(base).filter(key => !(key in compare));
  if (missing.length) {
    console.log(`${compareLang} dosyasında eksik olanlar (${baseLang} referans):`);
    missing.forEach(key => console.log(key));
  } else {
    console.log(`${compareLang} dosyasında eksik anahtar yok.`);
  }
}

findMissing(en, tr, 'en', 'tr');
findMissing(en, no, 'en', 'no');
findMissing(no, en, 'no', 'en');
findMissing(no, tr, 'no', 'tr');