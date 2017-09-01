import angular from 'angular';
import directive from './window.directive';

let windowModule = angular.module('window', []);

windowModule.directive('window', directive);

export default windowModule.name;