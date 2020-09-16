const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = mongoose.Schema({
    name: { 
      type:String,
      required: true,
      minlength: 2,
      maxlength: 50
  
    }
  });
  
  
const Genre =mongoose.model('Genre',genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  
  return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;