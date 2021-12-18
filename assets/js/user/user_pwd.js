$(function(){
    let form = layui.form
    
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        pwdSame:function(val){
            
            if($("[name = old_pwd]").val() === val ){
                return '密码一致,请重新设置!'
            }
        },
        pwdRe:function(val){
            if($("[name = new_pwd]").val() !== val){
                return '两次密码不一致,请确认'
            }
        }
    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:"PATCH",
            url:"/my/updatepwd",
            data:$(this).serialize(),
            success:function(res){
                // console.log(res);
                if(res.code !== 0){
                    return layui.layer.msg("更新密码失败!")
                }
                layui.layer.msg("更新密码成功!")
                $(".layui-form")[0].reset()
            }
        })
    })

})

