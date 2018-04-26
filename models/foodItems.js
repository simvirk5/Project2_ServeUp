//reference data is allowing one user to create multiple foodItems list
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
//create schema
  var foodItemSchema = new mongoose.Schema({
  	userId: {
  		type: Schema.Types.ObjectId,
  		reference: 'User',
  		required: true
  	},
  	checkedItems: Array,
  	postItems: Array,
  	createdAt: {type: Date, default: Date.now}
  });
//create post model from schema
  var foodItem = mongoose.model('foodItem', foodItemSchema);
//export post
  module.exports = foodItem;