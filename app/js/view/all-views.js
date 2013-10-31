define(function (require, exports, module) {

    var slides = require('view/slides');

    function registerController(app, controller) {
        app.controller(controller.name, ['$scope', '$location', '$document', controller.controller]);
    }

    function configViewRouting(app) {
        app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/slides', {templateUrl: 'js/view/slides.html', controller: slides.name})
                .otherwise({redirectTo: '/slides'});
        }]);
    }

    exports.init = function () {
        angular.element(document).ready(function () {
            var dashboardApp = angular.module('dashboard', [
                'angular-carousel',
                'angular-gridster',
                '$strap.directives'
            ]);

            configViewRouting(dashboardApp);
            registerController(dashboardApp, slides);
            angular.bootstrap(document, ['dashboard']);
        });
    };

});
