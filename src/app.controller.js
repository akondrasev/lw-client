function Controller(navigationService, $transitions, $urlRouter, authenticationService) {
    "ngInject";

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
        authenticationService.logout().then(() => {//TODO immediately hide currently opened module (it is still shown when navigating to login)
            navigationService.navigateModule("login");
        });
    };

    $transitions.onSuccess("*", (transition) => {
        let moduleKey = transition.to().name;
        addTab(moduleKey);
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

export default Controller;