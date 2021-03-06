/**
 * Created by tanxinzheng on 17/5/9.
 */
var app = angular.module('dmsApp', [
    'ngResource',
    'ngCookies',
    'ngSanitize',
    'LocalStorageModule',
    'app.rest',
    'xmomen.ui',
    'ui.bootstrap'
]).factory('Resource', [ '$resource', '$injector', "$timeout", function( $resource , $injector, $timeout) {
    return function( url, params, methods ) {

        var defaults = {
            query: {method: "GET", isArray: false},
            update: { method: 'PUT' },
            create: { method: 'POST' }
        };

        methods = angular.extend( defaults, methods );

        var resource = $resource( '/api' + url, params, methods );
        return resource;
    };
}]).factory('AuthService', ['$q', 'MemberAPI', '$UrlUtils', function($q, MemberAPI, $UrlUtils){
    return {
        isLogin:function(){
            var defer = $q.defer();
            MemberAPI.getAccount({}).$promise.then(function(data){
                defer.resolve(true);
            }, function(data){
                $UrlUtils.go("/login");
                defer.reject(false);
            });
            return defer.promise;
        }
    }
}]).factory('$UrlUtils', [function(){
    var getParams = function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    };
    var getParameters = function(){
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    var toUrlString = function(obj){
        var params = '';
        angular.forEach(obj, function(val, key){
            if(key){
                if(params != ''){
                    params = params + '&'
                }
                params = params + key + '=' + val;
            }
        });
        return params;
    };
    var go = function(url, obj){
        if(obj){
            window.location.href = url + '?' + toUrlString(obj);
        }else{
            window.location.href = url;
        }
    };
    return {
        getParams:getParams,
        getParameters : getParameters,
        toUrlString:toUrlString,
        go:go
    }
}]).controller('dmsCtrl', ['$scope', '$UrlUtils', function($scope, $UrlUtils){
    $scope.searchParams = {};
    $scope.headerSetting = {};
    $scope.goSearch = function(){
        $UrlUtils.go("/search.html", $scope.searchParams);
    };
    var params = $UrlUtils.getParameters();
    if(params && params.keyword){
        $scope.searchParams.keyword = params.keyword;
    };
    if(params && params.label){
        $scope.headerSetting.label = params.label;
    }else{
        $scope.headerSetting.label = '';
    }
}]);