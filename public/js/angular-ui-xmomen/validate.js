/**
 * Created by Jeng on 2015/12/17.
 */
angular.module('xmomen.validate', [])
.constant("$ugValidateDefault", {
    errorElement: "div",
    errorClass:"error",
    focusInvalid: false, //当为false时，验证无效时，没有焦点响应
    onkeyup: false,
    errorPlacement: function(error, element) { //指定错误信息位置
        var msg = error[0].innerHTML;
        layer.alert(msg);
    }
})
.factory("$ugValidateProvider", function () {
    return {
        setDefaults: function (options) {
            $.validator.setDefaults(options);
        },
        addMethod: function (name, func, errorText) {
            $.validator.addMethod(name, func, errorText);

        }
    }
})
.directive('ugValidate', ["$ugValidateDefault", function( $ugValidateDefault) {
     return {
         restrict: 'A',
         scope:{
             ugValidate:"="
         },
         require:"form",
         link: function(scope, element, attr) {
             var option = angular.extend($ugValidateDefault, scope.ugValidate);
             scope.ugValidate.validator = $(element).validate(option);
             angular.extend(scope.ugValidate, option);
         }
     };
 }]);
