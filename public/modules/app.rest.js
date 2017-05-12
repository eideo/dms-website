/**
 * Created by tanxinzheng on 17/5/9.
 */
angular.module('app.rest', [
    "ngResource"
]).factory("AppAPI", ["Resource", function (Resource) {
    return Resource("/account/:id", {id: "@id"}, {
        getAccount: {
            method: "GET", url: "/api/wx/userInfo", isArray: false, params: {
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
    return Resource("/wx/member/:id", {id: "@id"}, {
        update: {
            method: "PUT", url: "/api/wx/member/:id", params: {
                id: '@id',
                mobile: '@mobile'
            }
        }
    });
}]).factory("BindAPI", ["Resource", function (Resource) {
    return Resource("/wx/:memberId", {id: "@id"}, {
        bindMember: {
            method: "PUT", url: "/api/wx/bindMember", params: {
                openId: "@openId",
                mobile: "@mobile"
            }, isArray: false
        }
    });
}]).factory("AddressAPI", ["Resource", function (Resource) {
    return Resource("/wx/memberAddress/:id", {id: "@id"}, {
        query: {isArray: true},
        getDefaultAddress: {url: '/api/wx/getDefaultAddress', method: 'GET', isArray: false}
    });
}]).factory("OrderAPI", ["Resource", function (Resource) {
    return Resource("/wx/order/:id", {id: "@id"}, {
        query: {
            isArray: true, params: {
                memberId: "@memberId"
            }
        },
        cancel: {
            url: '/api/wx/order/cancel', method: "POST", params: {
                id: "@id",
                memberId: "@memberId"
            }
        },
        getStatistic: {
            url: '/api/wx/order/statistic', method: "GET", params: {
                memberId: "@memberId"
            }
        },
        getCouponProduct: {url: '/api/wx/order/coupon', method: 'GET', isArray: true},
        confirm: {url: '/api/wx/order/confirm', method: 'POST', isArray: true},
        pay: {url: '/api/wx/order/pay', method: 'POST'},
        weixinPay: {url: '/api/wx/api/payOrder', method: 'POST'}
    });
}]).factory("CouponAPI", ["Resource", function (Resource) {
    return Resource("/wx/coupon/:id", {id: "@id"}, {
        query: {
            isArray: true, params: {
                memberId: "@memberId"
            }
        },
        bindCard: {
            method: 'POST', url: '/api/wx/coupon/bind', params: {
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
            isArray: true, url: '/api/wx/cart', method: "GET", params: {
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
    return Resource("/wx/cart/:id", {id: "@id"}, {
        query: {isArray: true}
    })}
]);