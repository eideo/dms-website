var http = require('http');
var request = require('request');
var express = require('express');
var requestC = request.defaults({jar: true});

exports.login = function(req, success, error){
    requestC.post("http://localhost:8700/member/login",{
        //jar: true,
        form: req.body
    }, function(err, httpResponse, body) {
        success(httpResponse);
    });
};