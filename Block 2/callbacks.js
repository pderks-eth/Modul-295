const verdoppeln = (zahl, callback) => {
    // Simuliere eine asynchrone Operation mit setTimeout
    setTimeout(() => {
        const ergebnis = zahl * 2;
        callback(ergebnis);
    }, 1000);
};

verdoppeln(5, function(ergebnis) {
    console.log('Das Ergebnis ist:', ergebnis);
});

console.log('Dies wird sofort ausgegeben, während die Verdopplung läuft.');
