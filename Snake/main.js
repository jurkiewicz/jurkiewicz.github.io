document.addEventListener("DOMContentLoaded", function(){

	var container = document.getElementById('container');
	var key = [];
	var direction = -1;
	var snake = [];
	var s = 0;
	var last = 2;
	var score = 0;
	var speed = 500;
	var steer;
	var appleXG, appleYG, appleXB, appleYB;
	var appleG, appleB;
	var canChange = true;
	var scale = 25;

	var words = [];

	var word = document.getElementById('word');
	var scoreTable = document.getElementById('score');

	words[0] = ["grzeczny","g_eczny","rz","ż"];
	words[1] = ["próba","pr_ba","ó","u"];
	words[2] = ["chwyt","_wyt","ch","h"];
	words[3] = ["koleżka","kole_ka","ż","rz"];
	words[4] = ["góra","g_ra","ó","u"];
	words[5] = ["kochany","ko_any","ch","h"];
	words[6] = ["późno","p_źno","ó","u"];
	words[7] = ["wówczas","w_wczas","ó","u"];
	words[8] = ["przysłowie","p_ysłowie","rz","ż"];
	words[9] = ["pochówek","po_ówek","ch","h"];
	words[10] = ["przerębel","p_erębel","rz","ż"];
	words[11] = ["schowany","s_owany","ch","h"];
	words[12] = ["rozróba","rozr_ba","ó","u"];
	words[13] = ["korzenie","ko_enie","rz","ż"];
	words[14] = ["mech","me_","ch","h"];
	words[15] = ["schodek","s_odek","ch","h"];
	words[16] = ["kurzajka","ku_ajka","rz","ż"];
	words[17] = ["grabież","grabie_","ż","rz"];
	words[18] = ["pożar","po_ar","ż","rz"];
	words[19] = ["żartobliwy","_artobliwy","ż","rz"];
	words[20] = ["puch","p_ch","u","ó"];
	words[21] = ["mucha","m_cha","u","ó"];
	words[22] = ["żółw","_ółw","ż","rz"];
	words[23] = ["żółw","ż_łw","ó","u"];
	words[24] = ["przerwa","p_erwa","rz","ż"];
	words[25] = ["włóż","wł_ż","ó","u"];
	words[26] = ["kuchnia","ku_nia","ch","h"];
	words[27] = ["kózka","k_zka","ó","u"];
	words[28] = ["rzodkiew","_odkiew","rz","ż"];

	// var mc = new Hammer(document);

	// mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

	// mc.on("panleft panright panup pandown", function(ev) {
	// 	switch(ev.type){
	// 		case 'panleft': // left
 //            	if (direction != 2 && canChange) {
 //            		direction = 0;
 //            		canChange = false;
 //            	}	                	
 //            break;

 //            case 'panup': // up
 //            	if (direction != 3 && canChange) {
 //            		direction = 1;
 //            		canChange = false;
 //            	}
 //            break;

 //            case 'panright': // right
 //                if (direction != 0 && canChange) {
 //            		direction = 2;
 //            		canChange = false;
 //            	}
 //            break;
         
 //            case 'pandown': // down
 //            	if (direction != 1 && canChange) {
 //            		direction = 3;
 //            		canChange = false;
 //            	}
 //            break;
	// 	}
	// });

	onkeydown = onkeyup = function (e){
        var e = e || event;
        key[e.keyCode] = e.type == 'keydown';
    }

    function snakePart(x, y){
		snake[s] = document.createElement('div');
		snake[s].id = s;
		snake[s].className = 'snake';
		snake[s].style.left = x + 'px';
		snake[s].style.top = y + 'px';
		container.appendChild(snake[s]);
		snake[s] = [x, y];
		s++;
    }

    function initialSnake(){
    	x = 350;
		y = 250;
		for (var i = 0; i < 3; i++) {
			snakePart(x, y);
			x += scale;
		}
    }

    function changeSnake(x, y){
    	var lastSnake = document.getElementById(last);
    	lastSnake.style.left = x + 'px';
    	lastSnake.style.top = y + 'px';
    	snake.splice(0, 0, snake[last]);
    	snake.splice(last, 1);
		snake[0][0] = x;
		snake[0][1] = y;
		--last;
		if (last < 0) {
			last = s - 1;
		}
    }

	function makeApple(){
		appleXG = scale * Math.floor(Math.random() * 32);
		appleYG = scale * Math.floor(Math.random() * 18);
		appleG = document.createElement('div');
		appleG.className = 'apple';
		var randomWord = Math.floor(Math.random() * words.length);
		appleG.innerHTML = words[randomWord][2];
		appleG.style.left = appleXG + 'px';
		appleG.style.top = appleYG + 'px';
		container.appendChild(appleG);

		do{
			appleXB = scale * Math.floor(Math.random() * 32);
			appleYB = scale * Math.floor(Math.random() * 18);
		}while(appleXB == appleXG && appleYB == appleYG);
		appleB = document.createElement('div');
		appleB.className = 'apple';
		appleB.innerHTML = words[randomWord][3];
		appleB.style.left = appleXB + 'px';
		appleB.style.top = appleYB + 'px';
		container.appendChild(appleB);		

		word.innerHTML = words[randomWord][1];
	}

	function start(){
		var menu = document.getElementById('menu');
		var easy = document.getElementById('easy');
		var medium = document.getElementById('medium');
		var hard = document.getElementById('hard');
		var start = document.getElementById('start');

		easy.addEventListener('click', function(){
			speed = 300;
			start.style.visibility = 'visible';
		});
		medium.addEventListener('click', function(){
			speed = 200;
			start.style.visibility = 'visible';
		});
		hard.addEventListener('click', function(){
			speed = 100;
			start.style.visibility = 'visible';
		});

		start.addEventListener('click', function(){
			menu.style.visibility = 'hidden';
			start.style.visibility = 'hidden';
			initialSnake();			
			setInterval(move, speed);
			steer = setInterval(steering, 50);
			makeApple();
		});		
	}

	function gameOver(){
		var end = document.getElementById('end');
		direction = -1;
		clearInterval(steer);
		end.innerHTML = 'GAME OVER!</br>Your score: ' + score + '</br>Click to play again';
		end.style.visibility = 'visible';
		document.addEventListener('click', function(){
			location.reload();
		});
	}

	function steering(){
		for(var i = 0; i < key.length; i ++){
	        if(key[i]){
	            switch (i) {
	            	case 37: // left
	                	if (direction != 2 && canChange) {
	                		direction = 0;
	                		canChange = false;
	                	}	                	
	                break;

	                case 38: // up
	                	if (direction != 3 && canChange) {
	                		direction = 1;
	                		canChange = false;
	                	}
	                break;

	                case 39: // right
	                    if (direction != 0 && canChange) {
	                		direction = 2;
	                		canChange = false;
	                	}
	                break;
	             
	                case 40: // down
	                	if (direction != 1 && canChange) {
	                		direction = 3;
	                		canChange = false;
	                	}
	                break;
	            }
	        }
	    }
	}

	function move(){
		for (var i = 2; i < 1000; i++) {
			if (typeof snake[i] != 'undefined') {
				if ((snake[0][0] === snake[i][0] + scale && snake[0][1] === snake[i][1] && direction === 0) ||
				(snake[0][0] === snake[i][0] - scale && snake[0][1] === snake[i][1] && direction === 2) ||
				(snake[0][1] === snake[i][1] + scale && snake[0][0] === snake[i][0] && direction === 1) ||
				(snake[0][1] === snake[i][1] - scale && snake[0][0] === snake[i][0] && direction === 3)) {
					gameOver();
				}
			}			
		}
		if ((snake[0][0] === 0 && direction === 0) ||
			(snake[0][0] === 775 && direction === 2) ||
			(snake[0][1] === 0 && direction === 1) ||
			(snake[0][1] === 425 && direction === 3)) {
			gameOver();
		}
		if (snake[0][0] === appleXG && snake[0][1] === appleYG) {
			appleG.remove();
			appleB.remove();
			score += 10;
			scoreTable.innerHTML = 'Score: ' + score;
			switch(direction){
				case 0:
					snakePart(snake[0][0], snake[0][1]);
	            break;

	            case 1:
	            	snakePart(snake[0][0], snake[0][1]);
	            break;

	            case 2:
	            	snakePart(snake[0][0], snake[0][1]);
	            break;

	            case 3:
	            	snakePart(snake[0][0], snake[0][1]);
	            break;
			}
			makeApple();
		}
		if (snake[0][0] === appleXB && snake[0][1] === appleYB) {
			appleG.remove();
			appleB.remove();
			score -= 10;
			scoreTable.innerHTML = 'Score: ' + score;
			switch(direction){
				case 0:
					snakePart(snake[0][0], snake[0][1]);
	            break;

	            case 1:
	            	snakePart(snake[0][0], snake[0][1]);
	            break;

	            case 2:
	            	snakePart(snake[0][0], snake[0][1]);
	            break;

	            case 3:
	            	snakePart(snake[0][0], snake[0][1]);
	            break;
			}
			makeApple();
		}
		canChange = true;
		switch(direction){
			case 0:
				x = snake[0][0] - scale;
				y = snake[0][1];
				changeSnake(x, y);
            break;

            case 1:
            	x = snake[0][0];
				y = snake[0][1] - scale;
				changeSnake(x, y);
            break;

            case 2:
            	x = snake[0][0] + scale;
				y = snake[0][1];
				changeSnake(x, y);
            break;

            case 3:
            	x = snake[0][0];
				y = snake[0][1] + scale;
				changeSnake(x, y);
            break;
		}
	}

	start();	
});