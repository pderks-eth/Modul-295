const express = require('express');
const { redirect } = require('express/lib/response');

const app = express();
const port = 3000;

const url = `https://api.chucknorris.io/jokes/random`;

app.use(express.urlencoded({ extended: true }));


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
    const tz = request.query.tz || 'UTC';
    try {
        const date = new Date().toLocaleString('de-CH', { timeZone: tz });
        response.json({ tiem:date, TimeZone:tz });
    } catch (error) {
        response.status(400).json({ error: 'Invalid timezone' });
    }
});

app.post('/names', (request, response) => {
    const name = request.body.name;
    if (name) {
        names.push(name);
        console.log(`Name ${name} added.`);
    }
    response.redirect('/');
});

app.get('/secret2', (request, response) => {
    const authHeader = request.headers['authorization'];
    if (authHeader === 'Basic aGFja2VyOjEyMzQ=') {
        response.sendStatus(200);
    } else {
        response.sendStatus(401);
    }
});

app.get('/chuck', async (req, response) => {
    const res = await fetch(url);
    if (!res.ok) {
        return response.status(res.status).json({ error: 'Fehler beim Abrufen der Daten' });
    }
    const data = await res.json();
    const joke = data.value;
    if (joke === undefined) {
        return response.status(404).json({ error: 'Witzdaten nicht gefunden' });
    }
    response.json({ joke });
});

app.get('/chuck/:name', async (req, response) => {
    const name = req.params.name;
    const res = await fetch(url + `?name=${name}`); 
    if (!res.ok) {
        return response.status(res.status).json({ error: 'Fehler beim Abrufen der Daten' });
    }
    const data = await res.json();
    const joke = data.value;
    if (joke === undefined) {
        return response.status(404).json({ error: 'Witzdaten nicht gefunden' });
    }
    response.json({ joke });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});