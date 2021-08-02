import * as data from './data.js';
import http from 'http';
import { parse } from "querystring";
http.createServer((req,res) => {
    let url = req.url.split("?"); 
    let query = parse(url[1]);  
    var path = req.url.toLowerCase();
    
    switch(url[0]) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(data.getAll()))
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('My name is Ryan Novelli, this is my first homework assignment for it 122');
            break;
        case '/detail':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(data.getItem(query.name)))
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error, page not found');
            break;
    }
}).listen(process.env.PORT || 3000);
