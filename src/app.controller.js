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
        let module = this.leftMenu.find(function (item) {
            return item.Key === key;
        });

        this.openedTabs.indexOf(module) === -1 && this.openedTabs.push(module);
    }
}

export default Controller;