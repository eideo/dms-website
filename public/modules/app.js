/**
 * Created by tanxinzheng on 17/5/9.
 */
angular.module('dmsApp', [
    'ngResource',
    'app.rest'
]).factory('Resource', [ '$resource', '$injector', "$timeout", function( $resource , $injector, $timeout) {
    return function( url, params, methods ) {

        var defaults = {
            query: {method: "GET", isArray: false},
            update: { method: 'PUT' },
            create: { method: 'POST' }
        };

        methods = angular.extend( defaults, methods );

        var resource = $resource( '/api' + url, params, methods );
        return resource;
    };
}]).controller('dmsCtrl', ['$scope', function($scope){
    //$scope.
}]);