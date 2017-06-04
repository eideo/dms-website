var http = require('http');
var appConfig = require('../app.config');
var request = require('request');
var express = require('express');
var requestC = request.defaults({jar: true});
var envConfig = appConfig.getEnv();

exports.login = function(req, success, error){
    requestC.post(envConfig.apiHost + "/member/login",{
        //jar: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        form: req.body
    }, function(err, httpResponse, body) {
        success(httpResponse);
    });
};