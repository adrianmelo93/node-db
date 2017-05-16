const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  name: {type: String, required: true},
  symbol: { type: String },
  price: { type: Number },
  date: { type: Date, required: true, default: Date.now }
});

const Datadb = mongoose.model('data', DataSchema);
module.exports= Datadb;
