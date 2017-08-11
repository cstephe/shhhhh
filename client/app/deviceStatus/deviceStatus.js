(function() {
    var LOCATION = 'app/deviceStatus/';
    angular.module('app.deviceStatus', [
        'ngMaterial',
        'ui.grid',
        'ui.grid.grouping',
        'ui.grid.resizeColumns',
        'ui.router'
    ])
    .config(["$stateProvider", function($stateProvider) {
        $stateProvider.state('deviceStatus', {
            url: "/dStatus",
            controller: 'dStatusController',
            templateUrl: LOCATION + 'dStatus.html'
        })
    }])
    .controller('dStatusController', ['$scope', '$http', '$interval', 'uiGridGroupingConstants', '$filter',
        function($scope, $http, $interval, uiGridGroupingConstants, $filter) {
            var getTrapData = function() {
                $http({
                    method: 'GET',
                    url: 'api/traps'
                })
                .then(function(res) {
                    $scope.devices = res.data;
                });
            };
            getTrapData();

            $scope.gridOptions = {
                enableColumnResizing: true,
                enableFiltering: true,
                enableGroupHeaderSelection: true,
                data: 'devices',
                treeCustomAggregations: {
                    'last': {
                        label: 'Last: ', aggregationFn: function(aggregation, fieldValue, numValue, row) {
                            if (!aggregation.latestDate || new Date(row.published_at) > aggregation.latestDate) {
                                aggregation.latestDate = new Date(row.published_at);
                                aggregation.value = fieldValue;
                            }
                        }
                    },
                },
                columnDefs: [
                    {
                        name: 'device_id',
                        grouping: {groupPriority: 0},
                        sort: {priority: 0, direction: 'desc'}
                    },
                    {
                        name: 'data',
                        treeAggregationType: 'last',
                        customTreeAggregationFinalizerFn: function(aggregation) {
                            console.log(arguments);
                        }
                    },
                    {name: 'gc_pub_sub_id'},
                    {
                        name: 'published_at',
                        type: 'date',
                        cellFilter: 'date:\'short\'',
                        treeAggregationType: uiGridGroupingConstants.aggregation.MAX,
                        customTreeAggregationFinalizerFn: function(aggregation) {
                            aggregation.rendered = $filter('date')(aggregation.value, 'short');
                        },
                        sort: {priority: 0, direction: 'desc'}
                    }
                ],
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                }
            };


            //var refresh = $interval(getTrapData, 10000);
            //$scope.$destroy(function(){
            //    $interval.cancel(refresh);
            //})
        }
    ]);
})();
