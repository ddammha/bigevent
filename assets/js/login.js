$(function(){
    $("#link_reg").on("click",function(){
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on("click",function(){
        $(".reg-box").hide()
        $(".login-box").show()
    })

    let form = layui.form
    let layer = layui.layer

    form.verify({
        keyword:[
            /^[\S]{6,15}$/
            ,'密码必须6到15位，且不能出现空格'
          ] ,
          repassword:function(val){
            if($(".reg-box [name=repassword]").val() !== val ){
               return console.log("密码不匹配");
            }
          }
    })

    $("#form-reg").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:"/api/reg",  
            data:{
                username:$("#form-reg [name=username]").val(),
                password:$("#form-reg [name=password]").val(),
                repassword:$("#form-reg [name=repassword]").val(),
            },
            success:function(res){
                if(res.code !== 0){
                    return layer.msg(res.message);;
                }
                layer.msg(res.message);
                $("#link_login").click()
            }
        })
    })

    $("#form-login").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:"/api/login",
            data:$(this).serialize(),
            success:function(res){
                if(res.code !== 0 ){
                   return layer.msg(res.message)
                }
                // console.log(res);
                layer.msg(res.message)

                localStorage.setItem("token",res.token)
                location.href="../../index.html"
            }
        })
    })


















})