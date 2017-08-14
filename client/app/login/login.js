(function() {
    var LOCATION = 'app/login/';
    angular.module('app.login', [
        'app.messageViewer.services',
        'ngMaterial',
        'ui.router'
    ])
    .config(["$stateProvider", function($stateProvider) {
        $stateProvider.state('login', {
            url: "/login",
            controller: 'loginController',
            templateUrl: LOCATION + 'login.html'
        });
    }])
    .controller('loginController', ['$scope', '$state',
        function($scope, $state) {
            $scope.login = function(){
                $state.go('app')
            }
        }
    ]);
})();
