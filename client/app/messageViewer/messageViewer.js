(function() {
    var LOCATION = 'app/messageViewer/';
    angular.module('app.messageViewer', [
        'app.messageViewer.services',
        'ngMaterial',
        'ui.grid',
        'ui.grid.grouping',
        'ui.grid.resizeColumns',
        'ui.router'
    ])
    .config(["$stateProvider", function($stateProvider) {
        $stateProvider.state('app.messageViewer', {
            url: "/messages",
            controller: 'messageViewerController',
            templateUrl: LOCATION + 'messageViewer.html'
        });
    }])
    .controller('messageViewerController', ['$scope', '$http', '$interval', '$state',
        'uiGridGroupingConstants', '$filter', 'messageLogDefinitions', '$timeout',
        function($scope, $http, $interval, $state,
                 uiGridGroupingConstants, $filter,
                 messageLogDefinitions, $timeout) {
            var getTrapData = function() {
                $scope.refreshing = true;
                $http({
                    method: 'GET',
                    url: 'api/messages'
                })
                .then(function(res) {
                    $scope.devices = res.data;
                }).finally(function() {
                    $scope.refreshing = false;
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
            $scope.refreshView = function() {
                getTrapData();
            };
            $scope.setDevices = function() {
                messageLogDefinitions.setViewMode(messageLogDefinitions.VIEW_MODES.DEVICES, $scope.gridApi);
            };
            $scope.setForMessages = function() {
                messageLogDefinitions.setViewMode(messageLogDefinitions.VIEW_MODES.MESSAGES, $scope.gridApi);
            };
            $scope.logout = function(){
                $state.go('login')
            };
        }
    ]);
})();
