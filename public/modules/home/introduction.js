/**
 * Created by lixiaoyan on 2017/5/23.
 */
app.controller('introductionCtrl',  ['$scope', 'ProductAPI', 'CartAPI', '$dialog', '$UrlUtils',
    function($scope, ProductAPI, CartAPI, $dialog, $UrlUtils){
        $scope.activeIndex = 1;
        $scope.queryParams = {};
        $scope.getGoods = function(){
            ProductAPI.get({
                id:$scope.queryParams.productId
            }, function(data){
                $scope.product = data;
            })
        };
        $scope.getNumber = function(){

        };
        $scope.pushCart = function(){
            CartAPI.create({
                itemId:$scope.product.id
            }, function(){
                $dialog.alert("成功放入购物车");
            });
        };
        $scope.buy = function(){
            $scope.product.itemQty = 1;
            $state.go('payment_confirm', {
                products:[$scope.product]
            });
        };
        var init = function(){
            $scope.queryParams = $UrlUtils.getParameters();
            $scope.getGoods();
        };
        init();
    }]
);
