/**
 * Created by tanxinzheng on 17/5/8.
 */
app.controller('addressCtrl', ['$scope', 'AddressAPI', '$dialog', function($scope, AddressAPI, $dialog){
    $scope.addressList = [];
    $scope.getAddress = function(){
        AddressAPI.query({
            offset:1,
            limit:10
        }, function(data) {
            $scope.addressList = data;
        });
    };
    $scope.addressForm = {};
    $scope.save = function(){
        if($scope.addressForm.validator.form()){
            if($scope.address.id){
                AddressAPI.update($scope.address, function(data){
                    $dialog.alert('保存成功');
                    $scope.getAddress();
                });
            }else{
                AddressAPI.save($scope.address, function(data){
                    $scope.address = data;
                    $dialog.alert('保存成功');
                    $scope.getAddress();
                });
            }
        }
    };
    $scope.setDefaultAddress = function(item){
        AddressAPI.defaultAddress({
            addressId:item.id
        }, function(data){
            $scope.getAddress();
        });
    };
    $scope.address = null;
    $scope.update = function(item){
        $scope.address = item;
    };
    $scope.cancel = function(){
        $scope.address = null;
    };
    $scope.delete = function(item){
        if(item){
            AddressAPI.delete({
                id:item.id
            }, function(data){
                $dialog.alert('删除成功');
                $scope.getAddress();
            });
        }
    };
    $scope.getAddress();
}]);
