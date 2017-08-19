function NavbarController($scope, $state, clickAnywhereButHereService, navigationService) {
    "ngInject";

    this.selectItem = (item) => {
        if (this.selectedItem === item) {
            this.selectedItem = null;
            this.menu = null;
            return;
        }

        navigationService.getDetailedMenuByKey(item.Key).then((menu) => {
            this.menu = menu;
            this.selectedItem = item;
        });
    };

    this.navigateModule = (key) => {
        navigationService.loadModule(key).then(() => {
            $state.go(key);
        });
    };

    this.clearSelection = () => {
        this.selectedItem = null;
        this.menu = null;
    };

    clickAnywhereButHereService($scope, this.clearSelection);
}

export default NavbarController;