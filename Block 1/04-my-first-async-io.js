const fs = require('fs');

// Read the file asynchronously like this:
fs.readFile(process.argv[2], 'utf8', (err, data) => {
  if (err) {
    // Handle the error
    return;
  }
    const lines = data.split('\n');

    console.log(lines.length - 1);
});

