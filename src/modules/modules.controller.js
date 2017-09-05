class ModulesController {
    constructor($transitions, navigationService, authenticationService, $state, $urlRouter) {
        "ngInject";

        this.openedTabs = navigationService.getInitialOpenedTabs();
        this.navbarItems = [];

        this.isLoading = navigationService.isLoading;
        this.isAuthorized = authenticationService.isAuthorized;

        $transitions.onFinish("app.*", (transition) => {
            console.log("finish", transition);
            let moduleKey = transition.to().name;
            console.log(moduleKey);

            if (moduleKey === "app.empty") {
                return;
            }

            moduleKey = moduleKey.split(".")[1];
            this.openedTabs.map((tab) => {
                tab.IsActive = tab.Key === moduleKey;
            });

            navigationService.setLoading(false);
        });

        $transitions.onStart("app.*", (transition) => {
            console.log("start", transition);

            let moduleKey = transition.to().name;

            if (moduleKey === "app.empty") {
                return;
            }

            addTab(moduleKey.split(".")[1]);

            navigationService.setLoading(true);
        });

        let preloadModule = $urlRouter.location.split("/")[2];

        if (preloadModule && preloadModule !== "empty") {
            navigationService.loadModule(preloadModule).then(() => {
                $state.go(`app.${preloadModule}`);
            });
        } else {
            let firstTab = this.openedTabs[0];
            if (firstTab) {
                navigationService.loadModule(firstTab.Key).then(() => {
                    $state.go(`app.${firstTab.Key}`);
                });
            }

        }

        navigationService.getAvailableModules().then((_navbarItems) => {
            this.navbarItems = _navbarItems;
        });

        this.logout = () => {
            authenticationService.logout().then(() => {
                return navigationService.loadModule("login");
            }).then(()  => {
                $state.go("login");
            });
        };

        //navbar callback
        this.openModule = (key) => {
            console.log(key);
            addTab(key);
            navigationService.loadModule(key).then(() => {
                $state.go(`app.${key}`);
            });
        };

        //tabmenu callback
        this.closeTab = (tab) => {
            this.openedTabs = navigationService.closeModule(tab);

            if (this.openedTabs[0]) {
                this.switchTab(this.openedTabs[0]);
            } else {
                $state.go("app.empty");
            }
        };

        //tabmenu callback
        this.switchTab = (tab) => {
            if (tab.IsActive) return;

            console.log("switchTab: ", tab);
            navigationService.setLoading(true);

            navigationService.loadModule(tab.Key).then(() => {
                return $state.go(`app.${tab.Key}`);
            }).then(() => {
                this.openedTabs.map( item => item.IsActive = false);
                tab.IsActive = true;
                localStorage.setItem("lastActiveTab", tab.Key);
            });
        };

        let addTab = function (key) {
            let availableModule = navigationService.getModuleByKey(key);

            if (availableModule) {
                this.openedTabs = navigationService.openModule(availableModule);
            }

        }.bind(this);

        this.refresh = () => {
            console.log("refresh");
            localStorage.clear();
        };
    }
}

export default ModulesController;