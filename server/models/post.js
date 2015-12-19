var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
    _user: {type: Schema.ObjectId, ref: 'User', required: true},
    _topic: {type: Schema.ObjectId, ref: 'Topic', required: true},
    content: {type: String, required: true, minlength: 2},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    comments: [{type: Schema.ObjectId, ref: 'Comment'}],
    created_at: {type: Date, default: Date.now}
});

var Post = mongoose.model('Post', PostSchema)