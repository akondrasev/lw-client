import angular from 'angular';
import myInventoryComponent from './my-inventory/my-inventory';
import openOrdersComponent from './open-orders/open-orders';

let componentsModule = angular.module('app.components', [
    myInventoryComponent,
    openOrdersComponent
]).name;

export default componentsModule;