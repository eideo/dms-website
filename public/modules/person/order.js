/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('orderCtrl', ['$scope', 'OrderAPI', '$dialog', function($scope, OrderAPI, $dialog){
    $scope.queryParams = {
        timeType:1,
        orderType:1
    };
    $scope.getOrders = function(){
        OrderAPI.query({
            status:$scope.queryParams.status
        }, function(data){
            $scope.orders = data;
        })
    };

    $scope.switchType = function(type){
        $scope.queryParams.orderType = type;
        $scope.queryParams.status = null;
        if(type == 1){
            //所有
            $scope.queryParams.status = null;
        }else if(type == 2){
            //待付款
            $scope.queryParams.status = 0;
        }else if(type == 3){
            //待收货
            $scope.queryParams.status = 1;
        }else if(type == 4){
            //待评价
            $scope.queryParams.status = 6;
        }
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
