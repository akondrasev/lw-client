function Controller(navigationService, $transitions, preloadModules, $state) {
    "ngInject";

    preloadModules.getPreloadModules().then((keys) => {
        navigationService.navigateModule(keys[0]);
    });

    this.openedTabs = [];
    this.leftMenu = [];

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
        console.log(`open tab ${key}`);
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