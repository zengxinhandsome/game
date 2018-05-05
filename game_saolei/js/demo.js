var box = document.getElementsByClassName("box")[0];
	var begin = document.getElementsByClassName('begin')[0];
	var close = document.getElementsByClassName("close")[0];
	var fail = document.getElementsByClassName("fail")[0];
	var failImg = document.getElementsByClassName("failImg")[0];
	var block;	
	var mineNum;		// 总的雷的数量
	var mineOver;		// 剩余雷的数量
	var mineMap = [];

	bindEvent();
	function bindEvent(){
		begin.onclick = function (){
			this.style.display = "none";
			box.style.display = "block";
			init();
		}
		box.oncontextmenu = function (){
			return false;
		}
		box.onmousedown = function (e){
			var event = e || window.event;
			var target = event.target;
			if(event.button == 0){
				leftClick(target);
			}else if(event.button == 2){
				rightClick(target);
			}
		}
		close.onclick = function (){
			fail.style.display = "none";
			box.style.display = "none";
			box.innerHTML = "";
			begin.style.display = "block";
		}
	}

	function init(){
		mineNum = 10;
		mineOver = 10;
		for(var i = 0;i < 10; i ++){
			for(var j = 0;j < 10;j ++){
				var con = document.createElement("div");		// 创建单元格
				con.classList.add("block");
				con.setAttribute("id",i + "-" + j);		// 每个单元格的id是它的位置
				box.appendChild(con);
				mineMap.push({mine : 0});		// 这个数组用来判断生成的雷有没有重复
			}
		}
		block = document.getElementsByClassName("block");	// 获取到所有单元格的集合
		while(mineNum){
			var mineIndex = Math.floor(Math.random()*100);		// 生成0-99的一个随机数
			if(mineMap[mineIndex].mine === 0){
				block[mineIndex].classList.add("islei");			// 随机生成的雷加一个class
				mineMap[mineIndex].mine = 1;
				mineNum --;
			}
		}
	}

	function leftClick(dom){
		var islei = document.getElementsByClassName('islei');
		if(dom.classList.contains("flag")){
			return;
		}
		if(dom && dom.className.indexOf("islei")!= -1){		 // 点到雷	
			for(var i = 0;i < islei.length; i ++){
				islei[i].classList.add("show");		// 让所有雷显示
			}
			setTimeout(function (){
				fail.style.display = "block";
				failImg.style.backgroundImage = 'url(img/gameOver.jpg)';
			},500);
		}else{
			var n = 0;
			var posArr = dom && dom.getAttribute("id").split("-");	
			var posX = posArr && parseInt(posArr[0]);
			var posY = posArr && parseInt(posArr[1]);
			dom.classList.add("num");
			for(var i = posX - 1; i <= posX + 1;i ++){
				for(var j = posY - 1; j <= posY + 1; j ++){		// 遍历周围的8个格子
					var aroundBox = document.getElementById(i + '-' + j);
					if(aroundBox && aroundBox.className.indexOf("islei") != -1){
						n++;
					}
				}
			}
			dom && (dom.innerHTML = n);
			if(n == 0){
				for(var i = posX - 1; i <= posX + 1;i ++){
					for(var j = posY - 1; j <= posY + 1; j ++){		// 遍历周围的8个格子
						var nearBox = document.getElementById(i + '-' + j);
						if(nearBox && nearBox.length != 0){
							// console.log(nearBox.className);
							if(!nearBox.classList.contains("check")){
								nearBox.classList.add("check");
								leftClick(nearBox);
							}
						}
					}
				}
			}
		}
	}
	function rightClick(dom){
		if(dom.classList.contains("num")){
			return;
		}
		dom.classList.toggle("flag");
		if(dom.classList.contains("islei") && dom.classList.contains("flag")){
			mineOver --;
		}
		if(dom.classList.contains("islei") && !dom.classList.contains("flag")){
			mineOver ++;
		}
		if(mineOver == 0){
			setTimeout(function (){
				fail.style.display = "block";
				failImg.style.backgroundImage = 'url(img/win.jpg)';
			},500);
		}
	}