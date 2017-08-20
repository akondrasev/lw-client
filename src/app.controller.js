function Controller(navigationService, $transitions, $urlRouter) {
    "ngInject";

    let preloadModule = $urlRouter.location.split("/")[1];
    if (preloadModule && preloadModule !== "") navigationService.navigateModule(preloadModule);

    this.openedTabs = [];
    this.leftMenu = [];

    this.isLoading = navigationService.isLoading;

    navigationService.getAvailableModules().then((_modules) => {
        this.leftMenu = _modules;
    });

    this.$onInit = () => {

    };

    $transitions.onSuccess("*", (transition) => {
        let moduleKey = transition.to().name;
        this.addTab(moduleKey);
    });

    this.addTab = (key) => {
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