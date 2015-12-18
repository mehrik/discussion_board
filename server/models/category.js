var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2}
});

var Category = mongoose.model('Category', CategorySchema)