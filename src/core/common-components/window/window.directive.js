import './window.style.scss';
import template from './window.template.html';

let windowDirective = function () {
    return {
        template,
        transclude: true,
        restrict: "A",
        scope: true,
        controllerAs: "$ctrl",
        controller: ["$element", function ($element) {
            $element.addClass("window");

            //TODO also remove header and footer if they are empty
        }]
    };
};

export default windowDirective;