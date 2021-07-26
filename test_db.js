'use strict'

import { Band } from "./models/bands.js";

//find all documents
Band.find({}, (err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
    return
});

// // count # of docs
console.log("step 1")
Band.countDocuments((err, result) => {
    console.log("step 2")
    console.log(result + " db entries");
});
console.log("step 3")