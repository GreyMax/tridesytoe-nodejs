angular.module('appControllers')

.controller('ApplicationController', function ($scope, $state, USER_ROLES, AUTH_EVENTS, AuthService)
{
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
  $scope.isActiveTab = function(viewLocation) {
    return $state.is(viewLocation);
  };

  $scope.$on(AUTH_EVENTS.loginSuccess, function() {
    AuthService.getLoggedUser(function(err, res, status) {
      if (err) throw err;
      $scope.currentUser = res;
    });
  });
  $scope.$on(AUTH_EVENTS.loginFailed, function() {
    console.log("========== login failed");
  });
  $scope.$on(AUTH_EVENTS.registerSuccess, function() {
    console.log("========== register success");
  });
  $scope.$on(AUTH_EVENTS.registerFailed, function() {
    console.log("========== register failed");
  });
});