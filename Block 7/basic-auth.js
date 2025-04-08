require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.get('/public', (request, response) => {
    response.send('Public content');
});

app.get('/private', (request, response) => {
    const auth = request.headers['authorization'];
    if (!auth) {
        return response.status(401).send('Authentication required');
    }

    const [username, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        response.send('Private content');
    } else {
        response.status(403).send('Forbidden');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
