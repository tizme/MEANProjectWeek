var serverController = require('./../controllers/server_controller.js')

module.exports = function(app){
	app.post('/register', serverController.register);
	app.post('/login', serverController.login);
	app.get('/logout', serverController.logout);
	app.get('/current', serverController.current);
	app.get('/messages', serverController.getMessages);
	app.post('/message', serverController.createMessage);
	app.delete('/message_id', serverController.delete);
	app.get('comment', serverController.comment);
	app.post('comment', serverController.comment);
	
}


