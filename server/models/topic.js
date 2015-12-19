var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new mongoose.Schema({
    _user: {type: Schema.ObjectId, required: true, ref: 'User'},
    _category: {type: Schema.ObjectId, required: true, ref: 'Category'},
    title: {type: String, required: true, minlength: 2, maxlength: 255},
    description: {type: String, required: true, minlength: 2},
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    created_at: {type: Date, default: Date.now}
});

var Topic = mongoose.model('Topic', TopicSchema)

var deepPopulate = require('mongoose-deep-populate')(mongoose);
TopicSchema.plugin(deepPopulate);