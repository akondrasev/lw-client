import angular from 'angular';
import uiRouter from 'angular-ui-router';
import openOrdersComponent from './open-orders.component';

let openOrdersModule = angular.module('app.openOrders', [
    uiRouter
]);

openOrdersModule.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
        .state('open-orders', {
            url: '/open-orders',
            component: 'openOrders'
        });
});

openOrdersModule.component("openOrders", openOrdersComponent);

export default openOrdersModule.name;