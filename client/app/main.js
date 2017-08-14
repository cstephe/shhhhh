angular.module('thisApp', [
    'app.messageViewer',
    'app.login',
    'ui.router',
    'ngMaterial',
    'app.mainPage'
])
.config(["$urlRouterProvider",
    function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
    }
]);