import angular from 'angular';
import Navbar from './navbar/navbar';
import StatusBar from './status-bar/status-bar';
import TabMenu from './tab-menu/tab-menu';

let commonModule = angular.module('app.core', [
    Navbar,
    StatusBar,
    TabMenu
]).name;

export default commonModule;