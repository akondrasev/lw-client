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
            component: "modules"
        });

    $stateProvider
        .state('modules.empty', {
            url: '/',
            template: "<div>EMPTY state</div>"
        });
});

componentsModule.component("modules", modulesComponent);

export default componentsModule.name;