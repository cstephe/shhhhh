(function() {
    var LOCATION = 'app/messageLog/';

    angular.module('app.messageLog.services', [
        'ngMaterial',
        'ui.grid',
        'ui.router'
    ])
    .service('messageLogDefinitions', ['uiGridGroupingConstants', '$filter',
        function(uiGridGroupingConstants, $filter) {
            var VIEW_MODES = {
                DEVICES: 'devices',
                MESSAGES: 'messages',
            };
            var service = {
                VIEW_MODES: VIEW_MODES,
                setViewMode: function(mode, gridApi) {
                    if (mode === VIEW_MODES.DEVICES){
                        gridApi.grouping.clearGrouping();
                        gridApi.grouping.groupColumn('device_id');
                        gridApi.grouping.aggregateColumn('data', 'lastLoggedMessage');
                        gridApi.grouping.aggregateColumn('gc_pub_sub_id', 'lastLoggedMessage');
                        gridApi.grouping.aggregateColumn('published_at', uiGridGroupingConstants.aggregation.MAX);
                    }else if(mode === VIEW_MODES.MESSAGES){
                        gridApi.grouping.clearGrouping();
                    }
                },
                getGridOptions: function() {
                    return {
                        enableColumnResizing: true,
                        enableFiltering: true,
                        enableGroupHeaderSelection: true,
                        data: 'devices',
                        treeCustomAggregations: {
                            'lastLoggedMessage': {
                                label: '',
                                aggregationFn: function(aggregation, fieldValue, numValue, row) {
                                    var pubDate = new Date(row.entity.published_at);
                                    if (!aggregation.latestDate || pubDate > aggregation.latestDate) {
                                        aggregation.latestDate = pubDate;
                                        aggregation.value = fieldValue;
                                    }
                                }
                            }
                        },
                        columnDefs: [
                            {
                                name: 'device_id',
                                //grouping: {groupPriority: 0},
                                sort: {priority: 0, direction: 'desc'},
                                groupingShowAggregationMenu: false
                            },
                            {
                                name: 'data',
                                treeAggregationType: 'lastLoggedMessage',
                                groupingShowAggregationMenu: false
                            },
                            {
                                name: 'gc_pub_sub_id',
                                displayName: 'Message ID',
                                treeAggregationType: 'lastLoggedMessage',
                                groupingShowAggregationMenu: false
                            },
                            {
                                name: 'published_at',
                                type: 'date',
                                cellFilter: 'date:\'short\'',
                                treeAggregationType: uiGridGroupingConstants.aggregation.MAX,
                                customTreeAggregationFinalizerFn: function(aggregation) {
                                    aggregation.rendered = $filter('date')(aggregation.value, 'short');
                                },
                                groupingShowAggregationMenu: false,
                                sort: {priority: 0, direction: 'desc'}
                            }
                        ]
                    };
                }
            };
            return service;
        }])
})();
