const express = require('express');
const { redirect } = require('express/lib/response');

const app = express();
const books = require('./books.json');
const lends = require('./lends.json');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/books', async (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.description = 'Gibt alle Bücher zurück'
    res.sendFile(__dirname + '/books.json');
});

app.get('/books/:isbn', async (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.description = 'Gibt ein Buch zurück'
    // #swagger.parameters['isbn'] = { description: 'ISBN des Buches' }
    // #swagger.responses[200] = { description: 'Buch gefunden' }
    // #swagger.responses[404] = { description: 'Buch nicht gefunden' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }

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
    // #swagger.tags = ['Books']
    // #swagger.description = 'Fügt ein neues Buch hinzu'
    // #swagger.parameters['book'] = { description: 'Buch-Objekt' }
    // #swagger.responses[201] = { description: 'Buch erfolgreich hinzugefügt' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }

    const newBook = req.body;

    if (!newBook.isbn || !newBook.title || !newBook.year || !newBook.author) {
        return res.status(400).json({ error: 'Missing required book parameters (isbn, title, year, author)' });
    }
    const books = require('./books.json');
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:isbn', async (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.description = 'Aktualisiert ein Buch'
    // #swagger.parameters['isbn'] = { description: 'ISBN des Buches' }
    // #swagger.parameters['book'] = { description: 'Aktualisiertes Buch-Objekt' }
    // #swagger.responses[200] = { description: 'Buch erfolgreich aktualisiert' }
    // #swagger.responses[404] = { description: 'Buch nicht gefunden' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }

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
    // #swagger.tags = ['Books']
    // #swagger.description = 'Löscht ein Buch'
    // #swagger.parameters['isbn'] = { description: 'ISBN des Buches' }
    // #swagger.responses[204] = { description: 'Buch erfolgreich gelöscht' }
    // #swagger.responses[404] = { description: 'Buch nicht gefunden' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }

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
    // #swagger.tags = ['Books']
    // #swagger.description = 'Aktualisiert ein Buch'
    // #swagger.parameters['isbn'] = { description: 'ISBN des Buches' }
    // #swagger.parameters['book'] = { description: 'Aktualisiertes Buch-Objekt' }
    // #swagger.responses[200] = { description: 'Buch erfolgreich aktualisiert' }
    // #swagger.responses[404] = { description: 'Buch nicht gefunden' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }

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
    // #swagger.tags = ['Lends']
    // #swagger.description = 'Gibt alle Ausleihen zurück'
    // #swagger.responses[200] = { description: 'Ausleihen gefunden' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }
    res.sendFile(__dirname + '/lends.json');
});

app.get('/lends/:id', async (req, res) => {
    // #swagger.tags = ['Lends']
    // #swagger.description = 'Gibt eine Ausleihe zurück'
    // #swagger.parameters['id'] = { description: 'ID der Ausleihe' }
    // #swagger.responses[200] = { description: 'Ausleihe gefunden' }
    // #swagger.responses[404] = { description: 'Ausleihe nicht gefunden' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }

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
    // #swagger.tags = ['Lends']
    // #swagger.description = 'Fügt eine neue Ausleihe hinzu'
    // #swagger.parameters['lend'] = { description: 'Ausleih-Objekt' }
    // #swagger.responses[201] = { description: 'Ausleihe erfolgreich hinzugefügt' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }
    // #swagger.responses[409] = { description: 'Buch ist bereits ausgeliehen' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }
    const newLend = req.body;
    const books = require('./books.json');
    const lends = require('./lends.json');

    const bookExists = books.some(book => book.isbn === newLend.isbn);
    if (!bookExists) {
        return res.status(400).json({ error: 'Book does not exist' });
    }

    const isAlreadyLended = lends.some(lend => lend.isbn === newLend.isbn && lend.returned_at === null);
    if (isAlreadyLended) {
        return res.status(409).json({ error: 'Book is already lended out' });
    }

    lends.push(newLend);
    res.status(201).json(newLend);
});

app.delete('/lends/:id', async (req, res) => {
    // #swagger.tags = ['Lends']
    // #swagger.description = 'Löscht eine Ausleihe'
    // #swagger.parameters['id'] = { description: 'ID der Ausleihe' }
    // #swagger.responses[204] = { description: 'Ausleihe erfolgreich gelöscht' }
    // #swagger.responses[404] = { description: 'Ausleihe nicht gefunden' }
    // #swagger.responses[400] = { description: 'Ungültige Anfrage' }
    // #swagger.responses[500] = { description: 'Interner Serverfehler' }

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

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerFile));
