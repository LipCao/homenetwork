$(document).ready(function(){
    //获取数据
    var catid=GetRequestParam("catid");
    var keyword=GetRequestParam("keyword");
    var pageSize=GetRequestParam("pageSize");
    searchFurnitureGoods(catid,keyword,pageSize,1);
    loadRangePrice(catid,keyword);
    /*点击列表上方排序下拉列表*/
    $(".dropdown_toggle").on("click",function(event){
        console.log($(this))
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
});

function GetRequestParam(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return("");
}


function searchFurnitureGoods(catid,word,pageSize,page){
    var price1=$("#search_price_from").val();
    var price2=$("#search_price_to").val();
    var sort=$("#sort").val();
    $.ajax({
        type:"post",
		dataType:"json",
        url:"https://www.import-express.com/searchFurnitureGoods",
        data:{"catid":catid,"keyword":word,"pageSize":pageSize,"page":page,"price1":price1,"price2":price2,"srt":sort},
        success:function(result){
            $(".products_content").html("");
            $("#sidebarTree").html("");
            $(".page_box").html("");
            var homeData=result.goodslist;
            //总条数
            var allNum=result.param.recordCount;
            var size=result.param.pageSize;
            var aUlBox=$('.sell ');
            if(homeData){
                var pages=0;
                if(size){
                    pages=Math.ceil(allNum/size);
                }else{
                    pages=Math.ceil(allNum/60);
                }
                var html="";
                if(page==1){
                     html+=" <span class='ui_pagination_prev ui_pagination_disabled'>pre</span>&nbsp;";
                }else if(page>1){
                    html+=" <span class='ui_pagination_prev ui_pagination_disabled' onclick='searchFurnitureGoods(\""+catid+"\",\""+word+"\",\""+pageSize+"\",\""+(Number(page)-1)+"\");'>pre</span>&nbsp;";
                }
                if(pages<=9){
                    for(var i=1;i<=pages;i++){
                        if(i==page){
                            html+=" <span class='ui_pagination_active'>"+i+"</span>&nbsp;";
                        }else{
                            html+="<a href='javascript:searchFurnitureGoods(\""+catid+"\",\""+word+"\",\""+pageSize+"\",\""+i+"\");'>"+i+"</a>&nbsp;";
                        }
                    }
                }else{
                    for(var i=page;i<=6+Number(page) && i<pages;i++){
                        if(i==page){
                            html+=" <span class='ui_pagination_active'>"+i+"</span>&nbsp;";
                        }else{
                            html+="<a href='javascript:searchFurnitureGoods(\""+catid+"\",\""+word+"\",\""+pageSize+"\",\""+i+"\");'>"+i+"</a>&nbsp;";
                        }
                    }
                    if(page<pages){
                        html+="<span class='page_omit'>...</span>";
                    }
                    html+="<a href='javascript:searchFurnitureGoods(\""+catid+"\",\""+word+"\",\""+pageSize+"\",\""+pages+"\");'>"+pages+"</a>&nbsp;";
                }
                if(page==pages){
                    html+="<a class='page_next ui_pagination_next'>next</a>";
                }else{
                    html+="<a class='page_next ui_pagination_next' href='javascript:searchFurnitureGoods(\""+catid+"\",\""+word+"\",\""+pageSize+"\",\""+(Number(page)+1)+"\");'>next</a>";
                }
                $(".page_box").html(html);
                var  str="<ul class='sell clearfix'>";
                //产品集
                for(var i=0;i<homeData.length;i++){
                    str+="<li class='product_item qwe-lg-5 qwe-xs-10'>";
                    str+="<div class='p_item'>";
                    str+="<div class='p_img_border'>";
                    str+="<div class='p_pic'>";
                    str+="<a href='"+homeData[i].goods_url+"' target='_blank'>";
                    str+="<img src='"+homeData[i].goods_image+"' alt=''>";
                    str+="<ul class='sell clearfix'></a></div></div><div class='p_goods_name'><a href='"+homeData[i].goods_url+"'>"+homeData[i].goods_name+"</a></div><div class='p_goods_price'>";
                    str+="<span class='p_price_unit'>$</span><span class='p_price_num'>"+homeData[i].goods_price+"</span>";
                    str+="</div><div class='p_goods_shipping'><i></i> <span class='p_price_num'>Free Shipping</span></div><div class='prefer_sell'><span>SALE</span></div></div> </li>";
                }
                str+="</ul>";
                $(".products_content").html(str);
                //左侧类别树
                var rootTree=result.rootTree;
                var tree="<div class='sidebar_name'>";
                tree+="<span>CATEGORIES</span><em class='sidebar_icon'><i></i></em></div>";
                tree+=" <ul class='hide_categories_box sidebar_list'>";
                for(var i=0;i<rootTree.length;i++){
                    tree+="<li>";
                    tree+="<dt><a href='javascript:searchFurnitureGoods(\""+rootTree[i].cid+"\",\""+word+"\",\""+pageSize+"\",1)''>"+rootTree[i].category.replace("'","")+"</a><i class='side_jian_right side_jian_down'></i></dt>";
                    tree+="<dl class='attribute_item'><dd class='commen_select_box'>";
                    var child=rootTree[i].childens;
                    if(child.length>0){
                        tree+="<ol class='commen_select'>";
                    }
                    for(var j=0;j<child.length;j++){
                        tree+="<li><a href='javascript:searchFurnitureGoods(\""+child[j].cid+"\",\""+word+"\",\""+pageSize+"\",1)'>"+child[j].category.replace("'","")+"</a></li>";
                        if(child.length>5 && j==4){
                            break;
                        }
                    }
                    if(child.length>5){
                        tree+="<ol class='commen_select_more hide_size_box view_more_content'>";
                        for(var i=5;i<child.length;i++){
                            tree+="<li><a href='javascript:searchFurnitureGoods(\""+child[i].cid+"\",\""+word+"\",\""+pageSize+"\",1)'>"+child[i].category.replace("'","")+"</a></li>";
                        }
                        tree+=" </ol>";
                    }
                    if(child.length>0){
                        tree+="</ol>";
                    }
                    tree+="</dd>";
                    if(child.length>5){
                        tree+="<dd class='view_more_box'>";
                        tree+="<a class='view_more_btn' href='javascript:void(0);'>+View More</a>";
                        tree+="</dd>";
                    }
                    tree+="</dl></li>";
                }
                tree+="</ul>";
                $("#sidebarTree").html(tree);
                //面包屑导航
                var navigation=result.navigation;
                $(".crumbs_list").html(navigation);
                click();
            }else{
                aUlBox.html('<li class="no_product">NO PRODUCT</li>');
            }
        }
    })
}

function onchangeSort(sort){
    $("#sort").val(sort);
    var catid=GetRequestParam("catid");
    var keyword=GetRequestParam("keyword");
    var pageSize=GetRequestParam("pageSize");
    searchFurnitureGoods(catid,keyword,pageSize,1);
}

function loadRangePrice(catid,keyword){
    var flagRange=GetRequestParam('flagRange')
    var pageSize=GetRequestParam("pageSize");
    $("#hide_categories_range").html("");
    $.ajax({
        type : "post",
		dataType:"json",
        url : "https://www.import-express.com/loadRangePrice",
        data : {"catid":catid,"keyword":keyword,"price1":"","price2":"","flagRange":flagRange},
        success : function(data) {
            if(data.goodsPriceRange){
                var _html="<ul class='price_range'>";
                var section1_price=data.goodsPriceRange.section1_price;
                var section2_price=data.goodsPriceRange.section2_price;
                var section3_price=data.goodsPriceRange.section3_price;
                _html+="<li class='check_item'>";
                _html+="<label><input class='check_icon' type='radio' onclick='clickPrice(\""+""+"\",\""+section1_price+"\");' name='RadioGroup1'/>$0 - $"+section1_price+"</label></li>";
                _html+="<li class='check_item'>";
                _html+="<label><input class='check_icon' type='radio' onclick='clickPrice(\""+section1_price+"\",\""+section2_price+"\");' name='RadioGroup1'/>$"+section1_price+" - $"+section2_price+"</label></li>\n";
                _html+="<li class='check_item'>";
                _html+="<label><input class='check_icon' type='radio' onclick='clickPrice(\""+section2_price+"\",\""+section3_price+"\");' name='RadioGroup1'/>$"+section2_price+" - $"+section3_price+"</label></li>\n";
                _html+="<li class='check_item'>";
                _html+="<label><input class='check_icon' type='radio' onclick='clickPrice(\""+section3_price+"\",\""+""+"\");' name='RadioGroup1'/>$"+section3_price+" - ~</label></li>";
                _html+="<div class='search_range'><em>$</em>";
                _html+="<input class='low_price' type='text' tabindex='20' name='minPrice' id='search_price_from' autocomplete='off' price-range-from='' value='' placeholder='min'>";
                _html+="<em>to $</em>";
                _html+="<input class='high_price' type='text' tabindex='20' name='maxPrice' id='search_price_to' autocomplete='off' price-range-to='' value='' placeholder='max'>";
                _html+="<a href='javascript:toRangePrice()' class='go_search_btn'>Go</a>";
                $("#hide_categories_range").html(_html);
            }
        }
    });
}

function clickPrice(price1,price2){
    $("#search_price_from").val(price1);
    $("#search_price_to").val(price2);
    var catid=GetRequestParam("catid");
    var keyword=GetRequestParam("keyword");
    var pageSize=GetRequestParam("pageSize");
    searchFurnitureGoods(catid,keyword,pageSize,1);
}

function toRangePrice(){
    var catid=GetRequestParam("catid");
    var keyword=GetRequestParam("keyword");
    var pageSize=GetRequestParam("pageSize");
    searchFurnitureGoods(catid,keyword,pageSize,1);
}

function click(){
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

