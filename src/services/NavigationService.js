import angular from 'angular';

const NavigationService = function ($http, $q, $ocLazyLoad) {
    "ngInject";

    let loading = false;
    this.isLoading = () => loading;
    this.setLoading = (value) => loading = value;

    let components = {
        "my-inventory": () => {
            let defer = $q.defer();
            this.setLoading(true);
            require.ensure([], () => {
                let moduleName = require(`../components/my-inventory/my-inventory`).default;
                $ocLazyLoad.load({name: moduleName});
                defer.resolve(moduleName);
                this.setLoading(false);
            });
            return defer.promise;
        },
        "open-orders": () => {
            let defer = $q.defer();
            this.setLoading(true);
            require.ensure([], () => {
                let moduleName = require(`../components/open-orders/open-orders`).default;
                $ocLazyLoad.load({name: moduleName});
                defer.resolve(moduleName);
                this.setLoading(false);
            });
            return defer.promise;
        }
    };

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
    ];//TODO API call for available menu items

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
    };//TODO API call for available modules from each category

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


    this.loadModule = (key) => {
        return components[key]();
    };
};

const module = angular
    .module("navigationService", [])
    .service('navigationService', NavigationService);

export default module.name;