var mongoose = require('mongoose'); 

var Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

exports.index = function (req, res) {
	res.render('main');
}

exports.users = function (req, res) {
	mongoose.model("users").find(function(err , users){
		//console.log(users);
		res.send(users);
	});
}

exports.newUser = function (req, res) {
	var newUser = new user(req.body);

	mongoose.model("users").find({studentId: newUser.studentId} , function(err , users){
		if(users.length != 0){
			//console.log("registered before!");
			res.send("این شماره دانشجویی قبلا ثبت شده است!");
		}else{
			newUser.save(function(err){
				if(err){
					console.log("error , user not saved!");
				}else{
					//console.log("saved success!");
					res.send("ثبت نام شما با موفقیت انجام شد!");
				}
			});
		}
	});
}

exports.checkLogin = function (req, res) {
	var newUser = new user(req.body);

	mongoose.model("users").find({studentId: newUser.studentId , password: newUser.password} , function(err , users){
		data = {};
		if(users.length != 0){
			data.isOk = "true";

			data.user = users[0];
			
			res.send(data);
		}else{
			data.isOk = "false";
			data.user = newUser;
			res.send(data);
		}
	});
}

exports.newGame = function (req, res) {
	var newUser = new user(req.body);

	mongoose.model("users").find({studentId: req.body.studentId , password: req.body.password} , function(err , users){
		data = {};
		if(users.length != 0){
			mongoose.model("games").find({studentId: req.body.studentId} , function(err , games){
				if(games.length > 4){
					data.isOk = false;
					data.message = "شما حداکثر تعداد بازی خود را انجام داده اید!";
					res.send(data);
				}else{
					//create new game
					var rnd = randomInt(0 , 24);
					var newGame = new game({studentId: req.body.studentId , board: [rnd] , gameId: games.length});
					newGame.save(function(err , product){
						if(err){
							data.isOk = "false";
							//console.log("error , game cant create!" + err);
							res.send(data);
						}else{
							//console.log(product);
							data.isOk = "true";
							data.message = "بازی با موفقیت ایجاد شد!";
							//console.log("newGame Created!");
							data.game = {studentId: req.body.studentId , board: [rnd] , gameId: product._id.toString()};
							res.send(data);
						}
					});
				}
			});
		}else{
			data.isOk = "false";
			data.message = "چنین کاربری پیدا نشد!";
			res.send(data);
		}
	});
}

exports.checkSelect = function (req, res) {
	var blockIndex = req.body.blockIndex;
	//console.log(req.body);

	mongoose.model("users").find({studentId: req.body.studentId , password: req.body.password} , function(err , users){
		data = {};
		if(users.length != 0){
			user_ = users[0];
			mongoose.model("games").find({} , function(err , games){
				if(games[games.length - 1].isOver === 1){
					
					data.isOk = false;
					data.message = "این بازی تمام شده است! ... برای شروع بازی جدید روی شروع بازی کلیک کنید!";
					res.send(data);
				}else{
					//game not over;

					//console.log(games[games.length - 1].board + " " + req.body.blockIndex);
					var indexI = games[games.length - 1].board.indexOf(req.body.blockIndex);

					if(indexI > -1){
						data.isOk = true;
						games[games.length - 1].board.splice(indexI , 1);

						if(games[games.length - 1].board.length === 0){
							data.isComplete = true;
							games[games.length - 1].level = games[games.length - 1].level + 1;
							data.level = games[games.length - 1].level;
							//generate new random game with length level + 1 . .. . .. .
							var newBoard = [];
							for(var i = 0 ; i < Math.min(games[games.length - 1].level , 15) ; ++i){
								var rnd = randomInt(0 , 24);
								if(newBoard.indexOf(rnd) === -1){
									newBoard[newBoard.length] = rnd;
								}else --i;
							}
							data.board = newBoard;
							games[games.length - 1].board = newBoard;

						}else{
							data.isComplete = false;
							data.level = games[games.length - 1].level;
						}

						mongoose.model("games").update({
							studentId: user_.studentId , 
							gameId: games[games.length - 1].gameId}, 
							{
								$set: {board:games[games.length - 1].board , 
									level:games[games.length - 1].level
								}
							} , function(err , product){
							if(err) console.log(err);
							//console.log(product);
						});
						res.send(data);
					}else{
						data.isOk = false;
						data.message = "خانه اشتباه انتخاب کردی! ... باختی :'(";

						mongoose.model("games").update({
							studentId: user_.studentId , 
							gameId: games[games.length - 1].gameId}, 
							{
								$set: {isOver: 1}
							} , function(err , product){
							if(err) console.log(err);
							//console.log(product);
						});

						mongoose.model("users").update(
							{studentId: req.body.studentId , password: req.body.password}, 
							{
								$set: {level: games[games.length - 1].level}
							} , function(err , product){
							if(err) console.log(err);
							//console.log(product);
						});

						res.send(data);
					}
				}
			});
		}else{
			data.isOk = "false";
			data.message = "چنین کاربری پیدا نشد!";
			res.send(data);
		}
	});
}

exports.rank = function (req, res) {
	var rank_users = [];

	mongoose.model("users").find().sort([['level', 'descending']]).exec(function (err , users) {
		for(var i = 0 ; i < users.length; ++i){
			rank_users[i] = {rank: (i + 1) , studentId: users[i].studentId , name: users[i].name , level: users[i].level};
		}
		//console.log(rank_users);
		res.send(rank_users);
	});
}

exports.badRequest = function (req, res) {
	res.render('404');
}
