var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

var bcrypt = require('bcryptjs');

module.exports = {
	register: function(req, res){
		console.log('attempting to register user');
		var salt = bcrypt.genSaltSync(10);
		if(req.body.password){
			var hash = bcrypt.hashSync(req.body.password, salt);
			console.log('hashed password', hash);
			var user = new User({name: req.body.name, email:req.body.email, password: hash});
			user.save(function(err, data){
				if(err){
					res.status(400).send("Could not register user.");
				}
				else{
					req.session.user = data;
					res.sendStatus(200);
					console.log('user registered?');
				}
			})
		}
	},
	login: function(req, res){
		console.log('logging', req.body);
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.status(400).send("Could not login user.");
			}
			else{
				console.log('attempting bcrypt');
				console.log(user);
				if(bcrypt.compareSync(req.body.password, user.password)){
					req.session.user = user;
					res.sendStatus(200);
					console.log('user in session', req.session.user);
				}
			}
		})
	},
	logout: function(req, res){
		req.session.destroy();
		res.redirect('/');
	},
	// current: function(req, res){
	// 	if(req.session.user){
	// 		res.json(req.session.user);
	// 	}else{
	// 		res.status(401).send("No user in session.");
	// 	}
	// },
	getTopics: function(req, res){
		Topic.find({}).populate('_messages').populate('_user').exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting topics.")
			}
			else{
				res.json(data);
			}
		})
	},
	getMessages: function(req, res){
		Message.find({}).populate('_user').populate('_topic').populate('_comments').exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting messages.")
			}
			else{
				res.json(data);
			}
		})
	},
	getUserMessages: function(req, res){
		User.findOne({_id: req.params.user_id}).populate('_messages').exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting user posts.")
			}
			else{
				res.json(data);
			}
		})
	},
	createTopic: function(req, res){
		console.log('server reached');
		console.log('the req', req.body);
		var topic = new Topic(req.body);
		console.log('sesion user', req.session.user);
		console.log(topic);
		topic._user = req.session.user._id;
		console.log('the topic', topic);
		topic.save(function(err, data){
				if(err){
					console.log(err);
					res.status(400).send("Could not create new topic.");
				}
				else{
					User.findOne({_id: req.session.user._id}, function(err,user){
					if(err){
						res.status(400).send("Problem finding user.");
					}
					else{
						user._topics.push(req.params.topic_id);

						user.save(function(err,data){
							if(err){
								res.status(400).send("Problem saving user topic.");
							}
							else{
								res.sendStatus(200);
							}
						})
					}
				})
			}
		})
	},
	getUserTopics: function(req, res){
		User.findOne({_id: req.params.user_id}).populate('_topics').exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting user topics.")
			}
			else{
				res.json(data);
			}
		})
	},
	createMessage: function(req, res){
		var message = new Message(req.body);
		message._user = req.session.user._id;
		message._topic = req.params.topic_id;
		message.save(function(err, data){
			if(err){
				res.status(400).send("Problem saving message.");
			}
			else{
				User.findOne({_id: req.session.user._id}, function(err,user){
					if(err){
						res.status(400).send("Problem finding user.");
					}
					else{
						user._topics.push(req.params.topic_id);
						user._messages.push(message.message_id);
						user.save(function(err,data){
							if(err){
								res.status(400).send("Problem saving user message.");
							}
							else{
								Topic.findOne({_id: req.params.topic_id}, function(err,topic){
									if(err){
										res.status(400).send("Problem finding topic.");
									}
									else{
										topic._messages.push(message.message_id);

										topic._user = req.session.user._id;
										topic.save(function(err,data){
											if(err){
												res.status(400).send("Problem saving topic message.");
											}
											else{
												res.sendStatus(200);
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	},
	createComment: function(req, res){
		var comment = new Comment(req.body);
		comment._message = req.params.message_id;
		comment._user = req.session.user._id;
		comment.save(function(err, data){
			if(err){
				res.status(400).send("Problem saving comment.");
			}
			else{
				Message.findOne({_id: req.params.message_id}, function(err,message){
					if(err){
						res.status(400).send("Problem finding message.");
					}
					else{
						message._user = req.session.user._id;
						message._topic = req.params.topic_id;
						message._comments.push(req.params.message_id);
						message.save(function(err,data){
							if(err){
								res.status(400).send("Problem saving user.");
							}
							else{
								User.findOne({_id: req.session.user._id}, function(err,user){
									if(err){
										res.status(400).send("Problem finding user.");
									}
									else{
										user._comments.push(comment.comment_id);
										user.save(function(err,data){
											if(err){
												res.status(400).send("Problem saving topic.");
											}
											else{
												res.sendStatus(200)
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	},

// <<<<<<< Ignacio2
// 		var topics = new Topics(req.body);
// 		comment._topic = req.params.message_id;
// 		comment._topic = req.params.topic_id;
// 		comment._topic = req.session.user._id;
// 		comment._save(function(err, data){
// 			if(err){
// 				res.status(400).send("Problem saving comment.");
// 			}
// 			else{
// 				Topic.findOne({_id: req.params.message_id}, function(err,message){
// 					if(err){
// 						res.status(400).send("Problem finding message.");
// 					}
// 					else{
// 						Topic.user = req.session.user._id;
// 						Topic.topic = req.params.topic_id;
// 					Topic.comments.push(req.params.message_id);
// 						Topic.save(function(err,data){
// 							if(err){
// 								res.status(400).send("Problem saving user.");
// 							}
// 							else{
// 								Topic.findOne({_id: req.params.topic_id}, function(err,topic){
// 									if(err){
// 										res.status(400).send("Problem finding topic.");
// 									}
// 									else{
// 										topic._messages.push(message.message_id);
// 										topic.save(function(err,data){
// 											if(err){
// 												res.status(400).send("Problem saving topic.");
// 											}
// 											else{
// 												res.sendStatus(200);

// 											},
// 	getUserMessages: function(req, res){
// 		var messages = new Message(req.body);
// 		comment._messages = req.params.message_id;
// 		comment._messages = req.params.topic_id;
// 		comment._messages = req.session.user._id;
// 		comment._save(function(err, data){
// 			if(err){
// 				res.status(400).send("Problem saving comment.");
// 			}
// 			else{
// 				Message.findOne({_id: req.params.message_id}, function(err,message){
// 					if(err){
// 						res.status(400).send("Problem finding message.");
// 					}
// 					else{
// 						Message.user = req.session.user._id;
// 						Message.topic = req.params.topic_id;
// 					Message.comments.push(req.params.message_id);
// 						Message.save(function(err,data){
// 							if(err){
// 								res.status(400).send("Problem saving user.");
// 							}
// 							else{
// 								Message.findOne({_id: req.params.topic_id}, function(err,topic){
// 									if(err){
// 										res.status(400).send("Problem finding topic.");
// 									}
// 									else{
// 										Message_messages.push(message.message_id);
// 										Mesage.save(function(err,data){
// 											if(err){
// 												res.status(400).send("Problem saving topic.");
// 											}
// 											else{
// 												res.sendStatus(200);
// 											},
// 											getUserComments:
// 										}
	getUserTopicsMessagesComments: function(req, res){
		User.findOne({_id: req.session.user._id}).populate('_topics').populate('_messages').populate('_comments').exec(function(err, data){
			if(err){
					res.status(400).send("Problem getting user topics.")
			}
			else{
					res.json(data);
			}
		})
	},
		getUserTopics: function(req, res){
			console.log(req.session.user);
  		User.findOne({_id: req.session.user._id}).populate('_topics').exec(function(err, data){
    		if(err){
      			res.status(400).send("Problem getting user topics.")
    		}
    		else{
      			res.json(data);
    		}
  		})
	},
	getUserMessages: function(req, res){
		User.findOne({_id: req.session.user._id}).populate('_messages').exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting user messages.")
			}
			else{
					res.json(data);
			}
		})
	},
	getUserComments: function(req, res){
		User.findOne({_id: req.session.user._id}).populate('_comments').exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting user comments.")
			}
			else{
				res.json(data);
			}
		})
	}
}
