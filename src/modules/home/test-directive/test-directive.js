import angular from 'angular';
import component from './test-directive.component';

let module = angular.module("test-module", []);

module.directive("testDirective", component);

export default module.name;
