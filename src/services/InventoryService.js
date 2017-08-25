import angular from 'angular';

const InventoryService = function ($http, $q) {
    "ngInject";

    const url = "http://localhost:44303/api/Inventory/GetInventoryItems";
    const configs = {
        headers: {
            Authorization: "a32e0b3c-f096-40b1-94a2-86eaf4460b4a"
        }
    };

    /**
     * {
            view: view,
            stockLocationIds: stockLocationIds,
            startIndex: startIndex,
            itemsCount: itemsCount,
            preloadChilds: preloadChilds
        }
     * @param startIndex
     */
    this.getItems = (startIndex) => {
        return $http.get(`${url}/?startIndex=${startIndex}&itemsCount=10&view=1`, configs);//TODO fix
    };

};

const module = angular
    .module("inventoryService", [])
    .service('inventoryService', InventoryService);

export default module.name;