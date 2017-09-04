let LoginController = function (authenticationService, navigationService, $state) {
    "ngInject";

    this.login = (email, password) => {
        console.log(email, password);
        authenticationService.login(email, password).then(() => {
            let tab = navigationService.getInitialOpenedTabs()[0];

            if (tab) {
                navigationService.loadModule(tab.Key).then(() => {
                    $state.go(`app.${tab.Key}`);
                });
            } else {
                navigationService.loadModule("home").then(() => {
                    $state.go("app.home");
                });
            }
        });
    };
};

export default LoginController;