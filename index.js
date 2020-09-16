const mongoose = require('mongoose')
const Joi = require('joi');
const express = require('express');
const app = express();
const database = require('../cheru_frstapp/config/database');

const genres = require('./routes/genres');
const customers = require('./routes/customers');


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);

mongoose.connect(process.env.CUSTOMCONNSTR_MyConnectionString || database.localUrl)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.error('Not connected to mongo db',err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));