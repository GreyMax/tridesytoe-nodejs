var appRoutes = angular.module('appRoutes', ['ui.router', 'appConstants', 'appServices']);

appRoutes.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'AuthController',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
    .state('logout', {
      url: '/logout',
      controller: function($state) {
        $state.go('home'); // TODO: logout
      },
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
    .state('chat', {
      url: '/chat',
      templateUrl: 'views/chat.html',
      data: {
        authorizedRoles: [USER_ROLES.editor, USER_ROLES.admin]
      }
    })
    .state('forum', {
      url: '/forum',
      templateUrl: 'views/forum.html',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
    .state('library', {
      url: '/library',
      templateUrl: 'views/library.html',
      data: {
        authorizedRoles: [USER_ROLES.all]
      }
    })
  ;

});

appRoutes.run(function ($rootScope, AUTH_EVENTS, AuthService) {

  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!AuthService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }

  });
});