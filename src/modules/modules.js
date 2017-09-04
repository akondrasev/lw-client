import angular from 'angular';
import uiRouter from 'angular-ui-router';

import modulesComponent from  './modules.component';

let componentsModule = angular.module('app.components', [
    uiRouter
]);

componentsModule.config(($stateProvider) => {
    "ngInject";

    $stateProvider
        .state('app', {
            url: '/app',
            component: "modules",
            abstract: true
        });

    $stateProvider
        .state('app.empty', {
            url: '/empty',
            template: "<div></div>"
        });
});

componentsModule.component("modules", modulesComponent);

export default componentsModule.name;