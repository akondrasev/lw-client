function TabMenuController() {
    this.activateTab = (tab) => {
        this.openedTabs.forEach((tab) => {
            tab.IsActive = false;
        });

        tab.IsActive = !tab.IsActive;
    }
}

export default TabMenuController;