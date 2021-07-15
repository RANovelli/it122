'use strict'

import * as data from './data.js';
import express from 'express';
import exphbs from "express-handlebars";

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// send static file as response
app.get('/', (req,res) => {
    res.render('home', {bands: data.getAll()});
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
});

// handle GET 
// app.get('/delete', (req,res) => {
//     let result = data.deleteItem(req.query.name); // delete book object
//     res.render('delete', {bands: req.query.name, result: result});
// });

app.get('/detail', (req,res) => {
    console.log(req.query)
    let result = data.getItem(req.query.name);
    res.render("details", {
        name: req.query.name, 
        result
        }
    );
});

// // handle POST
// app.post('/detail', (req,res) => {
//     console.log(req.body)
//     let found = data.getItem(req.body.name);
//     res.render("details", {band: req.body.name, result: found, band: data.getAll()});
// });

// define 404 handler
app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});