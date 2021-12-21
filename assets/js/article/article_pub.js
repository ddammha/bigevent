$(function(){
    let layer = layui.layer
    let form = layui.form
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')


    initCate()

    function initCate(){
        $.ajax({
            method:"GET",
            url:"/my/cate/list",
            success:function(res){
                // console.log(res);
                if(res.code !== 0){
                    return layer.msg("列表获取失败!")
                }

                let htmlStr = template("fpl_cate",res)
                $("[name = cate_id]").html(htmlStr)

                form.render()
                // location.href = "../../../article/article_list.html"
            }
        })
   }

    let art_state = "已发布"
    $("#artSave").on("click",function(){
        art_state = "草稿"
    })


    $("#btnChooseImg").on("click",function(){
        $("#coverFile").click()
    })
    
    let file = null

    $("#coverFile").on("change",function(e){
        let fileLists = e.target.files
        console.log(fileLists);
        if(fileLists.length === 0){
            file = null
            return layer.msg("图片上传失败!")
        }
        file = fileLists[0]

        var newImgURL = URL.createObjectURL(file)

        $image.attr("src",newImgURL)
    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        // let fd = new FormData($(this)[0])
        let fd = new FormData($(this)[0])
        for (var key of fd.keys()) {
            　console.log(key, fd.get(key));
        }
        fd.append("cover_img",file)
        fd.append("state",art_state)
        
        publishArticle(fd)
    })

    // function publishArticle(fd){
    //     $.ajax({
    //         method:'POST',
    //         url:"/my/article/add",
    //         data:fd,
    //         contentType:false,
    //         processData :false,
    //         success:function(res){
    //             console.log(res);
    //             if(res.code !== 0){
    //                 return layer.msg("上传失败!")
    //             }
    //             layer.msg("上传成功!")
    //         }
    //     })
    // }
    function publishArticle(fd){
        $.ajax({
            method:"POST",
            url:"/my/article/add",
            data:fd,
            contentType:false,
            processData :false,
            success:function(res){
                console.log(res);
                if(res.code !== 0){
                    return layer.msg("上传失败!")
                }
                layer.msg("上传成功!")

            }
        })
    }








})