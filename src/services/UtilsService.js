import angular from 'angular';

const UtilsService = function ($q, $window) {
    "ngInject";

    this.wait = (timeout) => {
        let defer = $q.defer();

        setTimeout(() => {
            defer.resolve();
        }, timeout);

        return defer.promise;
    };
};

const module = angular
    .module("utilsService", [])
    .service('utilsService', UtilsService);

export default module.name;