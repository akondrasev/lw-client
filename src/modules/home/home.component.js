import template from './home.template.html';
import './home.style.scss';

class HomeComponent {
    constructor() {
        this.collection = [];

        this.objectValue = {
            testProperty: "555",
            number: 5,
            boolean: false
        };

        this.twoWayObject = {
            property: 555
        };

        this.primitiveValue = "two-way-primitive";
        this.oneWayValue = "one-way-primitive";
    }

    addItem(item) {
        this.collection.push(item);
    }

    changeReference () {
        this.objectValue = { changedFromParent: true };
    }

    changeTwoWayReference () {
        this.twoWayObject = {
            changedFromParent: true
        };
    }

    bindedCallback (value1, value2) {
        this.callbackResult = {
            value1: value1,
            value2: value2
        };
    }

    changeTwoWayProperty () {
        this.twoWayObject.addedProperty = "prop value";
    }
}


let homeComponent = {
    template,
    controller: HomeComponent
};

const ngModule = angular
    .module("homeComponent", [])
    .component("home", homeComponent);

export default ngModule.name;
