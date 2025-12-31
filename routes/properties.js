const express = require('express');
const router = express.Router();
const Property = require('../models/property');

// Get all properties
router.get('/', async (req,res) => {
  try{
    const properties = await Property.find().populate('owner','name email');
    res.json({ success:true, data:properties });
  }catch(err){
    res.status(500).json({ success:false, error: err.message });
  }
});

// Create property (for now no auth)
router.post('/', async (req,res) => {
  try{
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ success:true, data:property });
  }catch(err){
    res.status(500).json({ success:false, error: err.message });
  }
});

module.exports = router;