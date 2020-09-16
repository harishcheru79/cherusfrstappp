const {Customer,validateCustomer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();

router.get('/', async (req, res) => {
  const Customers = await Customer
      .find()
      .sort({name: 1});

  res.send(Customers);
  });
  
router.post('/',async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  let customer = new Customer(
      {
        name:req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
      })

  customer = await customer.save();
  res.send(customer);
});
  
router.put('/:id',async (req, res) => {
  const result = validateCustomer(req.body); 
  if (result.error) {
    res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
      name:req.body.name,
      isVip: req.body.isVip,
      phone: req.body.phone
    },{new: true});
    

  if (!customer) {
    res.status(404).send('The genre with the given ID was not found.');
    return;
    } 

  res.send(customer);
});
  
router.delete('/:id',async (req, res) => {

  const customer = await Customer.findByIdAndRemove(req.params.id)

  if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  

  res.send(customer);
});
  
 router.get('/:id',async (req, res) => {

  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  res.send(customer);
});
  

module.exports = router;
