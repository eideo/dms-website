/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('orderCtrl', ['$scope', 'OrderAPI', '$dialog', function($scope, OrderAPI, $dialog){
    $scope.queryParams = {
        timeType:1
    };
    $scope.getOrders = function(){
        if($scope.queryParams.timeType == 1){
            //近一个月
            $scope.queryParams.minOrderTime = new Date().getTime() - (31 * 24 * 3600000);
            $scope.queryParams.maxOrderTime = new Date().getTime();
        }else if($scope.queryParams.timeType == 2){
            //近半年订单
            $scope.queryParams.minOrderTime = new Date().getTime() - (180 * 24 * 3600000);
            $scope.queryParams.maxOrderTime = new Date().getTime();
        }else if($scope.queryParams.timeType == 3){
            //半年前订单
            $scope.queryParams.minOrderTime = null;
            $scope.queryParams.maxOrderTime = new Date().getTime() - (180 * 24 * 3600000);
        }
        OrderAPI.query({
            status:$scope.queryParams.status,
            maxOrderTime:$scope.queryParams.maxOrderTime,
            minOrderTime:$scope.queryParams.minOrderTime
        }, function(data){
            $scope.orders = data;
        })
    };

    $scope.switchTime = function(type){
        $scope.queryParams.timeType = type;
        $scope.getOrders();
    };
    $scope.confirm = function(order){
        OrderAPI.confirm({
            id: order.id
        }, function(){
            $scope.getOrder();
            $dialog.alert("确认收货成功");
        })
    };
    $scope.goPay = function(order){
        $state.go('order_payment', {
            id:order.id
        });
    };
    $scope.cancel = function(order){
        OrderAPI.cancel({
            id: order.id
        }, function(){
            $scope.getOrders();
            $dialog.alert("已取消该订单");
        })
    };
    $scope.confirmTracking = function(){
        $state.go('tracking');
    };

    var init = function(){
        //if($stateParams.type == 0){
        //    // 全部
        //    //$scope.queryParams.status = null;
        //    $scope.titleText = "全部订单";
        //}else if($stateParams.type == 1){
        //    // 待付款
        //    $scope.queryParams.status = 0;
        //    $scope.titleText = "待付款订单";
        //}else if($stateParams.type == 2){
        //    // 待收货
        //    $scope.queryParams.status = 1;
        //    $scope.titleText = "待收货订单";
        //}
        $scope.getOrders();
    };
    init();
}]);
