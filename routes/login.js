var http = require('http');
var request = require('request');
var express = require('express');

exports.login = function(req, success, error){
    request.post("http://localhost:8700/member/login",{
        form: req.body
    }, function(err, httpResponse, body) {
        success(httpResponse);
    });

};