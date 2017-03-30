var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {type:String, required: true, minlength: 2, maxlength: 10},
	email: {type:String, required: true, unique: true},
	password: {type:String, required: true, minlength: 8},
	_topics: [{type:Schema.Types.ObjectId, ref: 'Topic'}],
	_messages: [{type:Schema.Types.ObjectId, ref: 'Message'}],
	_comments: [{type:Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps:true})

mongoose.model('User', UserSchema);

var TopicSchema = new mongoose.Schema({
	topic: {type:String, required: true, minlength: 2},
	category: {type:String, required: true, minlength: 2},
	_messages: [{type:Schema.Types.ObjectId, ref: 'Message'}],
	_user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

mongoose.model('Topic', TopicSchema);

var MessageSchema = new mongoose.Schema({
	message: {type:String, required: true, minlength: 2, maxlength: 100},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	_topic: {type:Schema.Types.ObjectId, ref: 'Topic'},
	_comments: [{type:Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})

mongoose.model('Message', MessageSchema);

var CommentSchema = new mongoose.Schema({
	comment: {type:String, required: true, minlength: 2, maxlength: 100},
	_message: {type:Schema.Types.ObjectId, ref: 'Message'},
	_user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

mongoose.model('Comment', CommentSchema);

//Schemas
