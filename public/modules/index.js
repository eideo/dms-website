/**
 * Created by tanxinzheng on 17/5/9.
 */
app.controller('indexCtrl', ['$scope', 'ProductAPI', 'CategoryAPI', 'CartCookieAPI', '$dialog', 'AuthService', function($scope, ProductAPI, CategoryAPI, CartCookieAPI, $dialog, AuthService){
    $scope.queryParams = {};
    $scope.getProducts = function(){
        var labels = [];
        if($scope.queryParams.label){
            labels = [$scope.queryParams.label];
        }
        ProductAPI.query({
            limit:100,
            offset:1,
            keyword:$scope.queryParams.keyword,
            orderField:$scope.queryParams.orderField,
            isAsc:$scope.queryParams.isAsc,
            labels: labels,
            categoryId:$scope.queryParams.categoryId
        }, function(data){
            $scope.products = data.data;
        })
    };
    var img = {
        1:'/img/icon_sg.png',
        2:'/img/icon_ly.png',
        3:'/img/icon_rs.png',
        4:'/img/icon_sx.png',
        5:'/img/icon_lh.png',
        6:'/img/icon_ls.png',
        7:'/img/icon_yp.png'
    };
    $scope.getImgSrc = function(id){
        return img[id];
    };
    $scope.categorys = [];
    $scope.getCategory = function(){
        CategoryAPI.query({}, function(data){
            $scope.categorys = data;
        })
    };
    $scope.getCategory();
    $scope.queryParams = {};
    $scope.goSearch = function(){
        window.location.href = "/search.html?keyword=" + $scope.queryParams.keyword;
    }

    $scope.getQiangGouProducts = function () {
        ProductAPI.query({
            limit: 8,
            offset: 1,
            labels: ["xianShiQiangGou"]
        }, function (data) {
            $scope.qiangGouProducts = data.data;
        });
    };
    $scope.getXinPinProducts = function () {
        ProductAPI.query({
            limit: 8,
            offset: 1,
            labels: ["xinPinChangXian"]
        }, function (data) {
            $scope.xinPinProducts = data.data;
        });
    };
    $scope.getTuiJianProducts = function () {
        ProductAPI.query({
            limit: 8,
            offset: 1,
            labels: ["reMaiTuiJian"]
        }, function (data) {
            $scope.tuiJianProducts = data.data;
        });
    };
    $scope.pushCarts = function(item){
        if(!item.stockNum || !(item.stockNum >= 1)){
            $dialog.alert("该商品库存不足");
            return;
        }
        CartCookieAPI.create(item, function(){
            $dialog.alert("商品［" +item.itemName+ "］已放入购物车");
        });
    };
    $scope.buy = function(item){
        AuthService.isLogin().then(function(){
            console.log("login");
        }, function(data){
            console.log("not login");
        })
    };
    var init = function () {
        //$scope.getCurrentLocation();
        $scope.getQiangGouProducts();
        $scope.getXinPinProducts();
        $scope.getTuiJianProducts();
        //$scope.getLocalAddress();
    };
    init();
}]);