import angular from 'angular';
import loginBoxComponent from './login-box.component';

let navbarModule = angular.module('loginBox', []);

navbarModule.component("loginBox", loginBoxComponent);

export default navbarModule.name;