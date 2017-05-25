/**
 * Created by tanxinzheng on 17/5/9.
 */
angular.module('app.rest', [
    "ngResource"
]).factory('localStorage', ['$window', function($window){
    return{        //存储单个属性
        set :function(key, value){
            $window.localStorage[key]=value;
        },        //读取单个属性
        get:function(key, defaultValue){
            return  $window.localStorage[key] || defaultValue;
        },        //存储对象，以JSON格式存储
        setObject:function(key,value){
            $window.localStorage[key]=JSON.stringify(value);
        },        //读取对象
        getObject: function (key) {
            var obj = $window.localStorage[key];
            if(obj){
                return JSON.parse($window.localStorage[key])
            }
            return null;
        }

    }
}]).factory("AppAPI", ["Resource", function (Resource) {
    return Resource("/account/:id", {id: "@id"}, {
        getAccount: {
            method: "GET", url: "/api/wb/userInfo", isArray: false, params: {
                memberId: '@memberId',
                openId: '@openId'
            }
        },
        login: {
            method: 'POST',
            url: "/login",
            transformRequest:function(val){
                return $.param(val);
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            isArray: false
        }
    });
}]).factory("MemberAPI", ["Resource", function (Resource) {
    return Resource("/wb/member/:id", {id: "@id"}, {
        update: {
            method: "PUT", url: "/api/wb/member/:id", params: {
                id: '@id',
                mobile: '@mobile'
            }
        },
        getAccount:{
            method:"GET", url:"/api/member/account", isArray:false
        },
        getCode: {
            method:"GET", url:"/api/member/phonecode", isArray:false, params:{
                phone:"@phone"
            }
        },
        register:{
            method:"POST", url:"/api/member/register"
        }
    });
}]).factory("BindAPI", ["Resource", function (Resource) {
    return Resource("/wb/:memberId", {id: "@id"}, {
        bindMember: {
            method: "PUT", url: "/api/wb/bindMember", params: {
                openId: "@openId",
                mobile: "@mobile"
            }, isArray: false
        }
    });
}]).factory("AddressAPI", ["Resource", function (Resource) {
    return Resource("/wb/memberAddress/:id", {id: "@id"}, {
        query: {isArray: true},
        getDefaultAddress: {url: '/api/wb/memberAddress/default', method: 'GET', isArray: false},
        defaultAddress: {url: '/api/wb/memberAddress/default', method: 'PUT', params:{
            addressId:"@addressId"
        }}
    });
}]).factory("OrderAPI", ["Resource", function (Resource) {
    return Resource("/wb/order/:id", {id: "@id"}, {
        query: {
            isArray: true, params: {
                memberId: "@memberId"
            }
        },
        cancel: {
            url: '/api/wb/order/cancel', method: "POST", params: {
                id: "@id",
                memberId: "@memberId"
            }
        },
        getStatistic: {
            url: '/api/wb/order/statistic', method: "GET", params: {
                memberId: "@memberId"
            }
        },
        getCouponProduct: {url: '/api/wb/order/coupon', method: 'GET', isArray: true},
        confirm: {url: '/api/wb/order/confirm', method: 'POST', isArray: true},
        pay: {url: '/api/wb/order/pay', method: 'POST'},
        weixinPay: {url: '/api/wb/api/payOrder', method: 'POST'}
    });
}]).factory("CouponAPI", ["Resource", function (Resource) {
    return Resource("/wb/coupon/:id", {id: "@id"}, {
        query: {
            isArray: true, params: {
                memberId: "@memberId"
            }
        },
        bindCard: {
            method: 'POST', url: '/api/wb/coupon/bind', params: {
                memberId: "@memberId",
                couponNumber: "@couponNumber"
            }
        }
    });
}]).factory("PaymentAPI", ["Resource", function (Resource) {
    return Resource("/payment/:id", {id: "@id"}, {
        query: {method: "GET", url: "/payment", isArray: false}
    });
}]).factory("ProductAPI", ["Resource", function (Resource) {
    return Resource("/wx/product/:id", {id: "@id"}, {
        query: {isArray: false},
        getCartProduct: {
            isArray: true, url: '/api/wb/cart', method: "GET", params: {
                productIds: "@productIds"
            }
        }
    });
}]).factory("CategoryAPI", ["Resource", function (Resource) {
    return Resource("/wx/category/:id", {id: "@id"}, {
        query: {isArray: true}
    });
}]).factory("CouponAPI", ["Resource", function (Resource) {
    return Resource("/coupon/:id", {id: "@id"}, {
        query: {isArray: false}
    })
}]).factory("CartAPI", ["localStorage", 'Resource', function (localStorage, Resource) {
    return Resource("/wb/cart/:id", {id: "@id"}, {
        query: {isArray: true}
    })}
]).factory("CartCookieAPI", ['localStorage', function(localStorage){
    return {
      //获取产品
      query: function(param, success){
        var data = localStorage.getObject('cart');
        var newData = [];
        angular.forEach(data, function(val){
          newData.push(val);
        });
        success(newData);
        //return newData;
      },
      resetProduct: function(items){
        if(!items && items.length <= 0){
          return;
        }
        var carts = localStorage.getObject('cart');
        if(carts){
          for (var j = carts.length-1; j >= 0; j--) {
            var obj = carts[j];
            if(obj.id == items[0].id){
              carts.splice(j, 1);
            }
          }
        }
        for (var i = 0; i < items.length; i++) {
          carts.push(angular.copy(items[i]));
        }
        localStorage.setObject('cart', carts);
      },
      //放入产品到购物车
      create: function(item, success, fail){
        var carts = localStorage.getObject('cart');
        if(!carts){
          carts = [];
        }
        carts.push(angular.copy(item));
        localStorage.setObject('cart', carts);
        success();
      },
      removeProduct: function(item){
        var carts = localStorage.getObject('cart');
        if(carts){
          for (var j = 0; j < carts.length; j++) {
            var obj = carts[j];
            if(obj.id == item.id){
              carts.splice(j, 1);
              break;
            }
          }
        }
        localStorage.setObject('cart', carts);
      },
      removeProductByItemId: function(itemId){
        var carts = localStorage.getObject('cart');
        if(carts){
          var newCarts = [];
          for (var j = 0; j < carts.length; j++) {
            var obj = carts[j];
            if(obj.id != itemId){
              newCarts.push(obj);
            }
          }
          carts = newCarts;
        }
        localStorage.setObject('cart', carts);
      }
    }
}]);