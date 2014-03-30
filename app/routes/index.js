module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
  app.post('/api/login', require('./authApi').login);
  app.post('/api/register', require('./authApi').register);
  app.post('/api/logout', require('./authApi').logout);

  app.get('/api/user/getById', require('./userApi').getById);

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};