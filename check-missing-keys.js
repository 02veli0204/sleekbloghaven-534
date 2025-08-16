import en from './src/locales/en.json' assert { type: "json" };
import tr from './src/locales/tr.json' assert { type: "json" };
import no from './src/locales/no.json' assert { type: "json" };

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