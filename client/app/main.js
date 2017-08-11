angular
.module('thisApp', [
    'app.messageLog',
    'ui.router',
    'ngMaterial'
]).run(['$state',function($state){
    $state.go('messageLog');
}])