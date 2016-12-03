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
					//console.log(JSON.stringify(data));
					if(data.isOk){
						if(data.isComplete === true){
							$("#player_level").text("مرحله " + data.level);

        					$("#player_level").animate({fontSize: "30px" , opacity: '0.7'}, "slow");
							$("#player_level").animate({fontSize: "20px" , opacity: '1'}, "slow");

							engToPersian();
							
							resetGame();
							//console.log(data.board);
							paintArray(data.board);
						}
					}else{
						//gameOver!
						resetGame();
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
					//paintArray(game.board);
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
			location.reload();
        });
    });
})(jQuery);

;(function($) {
    $(function() {
        $('.rank_btn').bind('click', function(e) {
			data = {};
			$.ajax({
				type: 'POST',
				data: JSON.stringify(data),
				contentType: 'application/json',
				url: '/rank',
				success: function(data) {
					if(data.length > 0){
						$("#rank_1 #rank").html(data[0].rank);
						$("#rank_1 #rank_name").html(data[0].name);
						$("#rank_1 #rank_level").html(data[0].level);
					}

					if(data.length > 1){
						$("#rank_2 #rank").html(data[1].rank);
						$("#rank_2 #rank_name").html(data[1].name);
						$("#rank_2 #rank_level").html(data[1].level);
					}

					if(data.length > 2){
						$("#rank_3 #rank").html(data[2].rank);
						$("#rank_3 #rank_name").html(data[2].name);
						$("#rank_3 #rank_level").html(data[2].level);
					}

					if(data.length > 3){
						$("#rank_4 #rank").html(data[3].rank);
						$("#rank_4 #rank_name").html(data[3].name);
						$("#rank_4 #rank_level").html(data[3].level);
					}

					if(data.length > 4){
						$("#rank_5 #rank").html(data[4].rank);
						$("#rank_5 #rank_name").html(data[4].name);
						$("#rank_5 #rank_level").html(data[4].level);
					}

					console.log(user.studentId);
					if(user.studentId === undefined){
						$(".3noghte").hide();
						$("#rank_me").hide();
					}else{
						var flag = false;
						for(var i = 0 ; i < Math.min(data.length , 5) ; ++i){
							if(data[i].studentId === user.studentId){
								$("#rank_" + (i + 1)).css("color" , "green");
								flag = true;
							}
						}
						if(flag){
							 $(".3noghte").hide();
							 $("#rank_me").hide();
						}else{
							for(var i = 0 ; i < data.length ; ++i){
								if(data[i].studentId === user.studentId){
									$("#rank_me #rank").html(data[i].rank);
									$("#rank_me #rank_name").html(data[i].name);
									$("#rank_me #rank_level").html(data[i].level);
								}
							}
						}
					}

					engToPersian();
				}
			});


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
			//console.log(JSON.stringify(data));
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
					if(data.isOk){
						resetGame();
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
					}else{
						resetGame();
						var msg = data.message;
						$('.mypopup_message > p').text(msg);
						$('#message').bPopup({
							speed: 600,
							transition: 'slideUp',
							transitionClose: 'slideDown'
						});
					}
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

var engToPersian = function(){
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
}

var paintArray = function(arr){
	for(var i = 0 ; i < arr.length ; ++i){
		paint(arr[i]);
		//console.log(arr[i]);
	}
	setTimeout(function() {   //calls click event after a certain time
		resetGame();
	} , 3000);
	while(arr.length > 0) {
		arr.pop();
	}
}

var paint = function(x){
	++x;
	$(".dooz_box:nth-child("+ x +")").css("background-color" , "#8C7E51");
}