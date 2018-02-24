'use strict';

const http = require('http');

const server = http.createServer((req, resp) => {
    resp.write("Hello world");
    resp.end();
});

server.listen(process.env.PORT || 3000);