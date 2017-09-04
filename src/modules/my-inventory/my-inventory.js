import angular from 'angular';
import uiRouter from 'angular-ui-router';
import myInventoryComponent from './my-inventory.component';

let myInventoryModule = angular.module('app.myInventory', [
    uiRouter
]);

myInventoryModule.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
        .state('app.my-inventory', {
            url: '/my-inventory',
            component: 'myInventory',
            resolve: {
                items: function ($timeout) {
                    "ngInject";
                    return $timeout(1000);
                }
            }
        });
});

myInventoryModule.component("myInventory", myInventoryComponent);

export default myInventoryModule.name;