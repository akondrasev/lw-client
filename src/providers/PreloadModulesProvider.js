import angular from 'angular';

function PreloadModulesProvider() {
    'ngInject';
    let modules = [];
    let defer;

    this.preloadModules = (keys) => {
        keys.forEach(function (key) {
            if (key !== "") modules.push(key);
        });

        if (defer && modules.length) {
            defer.resolve(modules);
        }
    };

    function PreloadService($q) {
        this.getPreloadModules = () => {
            defer = $q.defer();
            return defer.promise;
        };
    }

    this.$get = function ($q) {
        "ngInject";
        return new PreloadService($q);
    };
}

const module = angular
    .module("preloadModules", [])
    .provider('preloadModules', PreloadModulesProvider);

export default module.name;