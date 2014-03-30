var appConstants = angular.module('appConstants', []);

appConstants.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  registerSuccess: 'auth-register-success',
  registerFailed: 'auth-register-failed',
  logoutSuccess: 'auth-logout-success',
  logoutFailed: 'auth-logout-failed',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

appConstants.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});