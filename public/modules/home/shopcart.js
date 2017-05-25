/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('shopcartCtrl', ['$scope', '$http', 'AppAPI', '$UrlUtils', 'CartAPI', '$dialog',
function($scope, $http, AppAPI, $UrlUtils, CartAPI, $dialog){
    $scope.products = [];
    $scope.getProductCart = function(){
        CartAPI.query({
        }, function(data){
            $scope.products = data;
        })
    };
    $scope.changeNumber = function(product){
        var items = [];
        for (var i = 0; i < product.itemQty; i++) {
            items.push(product);
        }
        CartAPI.resetProduct(items);
    };
    $scope.addNumber = function(product){
        product.itemQty = product.itemQty + 1;
        CartAPI.create({
            itemId:product.id,
            itemQty:product.itemQty
        });
    };
    $scope.subNumber = function(item){
        if(item.itemQty > 1){
            item.itemQty = item.itemQty - 1;
            CartAPI.create({
                itemId:item.id,
                itemQty:item.itemQty
            });
        }
    };
    $scope.remove = function(index){
        $dialog.confirm('是否删除该商品').then(function(){
            CartAPI.create({
                itemId:$scope.products[index].id,
                itemQty: 0
            });
            $scope.products.splice(index, 1);
            $dialog.msg('删除成功', {icon: 1});
        })
    };
    $scope.$watch('checkAll', function(newVal, oldVal){
        if(newVal){
            for (var i = 0; i < $scope.products.length; i++) {
                $scope.products[i].checked = true;
            }
        }else{
            for (var i = 0; i < $scope.products.length; i++) {
                $scope.products[i].checked = false;
            }
        }
    });
    $scope.totalAmount = function(){
        var amount = 0;
        for (var i = 0; i < $scope.products.length; i++) {
            var obj = $scope.products[i];
            if(obj.checked){
                amount = amount + (obj.sellPrice * obj.itemQty);
            }
        }
        return amount;
    };
    $scope.confirmOrder = function(){
        var choseProducts = [];
        var productIds = "";
        var productNums = "";
        for (var i = 0; i < $scope.products.length; i++) {
            var obj = $scope.products[i];
            if(obj.checked){
                choseProducts.push(obj);
                if(productIds == ""){
                    productIds = obj.id;
                }else{
                    productIds = productIds + "," + obj.id;
                }
                if(productNums == ""){
                    productNums = obj.itemQty;
                }else{
                    productNums = productNums + "," + obj.itemQty;
                }
            }
        }
        $UrlUtils.go('/member/pay.html', { productIds: productIds,productNums:productNums });
    };
    var init = function(){
        $scope.getProductCart();
    };
    init();
}]);
