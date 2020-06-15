import angular from 'angular';
import loginBoxComponent from './login.component';

let loginModule = angular.module('login', [
]).config(($stateProvider) => {
    "ngInject";

    $stateProvider
        .state('login', {
            url: '/login',
            component: 'login',
            resolve: {
                items: function ($timeout) {
                    "ngInject";
                    return $timeout(0);
                }
            }
        });
});

loginModule.component("login", loginBoxComponent);

export default loginModule.name;
