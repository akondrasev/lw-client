import angular from 'angular';
import openOrdersComponent from './open-orders.component';

let openOrdersModule = angular.module('app.openOrders', [
]);

openOrdersModule.config(["$stateProvider", ($stateProvider) => {
    $stateProvider
        .state('open-orders', {
            url: '/open-orders',
            component: 'openOrders',
            resolve: {
                items: ["$timeout", function ($timeout) {
                    return $timeout(0);
                }]
            }
        });
}]);

openOrdersModule.component("openOrders", openOrdersComponent);

export default openOrdersModule.name;
