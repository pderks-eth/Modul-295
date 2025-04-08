const http = require('http');

let fullData = '';

http.get(process.argv[2], (response) => {
  // set encoding to utf8
  response.setEncoding('utf8');
  // handle errors
  response.on('error', (err) => {
    console.error(err);
  });

  response.on('data', (chunk) => {
    fullData += chunk.toString();
  });

  response.on('end', () => {
      // now you can use fullData
      console.log(fullData.length);
      console.log(fullData);
  });

});
