let LoginController = function (authenticationService, navigationService) {
    "ngInject";

    this.login = (email, password) => {
        console.log(email, password);
        authenticationService.login(email, password).then(() => {
            navigationService.navigateModule("home");
        });
    };
};

export default LoginController;