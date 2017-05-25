/**
 * Created by Jeng on 2015/12/17.
 */
angular.module('xmomen.validate', [

])
.constant("$ugValidateDefault", {
    errorElement: "div",
    errorClass:"error",
    focusInvalid: false, //当为false时，验证无效时，没有焦点响应
    onkeyup: false,
    //errorPlacement: function(error, element) { //指定错误信息位置
    //    var msg = error[0].innerHTML;
    //    layer.alert(msg);
    //},
    showErrors: function(errorMap, errorList) {
        if(errorList && errorList.length > 0) {
            layer.alert(errorList[0].message);
        }
    },
    /* 失去焦点时不验证 */
    onfocusout: false
})
.factory("$ugValidateProvider", function () {
    return {
        setDefaults: function (options) {
            $.validator.setDefaults(options);
        },
        addMethod: function (name, func, errorText) {
            $.validator.addMethod(name, func, errorText);
        },
        addRule: function(key, rule){
            this.addMethod(key, function(value, element){
                var pattern = new RegExp(rule.rule);
                if(value === false){
                    return false;
                }
                if(value != ""){
                    if(!pattern.test(value)){
                        return false;
                    }
                }
                return true;
            }, rule.message);
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
 }]).run(['$ugValidateProvider', function($ugValidateProvider){
    $ugValidateProvider.addRule('telephone', {
        rule:/^(1)[0-9]{10}$/,
        message:"请输入正确的手机号码"
    });
}]);
