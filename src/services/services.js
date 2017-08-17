import angular from 'angular';
import NavigationService from './NavigationService';
import ClickAnywhereButHereService from './ClickAnywhereButHereService';

let componentModule = angular.module('app.services', [
    NavigationService,
    ClickAnywhereButHereService
]).name;

export default componentModule;