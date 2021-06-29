const http = require("http");
http.createServer((req,res) => {
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home page for IT 122');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('My name is Ryan Novelli, this is my first homework assignment for it 122');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error, page not found');
            break;
    }
}).listen(process.env.PORT || 3000);