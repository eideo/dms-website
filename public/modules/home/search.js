/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('searchCtrl', ['$scope', '$http', 'AppAPI', '$UrlUtils', 'CategoryAPI', 'ProductAPI',
function($scope, $http, AppAPI, $UrlUtils, CategoryAPI, ProductAPI){
    $scope.queryParams = {};
    $scope.labelQuery = function(label){
        $scope.queryParams.label = label;
        $scope.getProducts();
    };
    $scope.orderQuery = function(orderField){
        $scope.queryParams.label = null;
        $scope.queryParams.orderField = orderField;
        $scope.queryParams.isAsc = !$scope.queryParams.isAsc;
        $scope.getProducts();
    };
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
    $scope.categorys = [];
    $scope.getCategory = function(){
        CategoryAPI.query({}, function(data){
            $scope.categorys = data;
        })
    };
    $scope.pushCarts = function(item){
        var member = $cookieStore.get('member');
        CartAPI.create({
            memberId:member.memberId,
            itemId:item.id
        }, function(){
            $dialog.alert("商品［" +item.itemName+ "］已放入购物车");
            pubSub.publish('changeCart');
        });
    };
    var init = function(){
        $scope.queryParams = $UrlUtils.getParameters();
        if($scope.queryParams.type){
            $scope.queryParams.categoryId = params.type;
        }
        if($scope.queryParams.label){
            $scope.queryParams.label = params.label;
        }
        $scope.getProducts();
        $scope.getCategory();
    };
    init();
}]);
