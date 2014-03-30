angular.module('Session', []).service('Session', function () {

  this.create = function (sessionId, username, userRole) {
    this.id = sessionId;
    this.username = username;
    this.userRole = userRole;
    // TODO: save to database
  };

  this.destroy = function () {
    this.id = null;
    this.username = null;
    this.userRole = null;
    // TODO: remove from database
  };

  this.toString = function() {
    return "{id: " + this.id + ", username: " + this.username + ", userRole: " + this.userRole + "}";
  };

  return this;
});