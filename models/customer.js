const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
    name: { 
      type:String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: { 
      type:String,
      required: true,
      minlength: 5,
      maxlength: 10
    }
  
  });
  
  
const Customer =mongoose.model('Customer',customerSchema);

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      phone: Joi.string().min(5).max(13).required(),
      isVip: Joi.boolean()
    };
    
    return Joi.validate(customer, schema);
  }

  module.exports.Customer = Customer;
  module.exports.validateCustomer = validateCustomer;


