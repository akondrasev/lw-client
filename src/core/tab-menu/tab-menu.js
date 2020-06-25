import angular from 'angular';
import tabMenuComponent from './tab-menu.component';

let tabMenuModule = angular.module('tabMenu', []);

tabMenuModule.run(["$state", "$q", "$transitions", "navigationService", ($state, $q, $transitions, navigationService) => {
    $transitions.onStart({
        to: "empty"
    }, () => {
        let openedModules = navigationService.getOpenedModules();
        if (openedModules.length === 0) {
            return true;
        }

        return $state.target(openedModules[openedModules.length - 1].Key);
    });
}]);

tabMenuModule.component("tabMenu", tabMenuComponent);

export default tabMenuModule.name;