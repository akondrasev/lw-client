import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module("home", [
    uiRouter
]).config(($stateProvider) => {
    "ngInject";

    $stateProvider
        .state('app.home', {
            url: '/home',
            component: 'home',
            resolve: {
                items: function ($timeout) {
                    "ngInject";
                    return $timeout(1000);
                }
            }
        });
});

homeModule.component("home", homeComponent);

export default homeModule.name;