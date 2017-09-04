class ModulesController {
    constructor($transitions, navigationService, authenticationService, $state, $urlRouter) {
        "ngInject";
        $transitions.onFinish("app.*", (transition) => {
            console.log("finish", transition);
            let moduleKey = transition.to().name;
            console.log(moduleKey);

            if (moduleKey === "app.empty") {
                return;
            }

            navigationService.setLoading(false);
        });

        $transitions.onStart("app.*", (transition) => {
            console.log("start", transition);

            let moduleKey = transition.to().name;

            if (moduleKey === "app.empty") {
                return;
            }

            addTab(moduleKey);

            navigationService.setLoading(true);
        });

        let preloadModule = $urlRouter.location.split("/")[2];

        if (preloadModule && preloadModule !== "empty") {
            navigationService.loadModule(preloadModule).then(() => {
                $state.go(`app.${preloadModule}`);
            });
        } else {
            navigationService.loadModule("home").then(() => {
                $state.go("app.home");
            });
        }

        this.openedTabs = navigationService.getInitialOpenedTabs();
        this.navbarItems = [];

        this.isLoading = navigationService.isLoading;
        this.isAuthorized = authenticationService.isAuthorized;

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
        };

        this.switchTab = (tab) => {
            console.log("tab: ", tab);
            $state.go(`app.empty`);

            navigationService.setLoading(true);

            navigationService.loadModule(tab.Key).then(() => {
                $state.go(`app.${tab.Key}`);
            });
        };

        let addTab = function (key) {
            let availableModule = navigationService.getModuleByKey(key);

            if (availableModule) {
                this.openedTabs = navigationService.openModule(availableModule);
            }

        }.bind(this);
    }
}

export default ModulesController;