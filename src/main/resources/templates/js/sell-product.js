
$(document).ready(function(){
    /*size尺码点击切换*/
    $(".ul_sku_list li").on("click",function(){
        if(!$(this).hasClass("n_active")){
            $(this).siblings("li").removeClass("sheet_active").end().addClass("sheet_active");
        }
    })

    /*Description商品描述问答部分点击tab切换*/
    $(".detail_main_bar li").on("click",function(event){
        var index = $(this).index();
        var liOffsetTop = $(this).offset().top;
        $(this).siblings("li").removeClass("bar_active").end().addClass("bar_active");
        $(this).parents(".sheet_detail_main").find(".bar_content").eq(index).scrollTop(liOffsetTop);
    })
})

var showLi = true;
function showOtherElem(obj,e) {
    if (showLi) {
        var span_arr = $(obj).clone(true);
        $(obj).parent().siblings().slideDown(300);
        $(obj).parent().siblings().last().prepend(span_arr);
        $(obj).remove();
        $('.style_span').find('i').addClass('rotate_180');
        showLi = false;
    } else {
        var span_arr = $(obj).clone(true);
        $(obj).parents('ul').find('li').eq(3).prepend(span_arr);
        $(obj).parents('ul').find('li:gt(3)').slideUp(300);
        $(obj).remove();
        $('.style_span').find('i').removeClass('rotate_180');
        showLi = true;
    }
    var e = e||event||window.event;
    stopPropagation(e);
}



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





