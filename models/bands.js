'use strict'

import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from "../credentials.js";

mongoose.connect(connectionString, {
    dbName: 'scc_projects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const bandSchema = new Schema({
 name: { type: String, required: true },
 sing: String,
 guitar1: String,
 guitar2: String,
 bass: String,
 drums: String
});

export const Band = mongoose.model('Band', bandSchema);