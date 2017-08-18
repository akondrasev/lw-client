function Controller(navigationService) {
    "ngInject";

    this.openedTabs = [];
    this.leftMenu = [];

    navigationService.getAvailableModules().then((_modules) => {
        this.leftMenu = _modules;
    });

    this.$onInit = () => {
    };

    this.openModule = (key) => {
        let module = navigationService.getModuleByKey(key);

        console.log(module);
        
        if (module) {
            this.openedTabs.indexOf(module) === -1 && this.openedTabs.push(module);
        }
    }
}

export default Controller;