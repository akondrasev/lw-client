let LoginController = function (authenticationService, navigationService) {
    "ngInject";

    this.login = (email, password) => {
        authenticationService.login(email, password).then(() => {
            navigationService.navigateModule("home");
        });
    };
};

export default LoginController;