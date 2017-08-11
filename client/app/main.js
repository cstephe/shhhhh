angular
.module('thisApp', [
    'app.messageLog',
    'app.deviceStatus',
    'ui.router',
    'ngMaterial'
]).run(['$state', '$stateParams', function($state, $stateParams) {
    if (!$state.current.name) {
        //$state.go('messageLog');
    }
}]).controller('appController',[function(){
    $scope.currentNavItem = 'mLog';
}]);