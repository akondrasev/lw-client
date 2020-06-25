let LoginController = function (authenticationService, navigationService) {
    this.login = (email, password) => {
        authenticationService.login(email, password).then(() => {
            navigationService.navigateModule("home");
        });
    };
};

LoginController.$inject = ["authenticationService", "navigationService"];

export default LoginController;
