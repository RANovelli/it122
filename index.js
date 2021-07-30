'use strict'

// import * as data from './data.js';
import express from 'express';
import exphbs from "express-handlebars";
import { Band } from "./models/bands.js";
import cors from 'cors';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

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

// API routes
app.get('/api/bands', (req,res) => {
    Band.find({}).lean()
        .then((bands) => {
            res.json(bands)
        })
        .catch(err => next(err));
});

app.get('/api/bands/detail/:name', (req,res,next) => {
    Band.findOne({ name:req.params.name }).lean()
        .then((band) => {
            res.json(band)
        })
        .catch(err => next(err));
});

app.post('/api/bands/add', (req,res,next) => {
    Band.updateOne({'name':req.body.name}, req.body, {upsert:true}, (err, result) => {
        if (err) return next(err);
        console.log(result);
        // .catch(err => next(err));
        res.json({"message": "band added"})    
    });
});    

app.get('/api/bands/delete/:name', (req,res) => {
    Band.deleteOne({ name:req.params.name }, (err, result) => {
        if (err) return next(err);
        console.log(result)
        res.json({"message": "delete successful"})    
    });
});

// define 404 handler
app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});