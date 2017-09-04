import angular from 'angular';

const NavigationService = function ($http, $q, $ocLazyLoad, $timeout) {
    "ngInject";

    let loading = false;
    this.isLoading = () => loading;
    this.setLoading = (value) => loading = value;

    let components = {
        "login": () => {
            let defer = $q.defer();
            this.setLoading(true);
            require.ensure([], () => {
                let moduleName = require(`../modules/login/login`).default;
                $ocLazyLoad.load({name: moduleName});

                $timeout(1000).then(() => {
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
                $timeout(1000).then(() => {
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
                $timeout(1000).then(() => {
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
                $timeout(1000).then(() => {
                    defer.resolve(moduleName);
                    this.setLoading(false);
                });

            });
            return defer.promise;
        },
    };

    let openedModules = JSON.parse(localStorage.getItem("tabs")) || [];

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

    this.openModule = (module) => {
        !openedModules.find((_module) => {
            return _module.Key === module.Key
        }) && openedModules.push(module);

        localStorage.setItem("tabs", JSON.stringify(openedModules));
        return openedModules;
    };

    this.closeModule = (module) => {
        openedModules = openedModules.filter(function (item) {
            return item !== module;
        });
        localStorage.setItem("tabs", JSON.stringify(openedModules));
        return openedModules;
    };

    this.getOpenedModules = () => {
        return openedModules;
    };

    this.loadModule = (key) => {
        return components[key]();
    };

    this.getInitialOpenedTabs = () => {
        return openedModules;
    };
};

const module = angular
    .module("navigationService", [])
    .service('navigationService', NavigationService);

export default module.name;