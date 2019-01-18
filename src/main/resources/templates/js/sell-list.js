
$(document).ready(function(){

    /*点击左侧菜单大分类右边的加/减按钮*/
    $(".sidebar_icon").on("click",function(){ //hide_categories_box控制大类别菜单显隐
        if($(this).children("i").hasClass("plus_icon")){
            $(this).children("i").removeClass("plus_icon").parents(".sidebar").find(".hide_categories_box").slideDown(200);
        }else{
            $(this).children("i").addClass("plus_icon").parents(".sidebar").find(".hide_categories_box").slideUp(200);
        }
    })

    /*点击左侧菜单大分类下子分类右侧向右/向下箭头*/
    $(".side_jian_right").on("click",function(){
        if($(this).hasClass("side_jian_down")){
            /*$(this).removeClass("side_jian_down").parents("li").find("dl").removeClass("attribute_item");*/
            $(this).removeClass("side_jian_down").parents("li").find("dl").slideUp(200);
        }else{
            $(this).addClass("side_jian_down").parents("li").find("dl").slideDown(200);
        }
    })

    /*点击view more查看更多*/
    $(".view_more_btn").on("click",function(){  //hide_size_box控制尺码的显隐
        if($(this).parents(".sidebar").find(".hide_size_box").hasClass("view_more_content")){
            $(this).text("-View Less").parents(".sidebar").find(".hide_size_box").removeClass("view_more_content").addClass("view_less_content");
        }else{
            $(this).text("-View More").parents(".sidebar").find(".hide_size_box").removeClass("view_less_content").addClass("view_more_content");
        }

    })

    /*点击选择价格区间*/
    $(".price_range .check_item").on("click",function(){
        $(this).toggleClass("check_icon_select");
    })

    /*点击列表上方排序下拉列表*/
    $(".dropdown_toggle").on("click",function(event){
        $(this).children(".icon_jiantou_copy").toggleClass("icon_jiantou_up").parents(".sort_selector").find(".dropdown_menu").slideToggle(300);
        /*阻止事件冒泡*/
        stopPropagation(event);
    })
    /*点击排序下拉列表里子选项*/
    $('.j_dropsort_list').on("click",function(){
        $(".j_dropsort_title").text($(this).children("a").text());
        $(this).parents(".j_toggle_menu").find(".dropdown_toggle").trigger("click");
    })


    /*通用点击空白处隐藏*/
    $(document).bind("click",function(){
        if($(".icon_jiantou_copy").hasClass("icon_jiantou_up")){
            $(".dropdown_toggle").trigger("click");
        }
    })



})

/*阻止事件冒泡，兼容IE处理方案*/
function stopPropagation(e) {
    if (e.stopPropagation){
        /*stopPropagation符合W3C标准．适用于FireFox等浏览器，不支持IE*/
        e.stopPropagation();
    }else{
        /*cancelBubble方法不符合W3C的标准．且只支持IE浏览器*/
        e.cancelBubble = true;
    }
}
