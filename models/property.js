const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  propertyType: { type: String, enum:['house','apartment','villa','land','commercial'] },
  listingType: { type: String, enum:['sale','rent'] },
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  images: [String],
  status: { type:String, enum:['active','pending'], default:'active'},
  createdAt: { type:Date, default:Date.now }
});

module.exports = mongoose.model('Property', propertySchema);