(function(){
    var LOCATION = 'app/app/';
    angular.module('app.mainPage', [
        'ui.router'
    ])
    .config([
        "$stateProvider",
        function($stateProvider) {
            $stateProvider.state('app', {
                url: "/app",
                controller: ['$state', function($state){
                    $state.go('app.messageViewer');
                }],
                templateUrl: LOCATION + 'mainPage.html'
            });
        }
    ]);
})();
