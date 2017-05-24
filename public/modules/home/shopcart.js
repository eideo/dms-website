/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('shopcartCtrl', ['$scope', '$http', 'AppAPI', '$UrlUtils', 'CartCookieAPI', '$dialog',
function($scope, $http, AppAPI, $UrlUtils, CartCookieAPI, $dialog){
    $scope.pageSetting = {
        category1:null,
        category2:null
    };
    $scope.queryParams = {};
    $scope.products = [];
    $scope.getCarts = function(){
        CartCookieAPI.query({
        }, function(data){
            $scope.products = data;
        });
    };
    var init = function(){
        $scope.getCarts();
    };
    init();
}]);
