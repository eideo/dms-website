/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('searchCtrl', ['$scope', '$http', 'AppAPI', '$UrlUtils', 'CategoryAPI', 'ProductAPI',
function($scope, $http, AppAPI, $UrlUtils, CategoryAPI, ProductAPI){
    $scope.pageSetting = {
        category1:null,
        category2:null
    };
    $scope.queryParams = {};
    $scope.pageInfo = {
        pageSize:10,
        pageNum:1
    };
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
            limit:$scope.pageInfo.pageSize,
            offset:$scope.pageInfo.pageNum,
            keyword:$scope.queryParams.keyword,
            orderField:$scope.queryParams.orderField,
            isAsc:$scope.queryParams.isAsc,
            labels: labels,
            categoryId:$scope.queryParams.categoryId
        }, function(data){
            $scope.products = data.data;
            $scope.pageInfo = data.pageInfo;
        })
    };
    $scope.choseLevel = function(item){
        var datas = angular.copy(item);
        if(item.nodes){
            datas.nodes.splice(0,0, {id:null,name:'全部'});
        }
        $scope.pageSetting.category1 = datas;
        $scope.pageSetting.category2 = null;
        $scope.queryParams.categoryId = $scope.pageSetting.category1.id;
        $scope.getProducts();
    };
    $scope.choseLevel2 = function(item){
        $scope.pageSetting.category2 = item;
        $scope.queryParams.categoryId = $scope.pageSetting.category2.id;
        $scope.getProducts();
    };
    $scope.categorys = [];
    $scope.getCategory = function(){
        CategoryAPI.query({}, function(data){
            $scope.categorys = data;
            $scope.categorys.splice(0,0, {id:null,name:'全部'});
            angular.forEach($scope.categorys, function(val, key){
                if($scope.queryParams.categoryId == val.id){
                    $scope.pageSetting.category1 = val;
                }
                angular.forEach(val.nodes, function(node, nodekey){
                    if($scope.queryParams.nodeId == node.id){
                        $scope.pageSetting.category2 = node;
                    }
                });
            })
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
        if($scope.queryParams.categoryId){
            //$scope.queryParams.categoryId = params.type;
        }
        if($scope.queryParams.label){
            $scope.queryParams.label = params.label;
        }
        $scope.getProducts();
        $scope.getCategory();
    };
    init();
}]);
