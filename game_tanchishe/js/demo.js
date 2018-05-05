
	// 点击开始游戏--> startPage消失 --> 游戏开始
	// 随机出现食物，出现三节蛇开始运动
	// 上下左右 --> 改变方向运动
	// 判断是否吃到食物 --> 食物消失，蛇加一
	// 判断游戏结束，弹出分数框

	var content = document.getElementById('content');
	var startPage = document.getElementById('startPage');
	var scoreBox = document.getElementById("score");
	var lose = document.getElementById("lose")
	var loserScore = document.getElementById("loserScore");
	var close = document.getElementById("close");
	var startBtn = document.getElementById("startBtn");	// 开始游戏按钮
	var snakeMove;
	var speed = 100;
	var startGameBool = true;
	var startPauseBool = true;
	init();
	function init(){
		// 地图
		this.mapW = parseInt(getComputedStyle(content,null).width);
		this.mapH = parseInt(getComputedStyle(content,null).height);
		this.mapDiv = content;
		// 食物
		this.foodW = 20;
		this.foodH = 20;
		this.foodX = 0;
		this.foodY = 0; 
		// 蛇
		this.snakeW = 20;
		this.snakeH = 20;
		this.snakeBody = [[3,1,"head"],[2,1,"body"],[1,1,"body"]];
		// 游戏属性
		this.direction = "right";
		this.left = false;
		this.right = false;
		this.up = true;
		this.down = true
		this.score = 0;
		bindEvent();
	}
	function startGame(){
		startPage.style.display = "none";
		// startP.style.display = "block";
		food();
		snake();
		snakeMove = setInterval(function (){
			move();
		},speed);
	}
	function food(){
		var food = document.createElement("div");
		food.style.width = this.foodW + "px";
		food.style.height = this.foodH + "px";
		food.style.position = "absolute";
		this.foodX = Math.floor(Math.random() * (this.mapW/20));
		this.foodY = Math.floor(Math.random() * (this.mapH/20));
		food.style.left = (this.foodX) * 20 + "px";
		food.style.top = (this.foodY) * 20 + "px";
		food.setAttribute("class","food");
		this.mapDiv.appendChild(food);
	}
	function snake(){
		for(var i = 0;i < this.snakeBody.length; i++){
			var snake = document.createElement("div");
			snake.style.width = this.snakeW + "px";
			snake.style.height = this.snakeH + "px";
			snake.style.position = "absolute";
			snake.style.left = this.snakeBody[i][0] * 20 + "px";
			snake.style.top = this.snakeBody[i][1] * 20 + "px";
			// snake.classList.add(this.snakeBody[i][2]);				// className 
			snake.className = this.snakeBody[i][2];
			this.mapDiv.appendChild(snake).classList.add("snake");		// 蛇的每隔节点加上class，以便吃到食物删除，构建新的蛇
			switch(this.direction){		// 改变蛇头的方向
				case "right":
					break;
				case "left":
					snake.style.transform = "rotate(180deg)";		
					break;
				case "up":
					snake.style.transform = "rotate(270deg)";
					break;
				case "down":
					snake.style.transform = "rotate(90deg)";
					break;
				default :
					break;
			}
		}
	}
	function move(){
		for(var i = snakeBody.length - 1;i > 0; i--){		
			this.snakeBody[i][0] = this.snakeBody[i - 1][0];	// 让后一个紧跟着前一个
			this.snakeBody[i][1] = this.snakeBody[i - 1][1];
		}
		switch(this.direction){
			case "right":
			this.snakeBody[0][0] ++;	// 	向右的时候让 X 坐标增加
			break;
			case "left":
			this.snakeBody[0][0] --;
			break;
			case "up":
			this.snakeBody[0][1] --;
			break;
			case "down":
			this.snakeBody[0][1] ++;
			break;
			default :
			break;
		}
		removeClass("snake");		// 移动的时候删除蛇的所有节点
		snake();					// 构建移动后的新的蛇
		if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){	// 吃到食物
			var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];	// 获取最后一个节点的坐标
			var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
			switch(this.direction){
			case "right":
				this.snakeBody.push([snakeEndX - 1,snakeEndY,"body"]);		// 吃到食物后增加节点
				break;
			case "left":
				this.snakeBody.push([snakeEndX + 1,snakeEndY,"body"]);
				break;
			case "up":
				this.snakeBody.push([snakeEndX ,snakeEndY + 1,"body"]);
				break;
			case "down":
				this.snakeBody.push([snakeEndX ,snakeEndY - 1,"body"]);
				break;
			default :
				break;
			}
			removeClass("snake");
			snake();
			this.score ++;
			scoreBox.innerHTML = this.score;
			removeClass("food");
			food();
		}
		if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW/20){	// 撞到左右的墙
			reloadGame();
		}
		if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH/20){	// 撞到上下的墙
			reloadGame();
		}
		var snakeHeadX = this.snakeBody[0][0];
		var snakeHeadY = this.snakeBody[0][1];
		for(var i = 1; i < this.snakeBody.length; i ++){		// 撞到自己
			if(snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]){
				reloadGame();
			}
		}
	}
	function reloadGame(){
		removeClass("snake");
		removeClass("food");
		clearInterval(snakeMove);
		this.snakeBody = [[3,1,"head"],[2,1,"body"],[1,1,"body"]];	//重新开始游戏的时候初始化蛇
		this.direction = "right";		
		this.left = false;
		this.right = false;
		this.up = true;
		this.down = true
		lose.style.display = "block";
		loserScore.innerHTML = this.score;
		this.score = 0;
		scoreBox.innerHTML = this.score;
	}
	function removeClass(className){							// 移除所有class为className节点
		var ele = document.getElementsByClassName(className);
		while(ele.length > 0){
			ele[0].parentNode.removeChild(ele[0]);		
		}
	}
	function setDirection(code){
		switch(code){
			case 37:
			if(this.left){
				this.direction = "left";
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
			case 38:
			if(this.up){
				this.direction = "up";
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
			case 39:
			if(this.right){
				this.direction = "right";
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
			case 40:
			if(this.down){
				this.direction = "down";
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
			default: 
			break;
		}
	}
	function bindEvent(){
		document.onkeydown = function (e){
			var code = e.keyCode;
			setDirection(code);
		}
		close.onclick = function (){
			lose.style.display = "none";
			startPage.style.display = "block";
			this.score = 0;
		}
		startBtn.onclick = function (){
			startGame();
		}
	}