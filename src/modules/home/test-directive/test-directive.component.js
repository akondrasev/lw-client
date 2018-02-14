import template from './test-directive.template.html';
//
// let component = {
//     template,
//     bindings: {
//       primitiveValue: "=value"
//     }
// };

let directive = function () {
  return {
    template,
    require: "^^home",
    scope: { // new scope created, isolated scope
      primitiveValue: "=",
      oneWayValue: "<",
      objectValue: "<",
      twoWayObject: "=",
      callback: "&"
    },
    // scope: false, // no scope created, used parent - default
    //scope: true, // new scope created, inherited from parent
    link: function (scope, element, attrs, homeController) {
      console.log("directive scope:", scope);
      console.log("homeController:", homeController);
      scope.changeReference = function () {
        scope.objectValue = {
          changedFromDirective: true
        };
      };

      scope.changeTwoWayReference = function () {
        scope.twoWayObject = {
          changedFromDirective: true
        };
      };

      scope.createItem =  function (item) {
        homeController.addItem(item);
      };
    }
  };
}

export default directive;
