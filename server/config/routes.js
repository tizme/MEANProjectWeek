var serverController = require('./../controllers/server_controller.js')

module.exports = function(app){
	app.post('/register', serverController.register);
	app.post('/login', serverController.login);
	app.get('/logout', serverController.logout);
	app.get('/current', serverController.current);
	app.get('/messages', serverController.getMessages);
	app.get('/user/:user_id', serverController.getUser);
	app.get('/user_messages/:id', serverController.getUserMessages);
	app.post('/message', serverController.createMessage);
	app.get('/topics', serverController.getTopics);
	app.get('/user_topics/:id', serverController.getUserTopics);
	app.get('/topic/:topic_id', serverController.getTopic);
	app.get('/topic/messages/:topic_id', serverController.getTopicMessagesComments);
	app.post('/topic', serverController.createTopic);
	app.get('/user_comments/:id', serverController.getUserComments);
	app.post('/comment/:id', serverController.createComment);

}
