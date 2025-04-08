require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));


app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.post('/name', (request, response) => {
    const name = request.headers.name;
    if (!name) {
        return response.status(400).send('Name is required');
    }
    request.session.name = name;
    response.send(`Hello ${name}!`);
});

app.get('/name', (request, response) => {
    const name = request.session.name;
    if (!name) {
        return response.status(400).send('There is no Name :(');
    }
    response.send(`Hello ${name}, Was geht?`);
});

app.delete('/name', (request, response) => {
    const name = request.session.name;
    if (!name) {
        return response.status(400).send('There is no Name :(');
    }
    request.session.destroy();
    response.send(`Goodbye ${name}!`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
