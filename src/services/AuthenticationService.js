import angular from 'angular';

const AuthenticationService = function ($http, $q) {
    "ngInject";

    let user = JSON.parse(localStorage.getItem("user")) || null;

    this.isAuthorized = () => {
        return user !== null;
    };

    this.login = (email, password) => {
        let defer = $q.defer();

        user = {
            email: email
        };

        localStorage.setItem("user", JSON.stringify(user));

        defer.resolve();
        return defer.promise;
    };

    this.logout = () => {
        let defer = $q.defer();

        user = null;

        localStorage.removeItem("user");

        defer.resolve();
        return defer.promise;
    };
};

const module = angular
    .module("authenticationService", [])
    .service('authenticationService', AuthenticationService);

export default module.name;