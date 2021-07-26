'use strict'

// import * as data from './data.js';
import express from 'express';
import exphbs from "express-handlebars";
import { Band } from "./models/bands.js";

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// send static file as response
app.get('/', (req,res) => {
    Band.find({}).lean()
        .then((bands) => {
            res.render('home', { bands });
        })
        .catch(err => next(err));
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
});

// handle GET 
app.get('/delete', (req,res) => {
    Band.remove({ name:req.query.name }, (err, result) => {
        if (err) return next(err);
        console.log(result)
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        Band.count((err, total) => {
            res.type('text/html');
            res.render('delete', {name: req.query.name, deleted: result.result.n !== 0, total: total } );    
        });
    });
});

app.get('/detail', (req,res,next) => {
    Band.findOne({ name:req.query.name }).lean()
        .then((band) => {
            res.render('details', {result: band} );
        })
        .catch(err => next(err));
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