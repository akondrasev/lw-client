class ModulesController {
    constructor($transitions, navigationService, authenticationService, $state, $urlRouter) {
        "ngInject";
        $transitions.onFinish("*", (transition) => {
            console.log("finish", transition);
            navigationService.setLoading(false);
        });

        $transitions.onStart("*", (transition) => {
            console.log("start", transition);

            let moduleKey = transition.to().name;
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
        this.openTab = (key) => {
            addTab(key);
            navigationService.loadModule(key).then(() => {
                $state.go(`app/${key}`);
            });
        };

        //tabmenu callback
        this.closeTab = (module) => {
            this.openedTabs = navigationService.closeModule(module);
        };

        this.switchTab = (key) => {
            console.log("key: ", key);
            navigationService.loadModule(key).then(() => {
                $state.go(`app.${key}`);
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