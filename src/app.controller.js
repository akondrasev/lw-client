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
        this.addTab(moduleKey);
    });

    this.addTab = (key) => {
        let module = navigationService.getModuleByKey(key);

        if (module) {
            this.openedTabs.indexOf(module) === -1 && this.openedTabs.push(module);
        }
    };

    this.closeTab = (tab) => {
        console.log(tab);
        this.openedTabs = this.openedTabs.filter(function (item) {
            return item !== tab;
        });
    }
}

export default Controller;