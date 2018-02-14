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
    scope: { // new scope created, isolated scope
      primitiveValue: "=",
      oneWayValue: "<",
      objectValue: "<",
      twoWayObject: "=",
      callback: "&"
    },
    // scope: false, // no scope created, used parent - default
    //scope: true, // new scope created, inherited from parent
    link: function (scope) {
      console.log(scope);
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
    }
  };
}

export default directive;
