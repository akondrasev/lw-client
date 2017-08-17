import angular from 'angular';
import tabMenuComponent from './tab-menu.component';

let tabMenuModule = angular.module('tabMenu', []);

tabMenuModule.component("tabMenu", tabMenuComponent);

export default tabMenuModule.name;