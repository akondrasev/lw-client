import angular from 'angular';
import homeComponent from './home.component';
import testComponent from './test-directive/test-directive';

let homeModule = angular.module("home", [
    testComponent,
    homeComponent
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

export default homeModule.name;
