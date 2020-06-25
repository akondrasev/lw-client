import angular from 'angular';

const UtilsService = function ($q) {
    this.wait = (timeout) => {
        let defer = $q.defer();

        setTimeout(() => {
            defer.resolve();
        }, timeout);

        return defer.promise;
    };
};

UtilsService.$inject = ["$q"];

const module = angular
    .module("utilsService", [])
    .service('utilsService', UtilsService);

export default module.name;