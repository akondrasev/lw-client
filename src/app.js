import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component';
import Common from './common/common';
import Services from './services/services';
import Components from './components/components'

import 'bootstrap';
import 'open-iconic/font/css/open-iconic-bootstrap.css'

angular.module('app', [
    uiRouter,
    Common,
    Services,
    Components
]).config(($locationProvider, $compileProvider, $urlRouterProvider, $stateProvider) => {
    "ngInject";

    $compileProvider.debugInfoEnabled(false);
    // console.log($compileProvider);

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    // $locationProvider.html5Mode(true).hashPrefix('!');
}).component('app', AppComponent);