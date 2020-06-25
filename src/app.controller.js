function Controller(navigationService, $transitions, $urlRouter, authenticationService, $state) {
    if (!authenticationService.isAuthorized()) {
        navigationService.navigateModule("login");
    } else {
        let preloadModule = $urlRouter.location.split("/")[1];
        if (preloadModule) {
            navigationService.navigateModule(preloadModule);
        } else {
            navigationService.navigateModule("home");
        }
    }

    this.openedTabs = [];
    this.leftMenu = [];

    this.isLoading = navigationService.isLoading;

    navigationService.getAvailableModules().then((_modules) => {
        this.leftMenu = _modules;
    });

    this.$onInit = () => {

    };

    this.isAuthorized = authenticationService.isAuthorized;
    this.logout = () => {
        $state.go("/");
        authenticationService.logout().then(() => {//TODO immediately hide currently opened module (it is still shown when navigating to login)
            navigationService.navigateModule("login");
        });
    };

    $transitions.onFinish("*", (transition) => {
        navigationService.setLoading(false);
    });

    $transitions.onStart("*", (transition) => {
        let moduleKey = transition.to().name;
        addTab(moduleKey);
        navigationService.setLoading(true);
    });

    let addTab = (key) => {
        let availableModule = navigationService.getModuleByKey(key);

        if (availableModule) {
            this.openedTabs = navigationService.openModule(availableModule);
        }
    };

    this.closeTab = (module) => {
        this.openedTabs = navigationService.closeModule(module);
    }
}

Controller.$inject = [
    "navigationService",
    "$transitions",
    "$urlRouter",
    "authenticationService",
    "$state"
];

export default Controller;