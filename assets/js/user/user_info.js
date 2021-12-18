$(function(){
    getUserList()
    form = layui.form

    form.verify({
        nickname:function(val){
            if(val.length >6){
                return "昵称的字符请于1-6之间"
            }
        }
    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:"PUT",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
                // console.log(res);
                if(res.code !== 0){
                    return layui.layer.msg("用户信息更新失败!")
                }
                layui.layer.msg("用户信息更新成功!")
                window.parent.getUserInfo()
            }
        })
    })

    $("#btnReset").on("click",function(e){
        e.preventDefault()
        getUserList()
    })

})

function getUserList(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        success:function(res){
            form.val("userLog-form", res.data);
        }
    })
}