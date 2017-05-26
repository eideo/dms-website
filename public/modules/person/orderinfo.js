/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('orderInfoCtrl', ['$scope', 'OrderAPI', '$dialog', '$UrlUtils', function($scope, OrderAPI, $dialog, $UrlUtils){
    $scope.queryParams = {};
    $scope.getOrder = function(){
        OrderAPI.get({
            id:$scope.queryParams.id
        }, function(data){
            $scope.order = data;
        })
    };
    $scope.confirm = function(){
        OrderAPI.confirm({
            id:$scope.order.id
        }, function(){
            $dialog.alert("确认收货成功");
        })
    };
    $scope.confirm = function(){
        OrderAPI.confirm({
            id:$scope.order.id
        }, function(){
            $scope.getOrder();
            $dialog.alert("确认收货成功");
        })
    };
    $scope.pay = function(){
        $state.go('order_payment', {
            id:$scope.order.id
        });
    };

    var init = function(){
        $scope.queryParams = $UrlUtils.getParameters();
        $scope.getOrder();
    };
    init();
}]);
