import template from './home.template.html';
import './home.style.scss';


let homeComponent = function () {
  return {
      template,
      scope: {},
      controllerAs: "$ctrl",
      controller: function () {
        this.collection = [];
        this.addItem = function (item) {
          this.collection.push(item);
        };
      },
      link: function (scope) {
        console.log("home scope:", scope);

        scope.primitiveValue = "two-way-primitive";
        scope.oneWayValue = "one-way-primitive";
        scope.objectValue = {
          testProperty: "555",
          number: 5,
          boolean: false
        };

        scope.twoWayObject = {
          property: 555
        };

        scope.changeReference = function () {
            scope.objectValue = { changedFromParent: true };
        };

        scope.changeTwoWayReference = function () {
          scope.twoWayObject = {
            changedFromParent: true
          };
        };

        scope.bindedCallback = function (value1, value2) {
          scope.callbackResult = {
            value1: value1,
            value2: value2
          };
        };
      }
  };
};

export default homeComponent;
