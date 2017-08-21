import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginBoxComponent from './login.component';

let loginModule = angular.module('login', [
    uiRouter
]).config(($stateProvider) => {
    "ngInject";

    $stateProvider
        .state('login', {
            url: '/login',
            component: 'login'
        });
});

loginModule.component("login", loginBoxComponent);

export default loginModule.name;