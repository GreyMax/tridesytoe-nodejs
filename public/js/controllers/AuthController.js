angular.module('appControllers').controller('AuthController', function($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.userRequest = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(
      function () {
        $state.go("home");
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      },
      function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      }
    );
  };
  $scope.register = function (userRequest) {
    AuthService.register(userRequest).then(
      function () {
        $rootScope.$broadcast(AUTH_EVENTS.registerSuccess);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      },
      function () {
        $rootScope.$broadcast(AUTH_EVENTS.registerFailed);
      }
    );
  };
  $scope.logout = function() {
    console.log("logout");
    AuthService.logout().then(
      function() {
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        console.log("logout success");
      },
      function() {
        $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
        console.log("logout success");
      }
    )
  };
});