const express = require('express');
const { redirect } = require('express/lib/response');

const app = express();
const port = 3000;

const names = [
    'Max',
    'Moritz',
    'Hans',
    'Peter',
    'Anna',
    'Maria',
    'Julia',
    'Lukas',
    'Sophie',
    'Tim',
    'Nina',
    'Paul',
    'Emma',
    'Noah',
    'Leon',
    'Lina',
    'Mia',
    'Elias',
    'Laura',
    'Felix',
    'Lea',
];

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}


// Endpoints
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/home.html');
});

app.get('/now', (request, response) => {
    const now = new Date();
    response.send(`Aktuelles Datum und Uhrzeit: ${now}`);
});

app.get('/zli', (request, response) => {
    return response.redirect('https://www.zli.ch');
});

app.get('/name', (request, response) => {
    return response.send(`Name: ${names.random()}`);
});

app.get('/html', (request, response) => {
    return response.sendFile(__dirname + '/index.html');
});

app.get('/image', (request, response) => {
    return response.sendFile(__dirname + '/fisch.png');
});

app.get('/teapot', (request, response) => {
    return response.status(418).send('Ich bin eine Teekanne');
});

app.get('/user-agent', (request, response) => {
    const userAgent = request.headers['user-agent'];
    return response.send(`User-Agent: ${userAgent}`);
});

app.get('/secret', (request, response) => {
    return response.status(403).send('Zugriff verweigert');
});

app.get('/xml', (request, response) => {
    return response.sendFile(__dirname + '/index.xml');
});

app.get('/me', (request, response) => {
    const me = {
        Vorname: 'Philipp',
        Nachname: 'Derks',
        Alter: 17,
        Wohnort: 'Oberhasli',
        Augenfarbe: 'braun/grün',
    };
    return response.json(me);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});