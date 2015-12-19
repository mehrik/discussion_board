var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
    _user: {type: Schema.ObjectId, ref: 'User', required: true},
    _post: {type: Schema.ObjectId, ref: 'Post', required: true},
    content: {type: String, required: true, minlength: 2},
    created_at: {type: Date, default: Date.now}
});

var Comment = mongoose.model('Comment', CommentSchema)