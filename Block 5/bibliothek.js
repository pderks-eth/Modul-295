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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
