$(function(){
    let form = layui.form
    let layer = layui.layer
    initArtCateList()
    
    let indexAdd = null;
$(".btnAdd").on("click",function(){
    // console.log("ok");
    indexAdd = layer.open({
        type:1,
        area:['500px','250px'],
        content: $("#fpl_article").html(),
        title:"文章类别管理"
      });
})

$('body').on("submit","#formAdd",function(e){
    e.preventDefault()
    $.ajax({
        method:"POST",
        url:"/my/cate/add",
        data:$(this).serialize(),
        success:function(res){
            // console.log(res);
            if(res.code !== 0){
                return layer.msg("添加失败!")
            }
            initArtCateList()
            layer.msg("添加成功!")
            layer.close(indexAdd)
        }
    })
})
let indexEdit = null;
$("tbody").on("click",".btnEdit",function(){
    indexEdit = layer.open({
        area:['500px','250px'],
        type:1,
        content:$("#fpl_Edit").html(),
        title:'修改文章分类',
    })

    let id = $(this).attr("data-id")
    // console.log(id);
    $.ajax({
        method:"GET",
        url:"/my/cate/info?id="+id,
        success:function(res){
            // console.log(res);
            if(res.code !== 0 ){
                return layer.msg("信息获取失败!")
            }
            // layer.msg("信息获取成功!")
            form.val("formEdit", res.data);
        }
    })
})

$("body").on("submit","#formEdit",function(e){
    e.preventDefault()
    $.ajax({
        method:"PUT",
        url:"/my/cate/info",
        data:$(this).serialize(),
        success:function(res){
            // console.log(res);
            if(res.code !== 0){
                return layer.msg("更新失败!")
            }
            layer.msg("更新成功!")
            initArtCateList()
            layer.close(indexEdit)
        }
    })
})

$("tbody").on("click",".btnDelete",function(){
    // console.log("ok");
    let id = $(this).attr("data-id")
    $.ajax({
        method:"DELETE",
        url:"/my/cate/del?id="+id,
        success:function(res){
            // console.log(res);
            if(res.code !== 0){
                return layer.msg("删除失败!")
            }
            layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
                layer.msg("删除成功!")
                initArtCateList()
                layer.close(index);
              });
           
        }
    })
})




})

function initArtCateList(){
    $.ajax({
        method:"GET",
        url:"/my/cate/list",
        success:function(res){
            // console.log(res);
            if(res.code !== 0){
                return  layer.msg("信息获取失败!")
            }

            let htmlStr = template("fpl_table",res)
            $("tbody").html(htmlStr)
            
        }
    })
}