import angular from 'angular';
import myInventoryComponent from './my-inventory.component';

let myInventoryModule = angular.module('app.myInventory', [
]);

myInventoryModule.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
        .state('my-inventory', {
            url: '/my-inventory',
            component: 'myInventory',
            resolve: {
                items: function ($timeout) {
                    "ngInject";
                    return $timeout(0);
                }
            }
        });
});

myInventoryModule.component("myInventory", myInventoryComponent);

export default myInventoryModule.name;
