var LOCATION = 'app/messageLog/';
angular.module('app.messageLog', [
    'ngMaterial',
    'ui.grid',
    'ui.router'
])
.config(["$stateProvider", function($stateProvider) {
    $stateProvider.state('messageLog', {
        url:"/mLog",
        controller: 'mLogController',
        templateUrl: LOCATION + 'mLog.html'
    })
}])
.controller('mLogController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    var getTrapData = function() {
        $http({
            method: 'GET',
            url: 'api/traps'
        })
        .then(function(res) {
            $scope.events = res.data;
        });
    };
    getTrapData();
    $interval(getTrapData, 3000);
}]);

