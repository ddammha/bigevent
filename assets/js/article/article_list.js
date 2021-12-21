$(function(){
    let layer = layui.layer
    let form =layui.form
    let laypage= layui.laypage

    let p = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }

    template.defaults.imports.dateFormate = function(date){
        let dt = new Date(date)
        let Y = dt.getFullYear()
        let M = padZero(dt.getMonth()+1)
        let D = padZero(dt.getDate())
        let h = padZero(dt.getHours())
        let m = padZero(dt.getMinutes())
        let s = padZero(dt.getSeconds())

        function padZero(date){
          return  date<10?'0'+date:date; 
        }

        return `${Y}-${M}-${D} ${h}:${m}:${s}`
    }

    initTable()
    initCate()

    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        let cate_id = $("[name = cate_id]").val()
        let state = $("[name = state]").val()
        p.cate_id = cate_id
        p.state = state
        initTable()
    })
    
    $("tbody").on("click",".btnDelete",function(){
        let id = $(this).attr("data-id")
        let len = $(".btnDelete").length
        console.log(len);
        layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:"DELETE",
                url:"/my/article/info?id="+id,
                success:function(res){
                    console.log(res);
                    if(res.code !== 0){
                        return layer.msg("删除失败!")
                    }
                    layer.close(index);
                    layer.msg("删除成功!")
                    if(len === 1){
                        p.pagenum = p.pagenum==1? 1: p.pagenum-1;
                    }
                    initTable()
                }
            })
          });
        
    })



    function initTable(){
        $.ajax({
            method:"GET",
            url:"/my/article/list",
            data:p,
            success:function(res){
                // console.log(res);
                if(res.code !== 0){
                    return layer.msg("获取失败!")
                }
                let htmlStr = template("fpl_table",res)
                $("tbody").html(htmlStr)

                renderPage(res.total)
            }
        })
    }

    function initCate(){
        $.ajax({
            method:"GET",
            url:"/my/cate/list",
            success:function(res){
                if(res.code !== 0){
                    return layer.msg("列表获取失败!")
                }

               let htmlStr= template("fpl_cate",res)
               $("[name = cate_id]").html(htmlStr)
               form.render()

            }
        })
    }

    function renderPage(total){
        laypage.render({
            elem: "pageBox", //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            curr:  p.pagenum,
            layout:['limit','prev', 'page', 'next'],
            limit:p.pagesize,
            limits:[2, 3, 5, 10],
            jump:function(obj,first){
                p.pagenum = obj.curr
                p.pagesize = obj.limit
                if(!first){
                    initTable()
                }
            }
          });
    }
})
