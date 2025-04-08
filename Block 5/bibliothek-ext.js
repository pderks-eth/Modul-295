const express = require('express');
const { redirect } = require('express/lib/response');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/books', async (req, res) => {
    res.sendFile(__dirname + '/books.json');
});

app.get('/books/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const books = require('./books.json');
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.post('/books', async (req, res) => {
    const newBook = req.body;
    const books = require('./books.json');
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const updatedBook = req.body;
    const books = require('./books.json');
    const index = books.findIndex(b => b.isbn === isbn);
    if (index !== -1) {
        books[index] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.delete('/books/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const books = require('./books.json');
    const index = books.findIndex(b => b.isbn === isbn);
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.patch('/books/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const updatedBook = req.body;
    const books = require('./books.json');
    const index = books.findIndex(b => b.isbn === isbn);
    if (index !== -1) {
        Object.assign(books[index], updatedBook);
        res.json(books[index]);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});


// Exended: Lend API

app.get('/lends', async (req, res) => {
    res.sendFile(__dirname + '/lends.json');
});

app.get('/lends/:id', async (req, res) => {
    const id = req.params.id;
    const lends = require('./lends.json');
    const lend = lends.find(b => b.id === id);
    if (lend) {
        res.json(lend);
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
});

app.post('/lends', async (req, res) => {
    const newLend = req.body;
    const lends = require('./lends.json');
    lends.push(newLend);
    res.status(201).json(newLend);
});

app.delete('/lends/:id', async (req, res) => {
    const id = req.params.id;
    const lends = require('./lends.json');
    const index = lends.findIndex(b => b.id === id);
    if (index !== -1) {
        lends.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
