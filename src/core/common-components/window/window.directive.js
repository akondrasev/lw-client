import './window.style.scss';
import template from './window.template.html';

let windowDirective = function () {
    return {
        template,
        transclude: true,
        restrict: "A",
        scope: true,
        controllerAs: "$ctrl",
        controller: function ($element) {
            "ngInject";
            $element.addClass("window");

            //TODO also remove header and footer if they are empty
        }
    };
};

export default windowDirective;