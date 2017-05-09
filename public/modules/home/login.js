/**
 * Created by tanxinzheng on 17/5/8.
 */
$(document).ready(function() {
    $("#login").click(function(){
        $.ajax({
            type: "POST",
            data:{
                password:$("#password").val(),
                username:$("#username").val()
            },
            //dataType: "json",
            contentType:"application/json",
            url:"/api/member/login?password=111111&username=1500008843",
            success: function(data){
                console.log(data);
            },
            error: function(data){
                console.log(data);
            }
        });
    });
});