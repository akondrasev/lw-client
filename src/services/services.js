import angular from 'angular';
import NavigationService from './NavigationService';
import ClickAnywhereButHereService from './ClickAnywhereButHereService';
import InventoryService from './InventoryService';
import AuthenticationService from './AuthenticationService';

let componentModule = angular.module('app.services', [
    NavigationService,
    ClickAnywhereButHereService,
    InventoryService,
    AuthenticationService
]).name;

export default componentModule;