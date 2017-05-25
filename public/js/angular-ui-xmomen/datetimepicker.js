/**
 * Created by TANXINZHENG481 on 2017-03-29.
 */
(function($){
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今日",
        suffix: [],
        meridiem: []
    };
}(jQuery));
angular.module('ui.xmomen.datetimepicker', [
"ng"
]).directive('uixDatetimepicker',["$filter",  function($filter){
    var dateFilter = $filter('date');
    return {
        require:'ngModel',
        scope:{
            uixDateOption:"="
        },
        link : function(scope,elem,attr,ctrl){
            var dateConfig = scope.uixDateOption;
            var config = angular.extend({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                minView:2,
                forceParse:true,
                keyboardNavigation:true,
                pickerPosition: "bottom-left",
                language:'zh-CN'
            }, dateConfig);

            $(elem).datetimepicker(config).on('change',function(){
                var val = $(this).val();
                scope.$apply(function(){
                    ctrl.$setViewValue(elem.val());
                });
            }).addClass('date').attr("readonly", true);

            ctrl.$formatters.push(function (value) {
                if (angular.isNumber(value) && config.format == 'yyyy-mm-dd') {
                    return dateFilter(value, 'yyyy-MM-dd'); //format
                }
                return value;
            });
            ctrl.$parsers.unshift(function (value) {
                if (angular.isString(value) && value.length > 0) {
                    if(config.valueType == 'yyyy-MM-dd'){
                        return value;
                    }else if(config.valueType == 'year'){
                        return parseInt(value);
                    }else{
                        var reg = new RegExp(/^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/);
                        if(reg.test(value)){
                            return new Date(dateParser.parse(value, 'yyyy-MM-dd')).getTime();
                        }
                        return value;
                    }
                } else {
                    if(angular.isNumber(value) && value.length > 0){
                        if(config.valueType == 'year'){
                            return value;
                        }
                        return new Date(dateParser.parse(value, 'yyyy-MM-dd')).getTime();
                    }
                    return value;
                }
            });

            // 添加清除按钮
            $(elem).next("span").children("button").bind('click', function(){
                $(elem).datetimepicker("show");
            });
            //兼容点击按钮组日历图标显示控件
            $(elem).next("span").children("button").bind('click', function(){
                $(elem).datetimepicker("show");
            })
        }
    }
}]);