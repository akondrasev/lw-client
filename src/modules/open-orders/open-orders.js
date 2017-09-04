import angular from 'angular';
import uiRouter from 'angular-ui-router';
import openOrdersComponent from './open-orders.component';

let openOrdersModule = angular.module('app.openOrders', [
    uiRouter
]);

openOrdersModule.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
        .state('app.open-orders', {
            url: '/open-orders',
            component: 'openOrders',
            resolve: {
                items: function ($timeout) {
                    "ngInject";
                    return $timeout(1000);
                }
            }
        });
});

openOrdersModule.component("openOrders", openOrdersComponent);

export default openOrdersModule.name;