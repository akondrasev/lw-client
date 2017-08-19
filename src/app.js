import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component';
import Common from './core/core';
import Services from './services/services';
import Components from './components/components';
import PreloadModulesProvider from './providers/PreloadModulesProvider';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import 'oclazyload';

angular.module('app', [
    uiRouter,
    Common,
    Services,
    Components,
    'oc.lazyLoad',
    PreloadModulesProvider
]).config(($locationProvider, $compileProvider, $urlRouterProvider, $stateProvider, preloadModulesProvider) => {
    "ngInject";

    $compileProvider.debugInfoEnabled(false);

    $urlRouterProvider.otherwise(($injector, $location) => {
        let keys = $location.$location.$$url.split("/");
        preloadModulesProvider.preloadModules(keys);
    });

    $stateProvider
        .state('empty', {
            url: '/',
            template: "<div></div>"
        });

    // console.log($compileProvider);

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    // $locationProvider.html5Mode(true).hashPrefix('!');
}).component('app', AppComponent);