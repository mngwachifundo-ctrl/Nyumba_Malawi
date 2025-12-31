const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: { type: String, enum: ['free','silver','gold'], default: 'free' }
});

// hash password
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);