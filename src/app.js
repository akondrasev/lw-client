import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component';
import Common from './core/core';
import Services from './services/services';
import Components from './modules/modules';
import LazyLoad from 'oclazyload';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


angular.module('app', [
    uiRouter,
    Common,
    Services,
    Components,
    LazyLoad
]).config(($locationProvider, $compileProvider, $urlRouterProvider, $stateProvider) => {
    "ngInject";

    $compileProvider.debugInfoEnabled(false);

    // $urlRouterProvider.otherwise(($injector, $location) => {
    // });

    $stateProvider
        .state('empty', {
            url: '/',
            template: "<div>EMPTY state</div>"
        });

    // console.log($compileProvider);

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    // $locationProvider.html5Mode(true).hashPrefix('!');
}).component('app', AppComponent);