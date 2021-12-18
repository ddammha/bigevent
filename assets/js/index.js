$(function(){
    getUserInfo()
    $("#userLogOut").on("click",function(){
        layer.confirm('确认退出登录吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token")
            location.href="../../login.html"
            layer.close(index);
          });
    })
   
    
    
})
function getUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        //header请求头配置对象
        // headers:{
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success:function(res){
            if(res.code !== 0){
                return console.log("用户信息获取失败!");
            }
            // console.log(res);
            //调用 renderAvatar 渲染用户头像
            renderUserMsg(res.data)
        },
    })
}
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

