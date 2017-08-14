(function() {
    var LOCATION = 'app/deviceStatus/';
    angular.module('app.deviceStatus', [
        'ngMaterial',
        'ui.grid',
        'ui.grid.grouping',
        'ui.grid.resizeColumns',
        'ui.router',
        'app.messageLog.services'
    ])
    .config(["$stateProvider", function($stateProvider) {
        $stateProvider.state('deviceStatus', {
            url: "/dStatus",
            controller: 'dStatusController',
            templateUrl: LOCATION + 'dStatus.html'
        })
    }])
    .controller('dStatusController', ['$scope', '$http', '$interval',
        'uiGridGroupingConstants', '$filter', 'messageLogDefinitions', '$timeout',
        function($scope, $http, $interval,
                 uiGridGroupingConstants, $filter,
                 messageLogDefinitions, $timeout) {
            var getTrapData = function() {
                $http({
                    method: 'GET',
                    url: 'api/messages'
                })
                .then(function(res) {
                    $scope.devices = res.data;
                });
            };
            getTrapData();

            $scope.gridOptions = messageLogDefinitions.getGridOptions();
            $scope.gridOptions.onRegisterApi = function(gridApi) {
                $scope.gridApi = gridApi;
                $timeout(function() {
                    $scope.currentNavItem = 'devices';
                    $scope.setDevices();
                });
            };

            $scope.setDevices = function() {
                messageLogDefinitions.setViewMode(messageLogDefinitions.VIEW_MODES.DEVICES, $scope.gridApi);
            };
            $scope.setForMessages = function() {
                messageLogDefinitions.setViewMode(messageLogDefinitions.VIEW_MODES.MESSAGES, $scope.gridApi);
            };

            //var refresh = $interval(getTrapData, 10000);
            //$scope.$destroy(function(){
            //    $interval.cancel(refresh);
            //})
        }
    ]);
})();
