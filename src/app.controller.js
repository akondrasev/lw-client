function Controller(navigationService, $transitions, $urlRouter, authenticationService, $state) {
    "ngInject";

    if (!authenticationService.isAuthorized()) {
        navigationService.loadModule("login").then(() => {
            $state.go("login");
        });
    } else {
        $state.go("app.empty");
    }
}

export default Controller;