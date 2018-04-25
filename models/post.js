var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
//create schema
  var postSchema = new mongoose.Schema({
  	Type: String,
  	Quantity: Number 
  });
//create post model from schema
  var Post = mongoose.model('Post', postSchema);
//export post
  module.exports = Post;