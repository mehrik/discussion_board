var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 20},
    topics: [{type: Schema.ObjectId, ref: 'Topic'}],
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    comments: [{type: Schema.ObjectId, ref: 'Comment'}]
});

var User = mongoose.model('User', UserSchema)