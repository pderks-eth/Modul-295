const net = require('net');

const server = net.createServer((socket) => {
    const now = new Date();

    year = now.getFullYear();       // YYYY
    month = now.getMonth() + 1;      // MM (add +1 because it's zero-based!)
    date = now.getDate();           // DD
    hours = now.getHours();          // hh
    minute = now.getMinutes();        // mm
    
    // Set rigt format for month, date, hours and minutes
    if (month < 10) {
        month = '0' + month;
    }

    if (date < 10) {
        date = '0' + date;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minute < 10) {
        minute = '0' + minute;
    }


    const output = year + '-' + month + '-' + date + ' ' + hours + ':' + minute + '\n';

    socket.end(output);

});

server.listen(Number(process.argv[2]));
