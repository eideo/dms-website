/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('payCtrl', ['$scope', '$http', 'AppAPI', '$UrlUtils', 'CartAPI', '$dialog', 'ProductAPI','AddressAPI','OrderAPI',
function($scope, $http, AppAPI, $UrlUtils, CartAPI, $dialog, ProductAPI, AddressAPI, OrderAPI){
    $scope.queryParams = {};
    $scope.addressList = [];
    $scope.order = {};
    $scope.getAddress = function(){
        AddressAPI.query({
            offset:1,
            limit:100
        }, function(data) {
            $scope.addressList = data;
            angular.forEach($scope.addressList, function(val, i){
                if(val.isDefault){
                    $scope.order.address = val;
                    $scope.order.consigneeName = val.name;
                    $scope.order.consigneePhone = val.mobile;
                    $scope.order.consigneeAddress = val.fullAddress;
                }
            })
        });
    };
    $scope.addressForm = {};
    $scope.openAddress = function(address){
        $scope.address = address;
        //layer
        layer.open({
            title:"收货地址",
            type:1,
            btn:['保存','取消'],
            area: ['400px', '300px'],
            content:$('#addressDialog'),
            yes: function(index){
                if($scope.addressForm.validator.form()){
                    if($scope.address && $scope.address.id){
                        AddressAPI.update($scope.address, function(data){
                            layer.close(index);
                        });
                    }else{
                        AddressAPI.create($scope.address, function(data){
                            layer.close(index);
                        });
                    }
                }
            },
            btn2:function(index){
                layer.close(index);
            }
        })
    };
    $scope.choseAddress = function(address){
        $scope.order.consigneeName = address.name;
        $scope.order.consigneePhone = address.mobile;
        $scope.order.consigneeAddress = address.fullAddress;
    };
    $scope.submitOrder = function(){
        if(!$scope.order.address){
            $dialog.alert('请选择收货人');
            return;
        }
        if(!$scope.order.appointmentTime){
            $dialog.alert('请选择预约时间');
            return;
        }
        if(!$scope.order.products || $scope.order.products.length == 0){
            $dialog.alert('订单不存在商品，请选择商品后重新提交');
            return;
        }
        var order = {
            consigneeName:$scope.order.consigneeName,
            consigneePhone:$scope.order.consigneePhone,
            consigneeAddress:$scope.order.consigneeAddress,
            orderType:$scope.order.orderType,
            paymentRelationNo:$scope.order.paymentRelationNo,
            appointmentTime:$scope.order.appointmentTime,
            orderItemList:[]
        };
        for (var i = 0; i < $scope.order.products.length; i++) {
            var obj = $scope.order.products[i];
            order.orderItemList.push({
                orderItemId:obj.id,
                itemQty:obj.itemQty
            });
        }
        OrderAPI.create(order, function(data){
            $UrlUtils.go('/member/orderinfo.html', {id:data.id});
        });
    };
    $scope.order.products = [];
    $scope.getProduct = function(){
        if(!$scope.queryParams.productIds || $scope.queryParams.productIds.length <= 0){
            return;
        }
        ProductAPI.query({
            limit:1000,
            offset:1,
            productIds:$scope.queryParams.productIds
        }, function(data){
            $scope.order.products = data.data;
            angular.forEach($scope.order.products, function(val, i){
                $scope.order.products[i].itemQty = $scope.productParams[$scope.order.products[i].id];
            });
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
                itemId:$scope.order.products[index].id,
                itemQty: 0
            });
            $scope.order.products.splice(index, 1);
            $dialog.msg('删除成功', {icon: 1});
        })
    };
    $scope.totalAmount = function(){
        var amount = 0;
        for (var i = 0; i < $scope.order.products.length; i++) {
            var obj = $scope.order.products[i];
            amount = amount + (obj.sellPrice * obj.itemQty);
        }
        return amount;
    };
    $scope.confirmOrder = function(){
        var choseProducts = [];
        var productIds = "";
        var productNums = "";
        for (var i = 0; i < $scope.order.products.length; i++) {
            var obj = $scope.order.products[i];
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
        var params = $UrlUtils.getParameters();
        if(params.productIds){
            var arr = params.productIds.split(',');
            var narr = params.productNums.split(',');
            $scope.productParams = {};
            angular.forEach(arr, function(val, index){
                $scope.productParams[val] = parseInt(narr[index]);
                //products.push({productId:val, itemQty:parseInt(narr[index])});
            });
            $scope.queryParams.productIds = arr;
        }
        $scope.getProduct();
        $scope.getAddress();
    };
    init();
}]);
