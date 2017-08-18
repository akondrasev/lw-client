import angular from 'angular';

const NavigationService = function ($http, $q, $ocLazyLoad) {
    "ngInject";

    let openedModules = [];

    let modules = [
        {
            Key: "inventory",
            Text: "Inventory",
            Icon: "oi oi-cart"
        },
        {
            Key: "orders-book",
            Text: "Orders Book",
            Icon: "oi oi-dollar"
        }
    ];

    let detailedMenus = {
        "inventory": [{
            Title: "Inventory",
            Items: [{
                Key: "my-inventory",
                Text: "My Inventory"
            }]
        }],
        "orders-book": [{
            Title: "Order Book",
            Items: [{
                Key: "open-orders",
                Text: "Open Orders"
            }]
        }]
    };

    this.getModuleByKey = (key) => {
        let result;

        for (let _key in detailedMenus) {
            let array = detailedMenus[_key];
            for (let i = 0; i < array.length; i++) {
                let submenu = array[i].Items;

                for (let j = 0; j < submenu.length; j++) {
                    let item = submenu[j];

                    if (item.Key === key) {
                        result = item;
                        break;
                    }
                }

                if (result) break;
            }

            if (result) break;
        }

        return result;
    };

    this.getDetailedMenuByKey = (key) => {
        let defer = $q.defer();

        detailedMenus[key] && defer.resolve(detailedMenus[key]);

        return defer.promise;
    };

    this.getAvailableModules = () => {
        let defer = $q.defer();

        defer.resolve(modules);

        return defer.promise;
    };

    this.openModule = (module) => {
        openedModules.indexOf(module) === -1 && openedModules.push(module);
        return openedModules;
    };

    this.closeModule = (module) => {
        return openedModules = openedModules.filter(function (item) {
            return item !== module;
        });
    };

    this.getOpenedModules = () => {
        return openedModules;
    };


    this.loadModule = () => {
        let defer = $q.defer();
        require.ensure([], () => {
            let moduleName = require('../components/my-inventory/my-inventory').default;
            $ocLazyLoad.load({name: moduleName});
            defer.resolve(moduleName);
        });
        return defer.promise;
    };
};

const module = angular
    .module("navigationService", [])
    .service('navigationService', NavigationService);

export default module.name;