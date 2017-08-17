import angular from 'angular';

/**
 * https://stackoverflow.com/questions/12931369/click-everywhere-but-here-event
 *
 * The idea is to subscribe to document click. You need to call .stopPropagation() on your elements.
 *
 * @param $document
 * @returns {Function}
 * @constructor
 */
const ClickAnywhereButHereService = function ($document) {
    "ngInject";

    let tracker = [];

    return function($scope, expr) {
        let i, t, len;
        for(i = 0, len = tracker.length; i < len; i++) {
            t = tracker[i];
            if(t.expr === expr && t.scope === $scope) {
                return t;
            }
        }
        let handler = function() {
            $scope.$apply(expr);
        };

        $document.on('click', handler);

        // IMPORTANT! Tear down this event handler when the scope is destroyed.
        $scope.$on('$destroy', function(){
            $document.off('click', handler);
        });

        t = { scope: $scope, expr: expr };
        tracker.push(t);
        return t;
    };
};

const module = angular
    .module("clickAnywhereButHereService", [])
    .service('clickAnywhereButHereService', ClickAnywhereButHereService);

export default module.name;