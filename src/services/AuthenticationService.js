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

        localStorage.setItem("user", JSON.stringify(user));

        $timeout(1000).then(() => {
            user = {
                email: email
            };
            defer.resolve();
        });
        return defer.promise;
    };

    this.logout = () => {
        let defer = $q.defer();

        navigationService.setLoading(true);

        localStorage.removeItem("user");

        $timeout(1000).then(() => {
            user = null;
            defer.resolve();
        });

        return defer.promise;
    };
};

const module = angular
    .module("authenticationService", [])
    .service('authenticationService', AuthenticationService);

export default module.name;