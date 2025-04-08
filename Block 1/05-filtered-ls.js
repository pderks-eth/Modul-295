const fs = require('fs');
const path = require('path');

fs.readdir(process.argv[2], (err, list) => {
    if (err) {
        // Handle the error
        return;
    }
    const ext = '.' + process.argv[3];
    list.forEach(file => {
        if (path.extname(file) === ext) {
            console.log(file);
        }
    });
}
);
