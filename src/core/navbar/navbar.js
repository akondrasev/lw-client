import angular from 'angular';
import navbarComponent from './navbar.component';

let navbarModule = angular.module('navbar', [
]);

navbarModule.component("navbar", navbarComponent);

export default navbarModule.name;