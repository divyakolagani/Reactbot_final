const mongoose = require('mongoose');

const { Schema } = mongoose;

const couponsSchema = new Schema({
  location: String,
  link: String,
});

mongoose.model('Coupons', couponsSchema);
