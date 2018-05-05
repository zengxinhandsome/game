
	// �����ʼ��Ϸ--> startPage��ʧ --> ��Ϸ��ʼ
	// �������ʳ����������߿�ʼ�˶�
	// �������� --> �ı䷽���˶�
	// �ж��Ƿ�Ե�ʳ�� --> ʳ����ʧ���߼�һ
	// �ж���Ϸ����������������

	var content = document.getElementById('content');
	var startPage = document.getElementById('startPage');
	var scoreBox = document.getElementById("score");
	var lose = document.getElementById("lose")
	var loserScore = document.getElementById("loserScore");
	var close = document.getElementById("close");
	var startBtn = document.getElementById("startBtn");	// ��ʼ��Ϸ��ť
	var snakeMove;
	var speed = 100;
	var startGameBool = true;
	var startPauseBool = true;
	init();
	function init(){
		// ��ͼ
		this.mapW = parseInt(getComputedStyle(content,null).width);
		this.mapH = parseInt(getComputedStyle(content,null).height);
		this.mapDiv = content;
		// ʳ��
		this.foodW = 20;
		this.foodH = 20;
		this.foodX = 0;
		this.foodY = 0; 
		// ��
		this.snakeW = 20;
		this.snakeH = 20;
		this.snakeBody = [[3,1,"head"],[2,1,"body"],[1,1,"body"]];
		// ��Ϸ����
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
			this.mapDiv.appendChild(snake).classList.add("snake");		// �ߵ�ÿ���ڵ����class���Ա�Ե�ʳ��ɾ���������µ���
			switch(this.direction){		// �ı���ͷ�ķ���
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
			this.snakeBody[i][0] = this.snakeBody[i - 1][0];	// �ú�һ��������ǰһ��
			this.snakeBody[i][1] = this.snakeBody[i - 1][1];
		}
		switch(this.direction){
			case "right":
			this.snakeBody[0][0] ++;	// 	���ҵ�ʱ���� X ��������
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
		removeClass("snake");		// �ƶ���ʱ��ɾ���ߵ����нڵ�
		snake();					// �����ƶ�����µ���
		if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){	// �Ե�ʳ��
			var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];	// ��ȡ���һ���ڵ������
			var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
			switch(this.direction){
			case "right":
				this.snakeBody.push([snakeEndX - 1,snakeEndY,"body"]);		// �Ե�ʳ������ӽڵ�
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
		if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW/20){	// ײ�����ҵ�ǽ
			reloadGame();
		}
		if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH/20){	// ײ�����µ�ǽ
			reloadGame();
		}
		var snakeHeadX = this.snakeBody[0][0];
		var snakeHeadY = this.snakeBody[0][1];
		for(var i = 1; i < this.snakeBody.length; i ++){		// ײ���Լ�
			if(snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]){
				reloadGame();
			}
		}
	}
	function reloadGame(){
		removeClass("snake");
		removeClass("food");
		clearInterval(snakeMove);
		this.snakeBody = [[3,1,"head"],[2,1,"body"],[1,1,"body"]];	//���¿�ʼ��Ϸ��ʱ���ʼ����
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
	function removeClass(className){							// �Ƴ�����classΪclassName�ڵ�
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