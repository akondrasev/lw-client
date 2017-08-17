import angular from 'angular';

const NavigationService = function ($http, $q) {
    "ngInject";

    let modules = [
        {
            Key: "inventory",
            Text: "Inventory",
            Icon: "glyphicon glyphicon-th-large"
        },
        {
            Key: "orders-book",
            Text: "Orders Book",
            Icon: "glyphicon glyphicon-book"
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

    this.getDetailedMenuByKey = (key) => {
        let defer = $q.defer();

        detailedMenus[key] && defer.resolve(detailedMenus[key]);

        return defer.promise;
    };

    this.getAvailableModules = () => {
        let defer = $q.defer();

        defer.resolve(modules);

        return defer.promise;
    }
};

const module = angular
    .module("navigationService", [])
    .service('navigationService', NavigationService);

export default module.name;