import angular from 'angular';
import Navbar from './navbar/navbar';
import StatusBar from './status-bar/status-bar';
import TabMenu from './tab-menu/tab-menu';
import LoginBox from './login-box/login-box';
import CommonComponents from './common-components/common-components';

let commonModule = angular.module('app.core', [
    Navbar,
    StatusBar,
    TabMenu,
    LoginBox,
    CommonComponents
]).name;

export default commonModule;