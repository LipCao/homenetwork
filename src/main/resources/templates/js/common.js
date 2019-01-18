$(function(){
	// 搜索框效果
	$('.home .top .search img').click(function(){
		$('.search_input').show();
		$(this).css({'left':'unset','right':'165px'});
	});	

   // menu菜单
    $('.menu_new').hover(function(){
        $(this).find('.menu_tab').show();
        $(this).one('mouseover',function(){
                /!*var menu_bigsrc = $(this).find(".menuimglazy").attr('data-original');*!/
                setTimeout(function(){
                    /!*$(this).find(".menuimglazy").attr('src',menu_bigsrc);*!/
                    $('.menuimglazy').lazyload({
                        effect: "fadeIn"
                   });
            },100)
        });
     },function(){
        $(this).find('.menu_tab').hide();
    });

    // 运费弹窗
    $('.text-center').click(function(){
      $('.home_bg,.home_shipping').show();
    })
    $('.home_shipping .home_shipping_close').click(function(){
      $('.home_bg,.home_shipping').hide();
    });
    $('.register_tc button').mouseout(function(){
    $(this).css('color','#fff');
    });

  // 注册用户名验证              
  $('input[name="name"]').focus(function(){
      $('input[name="name"]').val('');
  }).blur(function(){
      var name = $('input[name="name"]').val();
      if(name == ''){
          $('.register_tc .s1').text('require').show();
      }          
  });
  // 注册邮箱验证
  $('input[name="email"]').focus(function(){
      $('input[name="email"]').val('');
  }).blur(function(){
      var email = $('input[name="email"]').val();
      if(email == ''){
          $('.register_tc .s2').text('require').show();
      }else{
          var myemail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if(email.search(myemail)==-1){
              $('.register_tc .s2').text('Please enter the correct information').show();
          }
      }               
  });
  // 注册密码验证
  $('input[name="password"]').focus(function(){
      $('input[name="password"]').val('');
  }).blur(function(){
      var password = $('input[name="password"]').val();        
      if(password == ''){
          $('.register_tc .s3').text('require').show();
      }else{
          var mypsword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,12}$/;
          if(mypsword.test(password) == false){
              $('.register_tc .s3').text('Please enter the correct information').show();
          }
      }            
  });

})