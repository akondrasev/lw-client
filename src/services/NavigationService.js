import angular from 'angular';

const NavigationService = function ($http, $q, $ocLazyLoad, $state, $timeout) {
    "ngInject";

    let loading = false;
    let defaultTimeout = 0;
    this.isLoading = () => loading;
    this.setLoading = (value) => loading = value;

    let components = {
        "login": () => {
            let defer = $q.defer();
            this.setLoading(true);
            require.ensure([], () => {
                let moduleName = require(`../modules/login/login`).default;
                $ocLazyLoad.load({name: moduleName});

                $timeout(defaultTimeout).then(() => {
                    defer.resolve(moduleName);
                    this.setLoading(false);
                });
            });
            return defer.promise;
        },
        "my-inventory": () => {
            let defer = $q.defer();
            this.setLoading(true);
            require.ensure([], () => {
                let moduleName = require(`../modules/my-inventory/my-inventory`).default;
                $ocLazyLoad.load({name: moduleName});
                $timeout(defaultTimeout).then(() => {
                    defer.resolve(moduleName);
                    this.setLoading(false);
                });

            });
            return defer.promise;
        },
        "open-orders": () => {
            let defer = $q.defer();
            this.setLoading(true);
            require.ensure([], () => {
                let moduleName = require(`../modules/open-orders/open-orders`).default;
                $ocLazyLoad.load({name: moduleName});
                $timeout(defaultTimeout).then(() => {
                    defer.resolve(moduleName);
                    this.setLoading(false);
                });

            });
            return defer.promise;
        },
        "home": () => {
            let defer = $q.defer();
            this.setLoading(true);
            require.ensure([], () => {
                let moduleName = require(`../modules/home/home`).default;
                $ocLazyLoad.load({name: moduleName});
                $timeout(defaultTimeout).then(() => {
                    defer.resolve(moduleName);
                    this.setLoading(false);
                });

            });
            return defer.promise;
        },
    };

    let openedModules = [];

    let modules = [
        {
            Key: "inventory",
            Text: "Inventory",
            Icon: "fa fa-cubes"
        },
        {
            Key: "orders-book",
            Text: "Orders Book",
            Icon: "fa fa-eur"
        }
    ];//TODO API call for available menu items

    let homeModule = {
        Key: "home",
        Text: "Home"
    };

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
        if (key === "home") {
            return homeModule;
        }

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

    this.navigateModule = (key) => {
        this.loadModule(key).then(() => {
            $state.go(key);
        });
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
