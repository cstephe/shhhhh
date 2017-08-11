angular
.module('thisApp', ['ngMaterial'])
.controller('mainController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
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

