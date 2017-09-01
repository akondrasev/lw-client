import angular from 'angular';

const AuthenticationService = function ($http, $q, $timeout, navigationService) {
    "ngInject";

    let user = JSON.parse(localStorage.getItem("user")) || null;

    this.isAuthorized = () => {
        return user !== null;
    };

    this.login = (email, password) => {
        let defer = $q.defer();

        navigationService.setLoading(true);

        user = {
            email: email
        };

        localStorage.setItem("user", JSON.stringify(user));

        $timeout(1000).then(defer.resolve);
        return defer.promise;
    };

    this.logout = () => {
        let defer = $q.defer();

        navigationService.setLoading(true);

        user = null;

        localStorage.removeItem("user");

        $timeout(1000).then(defer.resolve);

        return defer.promise;
    };
};

const module = angular
    .module("authenticationService", [])
    .service('authenticationService', AuthenticationService);

export default module.name;