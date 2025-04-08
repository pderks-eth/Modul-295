const verdoppeln = (zahl) => {
    
    const ergebnis = zahl * 2;

    return new Promise((resolve) => {
        resolve(ergebnis);
    });
};

verdoppeln(5)
    .then((ergebnis) => verdoppeln(ergebnis))
    .then((ergebnis) => console.log('Das Ergebnis ist:', ergebnis))

console.log('Dies wird sofort ausgegeben, während die Verdopplung läuft.');
