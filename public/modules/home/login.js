/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('loginCtrl', ['$scope', '$http', 'AppAPI', function($scope, $http, AppAPI){
    $scope.user = {};
    $scope.login = function(){
        var params = {
            username:$scope.user.username,
            password:$scope.user.password
        };
        AppAPI.login(params, function(data){
            if(data == 'success'){
                window.location.href = "/user-index.html";
            }
        }, function(data){
            if(data.data){
                layer.alert(data.data.message, {
                    skin: 'layui-layer-molv' //样式类名
                    ,closeBtn: 0
                });
            }
        });
    }
}]);
