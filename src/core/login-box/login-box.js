import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginBoxComponent from './login-box.component';

let navbarModule = angular.module('loginBox', [
    uiRouter
]);

navbarModule.component("loginBox", loginBoxComponent);

export default navbarModule.name;