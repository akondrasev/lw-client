import angular from 'angular';
import component from './window.component';

let windowModule = angular.module('window', []);

windowModule.component('window', component);

export default windowModule.name;