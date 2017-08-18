function Controller(navigationService, $transitions) {
    "ngInject";

    this.openedTabs = [];
    this.leftMenu = [];

    navigationService.getAvailableModules().then((_modules) => {
        this.leftMenu = _modules;
    });

    this.$onInit = () => {
    };

    $transitions.onSuccess("*", (transition) => {
        let moduleKey = transition.to().name;
        this.openModule(moduleKey);
    });

    this.openModule = (key) => {
        let module = navigationService.getModuleByKey(key);

        if (module) {
            this.openedTabs.indexOf(module) === -1 && this.openedTabs.push(module);
        }
    }
}

export default Controller;