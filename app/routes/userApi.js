var User = require('../models/user').User;
var HttpError = require('../error').HttpError;

exports.getById = function(req, res, next) {
  var userId = req.query.userId;
  if (!userId) throw new Error('userId must be specified');

  User.findById(userId, function(err, user) {
    if (err) throw err;

    res.json(user);
  });
};