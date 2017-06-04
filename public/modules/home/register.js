/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('registerCtrl',
    ['$scope', '$http', 'AppAPI', '$UrlUtils', 'MemberAPI', '$interval', '$dialog',
    function($scope, $http, AppAPI, $UrlUtils, MemberAPI, $interval, $dialog){
        $scope.user = {};
        $scope.tips = {
            message:"获取验证码",
            disabled:false
        };
        $scope.sendValidCode = function(){
            if($scope.tips.disabled){
                return;
            }
            if(!$scope.user.phoneNumber){
                $dialog.alert("请输入手机号码");
                return;
            }
            MemberAPI.getCode({
                phone: $scope.user.phoneNumber
            }, function(data){
                var i = 60;
                var instead = $interval(function(){
                    if(i <= 60 && i > 0){
                        $scope.tips.message = i + "秒";
                        $scope.tips.disabled = true;
                    }else{
                        $interval.cancel(instead);
                        $scope.tips.message = "获取验证码";
                        $scope.tips.disabled = false;
                    }
                    i--;
                }, 1000);
            });
        };
        $scope.registerForm = {};
        $scope.register = function(){
            if($scope.registerForm.validator.form()){
                MemberAPI.register($scope.user, function(data){
                    $dialog.alert("注册成功");
                    window.location.href = "/login";
                })
            }
        };
    }
]);