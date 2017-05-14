/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('informationCtrl', ['$scope', 'MemberAPI', '$dialog', function($scope, MemberAPI, $dialog){
    $scope.getMember = function(){
        MemberAPI.getAccount({
        }, function(data) {
            $scope.member = data;
        });
    };
    $scope.memberForm = {};
    $scope.save = function(){
        if($scope.memberForm.validator.form()){
            if($scope.member.id){
                MemberAPI.update($scope.member, function(data){
                    $dialog.alert('保存成功');
                    $scope.getAddress();
                });
            }else{
                MemberAPI.save($scope.member, function(data){
                    $scope.member = data;
                    $dialog.alert('保存成功');
                    $scope.getAddress();
                });
            }
        }
    };
    $scope.member = null;
    $scope.getMember();
}]);
