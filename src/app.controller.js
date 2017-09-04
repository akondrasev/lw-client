function Controller(navigationService, $transitions, $urlRouter, authenticationService, $state) {
    "ngInject";

    // $transitions.onFinish("*", (transition) => {
    //     console.log("finish", transition);
    //     navigationService.setLoading(false);
    // });
    //
    // $transitions.onStart("*", (transition) => {
    //     console.log("start", transition);
    //
    //     let moduleKey = transition.to().name;
    //     addTab(moduleKey);
    //
    //     navigationService.setLoading(true);
    // });

    if (!authenticationService.isAuthorized()) {
        navigationService.loadModule("login").then(() => {
            $state.go("login");
        });
    } else {
        let preloadModule = $urlRouter.location.split("/")[2];
        if (preloadModule) {
            navigationService.loadModule(preloadModule).then(() => {
                $state.go(`app.${preloadModule}`);
            });
        } else {
            navigationService.loadModule("home").then(() => {
                $state.go("app.home");
            });
        }
    }


    this.openedTabs = navigationService.getInitialOpenedTabs();
    this.navbarItems = [];

    this.isLoading = navigationService.isLoading;
    this.isAuthorized = authenticationService.isAuthorized;

    navigationService.getAvailableModules().then((_navbarItems) => {
        this.navbarItems = _navbarItems;
    });

    this.logout = () => {

        authenticationService.logout().then(() => {//TODO immediately hide currently opened module (it is still shown when navigating to login)
            // return navigationService.loadModule("login");
        }).then(()  => {
            // $state.go("login");
        });
    };

    this.openedTabs.forEach((module) => {
       navigationService.loadModule(module.Key);
    });


    //navbar callback
    this.openTab = (key) => {
        addTab(key);
        navigationService.loadModule(key).then(() => {
            $state.go(key);
        });
    };

    //tabmenu callback
    this.closeTab = (module) => {
        this.openedTabs = navigationService.closeModule(module);
    };

    let addTab = function (key) {
        let availableModule = navigationService.getModuleByKey(key);

        if (availableModule) {
            this.openedTabs = navigationService.openModule(availableModule);
        }
    }.bind(this);

}

export default Controller;