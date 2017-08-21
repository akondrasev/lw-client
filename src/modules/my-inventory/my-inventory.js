import angular from 'angular';
import uiRouter from 'angular-ui-router';
import myInventoryComponent from './my-inventory.component';

let myInventoryModule = angular.module('app.myInventory', [
    uiRouter
]);

myInventoryModule.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
        .state('my-inventory', {
            url: '/my-inventory',
            component: 'myInventory'
        });
});

myInventoryModule.component("myInventory", myInventoryComponent);

export default myInventoryModule.name;