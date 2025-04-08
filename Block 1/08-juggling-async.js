const http = require('http');

const results = [];

let completed = 0;

for (let i = 0; i < 3; i++) {
  http.get(process.argv[i + 2], (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        results[i] = data;
        completed++;
      
        if (completed === 3) {
          // All done – print in order
          results.forEach(r => console.log(r));
        }
      });
  });
}
