import angular from 'angular';
import statusBarComponent from './status-bar.component';

let statusBarModule = angular.module('statusBar', []);

statusBarModule.component("statusBar", statusBarComponent);

export default statusBarModule.name;