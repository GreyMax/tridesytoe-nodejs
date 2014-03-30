angular.module('appServices').factory('AuthService', function($http, Session, USER_ROLES) {
  return {
    login: function (credentials) {
      return $http
        .post('/api/login', credentials)
        .success(function(res, status) {
          Session.create(res._id, res.username, res.role);
        });
    },
    register: function(userRequest) {
      return $http
        .post('/api/register', userRequest)
        .success(function(res, status) {
          Session.create(res._id, res.username, res.role);
        });
    },
    getLoggedUser: function(callback) {
      var userId = Session.id;
      if (!userId) return null;
      return $http
        .get('/api/user/getById', {params: { userId: userId }})
        .success(function(res, status) {
          callback(null, res, status);
        })
        .error(function(res, status){
          callback(new Error("Cannot get user with id=" + userId), res, status);
        });
    },
    isAuthenticated: function () {
      return !!Session.username;
    },
    isAuthorized: function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      if (authorizedRoles.indexOf(USER_ROLES.all) !== -1)
        return true; // available for all users

      return (!!Session.username && authorizedRoles.indexOf(Session.userRole) !== -1);
    }
  };
});