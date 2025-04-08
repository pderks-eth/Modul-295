const fs = require('node:fs');

datei = 'beispiel.txt';

function leseDateiInhalt(datei) {
  return new Promise((resolve, reject) => {
    fs.readFile(datei, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

leseDateiInhalt('beispiel.txt')
  .then(inhalt => {
    console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
  })
  .catch(err => {
    console.error('Fehler beim Lesen der Datei:', err);
});
