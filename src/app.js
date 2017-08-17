import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component';
import Common from './common/common';
import Services from './services/services';

import 'bootstrap-webpack';

angular.module('app', [
    uiRouter,
    Common,
    Services
]).config(($locationProvider, $compileProvider) => {
    "ngInject";

    $compileProvider.debugInfoEnabled(false);
    // console.log($compileProvider);

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    // $locationProvider.html5Mode(true).hashPrefix('!');
}).component('app', AppComponent);