// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Bibliothek API',
    description: 'API-Dokumentation für Books und Lends',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    { name: 'Books', description: 'Bücher verwalten' },
    { name: 'Lends', description: 'Ausleihen verwalten' },
  ],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./bibliothek-auth.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
