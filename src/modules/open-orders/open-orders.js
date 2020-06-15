import angular from 'angular';
import openOrdersComponent from './open-orders.component';

let openOrdersModule = angular.module('app.openOrders', [
]);

openOrdersModule.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
        .state('open-orders', {
            url: '/open-orders',
            component: 'openOrders',
            resolve: {
                items: function ($timeout) {
                    "ngInject";
                    return $timeout(0);
                }
            }
        });
});

openOrdersModule.component("openOrders", openOrdersComponent);

export default openOrdersModule.name;
