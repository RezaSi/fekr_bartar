var arr = [[0 , 0 , 0] , [0 , 0 , 0], [0 , 0 , 0]];
var p = 1;
var prev = 0;

function resetGame(){
    $('.dooz_box').css("background-color" , "#999");
}


$(document).ready(function(){
    $('.dooz_box').on('click' , function(){
        if($(this).css("background-color") == "rgb(135, 118, 108)"){
            $(this).css("background-color" , "#8C7E51");

			var data = {};
			data.studentId = user.studentId;
			data.password = user.password;
			data.gameId = game.gameId;
			data.blockIndex = $(this).index();
			
			$.ajax({
				type: 'POST',
				data: JSON.stringify(data),
				contentType: 'application/json',
				url: '/checkSelect',
				success: function(data) {
					console.log(JSON.stringify(data));
					if(data.isOk){
						if(data.isComplete === true){
							$("#player_level").text("مرحله " + data.level);
							
							resetGame();
							//console.log(data.board);
							paintArray(data.board);
						}
					}else{
						//gameOver!
						var msg = data.message;
						$('.mypopup_message > p').text(msg);
						$('#message').bPopup({
							speed: 600,
							transition: 'slideUp',
							transitionClose: 'slideDown'
						});
					}



					var xx = 10;
					$(".meter > span").each(function() {
						$(this)
							.stop()
							.data("origWidth", $(this).width() / $(this).parent().width() * 100)
							.animate({
								width: (Math.min($(this).data("origWidth") + xx , 100)) + "%"
							}, 500);
					});
					paintArray(game.board);
				}
			});


        }
    });
})

$(document).ready(function(){
    $('.dooz_box').on('mouseover' , function(){
        if($(this).css("background-color") == "rgb(153, 153, 153)"){
            $(this).css("background-color" , "#87766C");
        }
    });
})

$(document).ready(function(){
    $('.dooz_box').on('mouseout' , function(){
        if($(this).css("background-color") == "rgb(135, 118, 108)"){
            $(this).css("background-color" , "#999");
        }
    });
})

// from index !

;(function($) {
    $(function() {
        $('#register_btn').bind('click', function(e) {
            $('#div_register').bPopup({
                speed: 600,
                transition: 'slideUp',
                transitionClose: 'slideDown'
            });
        });
    });
})(jQuery);

;(function($) {
    $(function() {
        $('#login_btn').bind('click', function(e) {
            $('#div_login').bPopup({
                speed: 600,
                transition: 'slideUp',
                transitionClose: 'slideDown'
            });
        });
    });
})(jQuery);


;(function($) {
    $(function() {
        $('#logout_btn').bind('click', function(e) {
			/*var msg = "شما با موفقیت خارج شدید!";
			x = 15;
			y = 0;

			$(".meter > span").each(function() {
				$(this)
					.stop()
					.data("origWidth", $(this).width() / $(this).parent().width() * 100)
					.animate({
						width: (75) + "%"
					}, 100);
			});

            $('.mypopup_message > p').text(msg);
			$('#message').bPopup({
                speed: 600,
                transition: 'slideUp',
                transitionClose: 'slideDown'
            });

			$("#player_name").text("رضا شیری");
			$("#player_level").text("مرحله 1");
			$("#top_nav2").hide();
			$("#top_nav").show();*/
			location.reload();
        });
    });
})(jQuery);

;(function($) {
    $(function() {
        $('.rank_btn').bind('click', function(e) {
            $('#div_rank').bPopup({
                speed: 600,
                transition: 'slideUp',
                transitionClose: 'slideDown'
            });
        });
    });
})(jQuery);


var saveUser = function() {
	var data = {};
	data.studentId = $("#studetId").val();
	data.name = $("#name").val();
	data.phone = $("#phone").val();
	data.password = $("#password").val();
	
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/saveUser',
		success: function(data) {
			$('#div_register').bPopup().close();
			$('.mypopup_message > p').text(data);
			$('#message').bPopup({
                speed: 600,
                transition: 'slideUp',
                transitionClose: 'slideDown'
            });
		}
	});
}

var checkLogin = function() {
	var data = {};
	data.studentId = $("#login_studetId").val();
	data.password = $("#login_password").val();
	
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/checkLogin',
		success: function(data) {
			console.log(JSON.stringify(data));
			$('#div_login').bPopup().close();

			var msg = "";
			
			if(data.isOk == "true"){
				user = data.user;
				msg = "شما با موفقیت وارد شدید!";
				$("#player_name").text(data.user.name);
				$("#top_nav").hide();
				$("#top_nav2").show();
			}else{
				msg = "شماره دانشجویی یا کلمه عبور اشتباه است.";
			}

			$('.mypopup_message > p').text(msg);
			$('#message').bPopup({
                speed: 600,
                transition: 'slideUp',
                transitionClose: 'slideDown'
            });
		}
	});
}


;(function($) {
    $(function() {
        $('#start_btn').bind('click', function(e) {
            var data = {};
			data.studentId = user.studentId;
			data.password = user.password;
			
			$.ajax({
				type: 'POST',
				data: JSON.stringify(data),
				contentType: 'application/json',
				url: '/newGame',
				success: function(data) {
					game = data.game;
					x = 0;
					y = 1;
					$(".meter > span").each(function() {
						$(this)
							.stop()
							.data("origWidth", $(this).width() / $(this).parent().width() * 100)
							.animate({
								width: (95) + "%"
							}, 50);
					});
					paintArray(game.board);
				}
			});
        });
    });
})(jQuery);

$(document).change(function(){
    persian={0:'۰',1:'۱',2:'۲',3:'۳',4:'۴',5:'۵',6:'۶',7:'۷',8:'۸',9:'۹'};
	function traverse(el){
		if(el.nodeType==3){
			var list=el.data.match(/[0-9]/g);
			if(list!=null && list.length!=0){
				for(var i=0;i<list.length;i++)
					el.data=el.data.replace(list[i],persian[list[i]]);
			}
		}
		for(var i=0;i<el.childNodes.length;i++){
			traverse(el.childNodes[i]);
		}
	}
    traverse(document.body);
});

$(document).ready(function(){
    persian={0:'۰',1:'۱',2:'۲',3:'۳',4:'۴',5:'۵',6:'۶',7:'۷',8:'۸',9:'۹'};
	function traverse(el){
		if(el.nodeType==3){
			var list=el.data.match(/[0-9]/g);
			if(list!=null && list.length!=0){
				for(var i=0;i<list.length;i++)
					el.data=el.data.replace(list[i],persian[list[i]]);
			}
		}
		for(var i=0;i<el.childNodes.length;i++){
			traverse(el.childNodes[i]);
		}
	}
    traverse(document.body);
});


var paintArray = function(arr){
	for(var i = 0 ; i < arr.length ; ++i){
		paint(arr[i]);
		console.log(arr[i]);
	}
	setTimeout(function() {   //calls click event after a certain time
		resetGame();
	} , 3000);
	while(arr.length) {
		arr.pop();
	}
}

var paint = function(x){
	++x;
	$(".dooz_box:nth-child("+ x +")").css("background-color" , "#8C7E51");
}