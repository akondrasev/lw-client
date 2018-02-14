import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import testComponent from './test-directive/test-directive';

let homeModule = angular.module("home", [
    testComponent,
    uiRouter
]).config(($stateProvider) => {
    "ngInject";

    $stateProvider
        .state('home', {
            url: '/home',
            component: 'home',
            resolve: {
                items: function ($timeout) {
                    "ngInject";
                    return $timeout(0);
                }
            }
        });
});

homeModule.directive("home", homeComponent);

export default homeModule.name;
