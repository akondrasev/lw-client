import angular from 'angular';
import myInventoryComponent from './my-inventory/my-inventory';

let componentsModule = angular.module('app.components', [
    myInventoryComponent
]).name;

export default componentsModule;