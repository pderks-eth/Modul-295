const fs = require('fs');

// console.log(process.argv);
// Read the file contents like this:
const content = fs.readFileSync(process.argv[2], 'utf8');

const lines = content.split('\n');

console.log(lines.length - 1);