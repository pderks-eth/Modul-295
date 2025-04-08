const http = require('http');

http.get(process.argv[2], (response) => {
    response.on('data', (chunk) => {
        chunk = chunk.toString();
        console.log(chunk);
    });
      
});


