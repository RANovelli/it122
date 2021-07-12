import * as data from './data.js';
import http from 'http';
import { parse } from "querystring";
http.createServer((req,res) => {
    let url = req.url.split("?");  // separate route from query string
    let query = parse(url[1]); // convert query string to a JS object 
    var path = req.url.toLowerCase();
    
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(data.getAll()))
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('My name is Ryan Novelli, this is my first homework assignment for it 122');
            break;
        case '/detail?name=rolling+stones':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(data.getItem(query.name)))
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error, page not found');
            break;
    }
}).listen(process.env.PORT || 3000);
