const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

userSchema.methods.setPassword = async function(plain){
  this.passwordHash = await bcrypt.hash(plain, 10);
};

userSchema.methods.validatePassword = function(plain){
  return bcrypt.compare(plain, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
