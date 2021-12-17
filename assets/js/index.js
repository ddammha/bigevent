$(function(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        // headers:{
        //     Authorization:localStorage.getItem("token"),
        // },
        success:function(res){
            console.log(res);
            if(res.code !== 0){
                return layui.layer.msg("信息获取失败")
            }
            renderUserMsg(res.data)
        },
        // complete:function(res){
        //     console.log(res);
        //     if(res.responseJSON.code !== 0 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem("token")
        //         location.href="../../login.html"
        //     }
        // }
    })
    $("#userLogOut").on("click",function(){
        layer.confirm('确认退出登录吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token")
            location.href="../../login.html"
            layer.close(index);
          });
    })

})


function renderUserMsg(user){
    let uname = user.nickname || user.username;
    $(".welcome").html("欢迎&nbsp;&nbsp;"+uname)

    if(user.user_pic){
        $(".text-avatar").hide()
        $(".layui-nav-img").show().attr("src",user.user_pic)
    }else {
        $(".layui-nav-img").hide()
        $(".text-avatar").show().html(uname[0].toUpperCase())
    }
}