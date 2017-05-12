var http = require('http');
var request = require('request');
var express = require('express');

exports.login = function(req, success, error){
    var headers = req.headers;
    var postheaders = {
        'Content-Type' : 'application/json; charset=UTF-8',
        'X-Requested-With':'XMLHttpRequest'
    };
    var options = {
        host: 'localhost',
        port: 8700,
        path: '/member/login',
        method: 'POST',
        form:req.body,
        headers: postheaders
    };
    request.post("http://localhost:8700/member/login",{
        form: req.body
    }, function(err, httpResponse, body) {
        success(httpResponse);
    });
    //req = http.request(options, function(res) {
    //    res.setEncoding('utf8');
    //    res.on('data', function (data) {
    //        console.log('>>> ', data);
    //        data = JSON.parse(data);
    //        success(data);
    //    });
    //});

};