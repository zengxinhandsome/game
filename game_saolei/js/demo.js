var box = document.getElementsByClassName("box")[0];
	var begin = document.getElementsByClassName('begin')[0];
	var close = document.getElementsByClassName("close")[0];
	var fail = document.getElementsByClassName("fail")[0];
	var failImg = document.getElementsByClassName("failImg")[0];
	var block;	
	var mineNum;		// �ܵ��׵�����
	var mineOver;		// ʣ���׵�����
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
				var con = document.createElement("div");		// ������Ԫ��
				con.classList.add("block");
				con.setAttribute("id",i + "-" + j);		// ÿ����Ԫ���id������λ��
				box.appendChild(con);
				mineMap.push({mine : 0});		// ������������ж����ɵ�����û���ظ�
			}
		}
		block = document.getElementsByClassName("block");	// ��ȡ�����е�Ԫ��ļ���
		while(mineNum){
			var mineIndex = Math.floor(Math.random()*100);		// ����0-99��һ�������
			if(mineMap[mineIndex].mine === 0){
				block[mineIndex].classList.add("islei");			// ������ɵ��׼�һ��class
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
		if(dom && dom.className.indexOf("islei")!= -1){		 // �㵽��	
			for(var i = 0;i < islei.length; i ++){
				islei[i].classList.add("show");		// ����������ʾ
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
				for(var j = posY - 1; j <= posY + 1; j ++){		// ������Χ��8������
					var aroundBox = document.getElementById(i + '-' + j);
					if(aroundBox && aroundBox.className.indexOf("islei") != -1){
						n++;
					}
				}
			}
			dom && (dom.innerHTML = n);
			if(n == 0){
				for(var i = posX - 1; i <= posX + 1;i ++){
					for(var j = posY - 1; j <= posY + 1; j ++){		// ������Χ��8������
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