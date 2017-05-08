/**
 * Created by tanxinzheng on 17/5/8.
 */
$(document).ready(function() {
    $("#register").click(function(){
        $.ajax({
            type: "POST",
            processData:false,
            data: JSON.stringify({
                phoneNumber:$("#phoneNumber").val(),
                password:$("#password").val(),
                email:$("#email").val()
            }),
            dataType: "json",
            contentType:"application/json",
            url:"/api/member/register",
            success: function(data){
                console.log(data);
            },
            error: function(data){
                console.log(data);
            }
        });
    });

    $("#register2").click(function(){
        $.ajax({
            type: "POST",
            processData:false,
            data: JSON.stringify({
                phoneNumber:$("#phoneNumber").val(),
                password:$("#phonePassword").val()
            }),
            dataType: "json",
            contentType:"application/json",
            url:"/api/member/register",
            success: function(data){
                console.log(data);
            },
            error: function(data){
                console.log(data);
            }
        });
    });
});