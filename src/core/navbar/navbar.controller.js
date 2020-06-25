function NavbarController($scope, clickAnywhereButHereService, navigationService) {
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

    this.navigateModule = navigationService.navigateModule;

    this.clearSelection = () => {
        this.selectedItem = null;
        this.menu = null;
    };

    clickAnywhereButHereService($scope, this.clearSelection);
}

NavbarController.$inject = ["$scope", "clickAnywhereButHereService", "navigationService"];

export default NavbarController;