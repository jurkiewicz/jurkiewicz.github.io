document.addEventListener('DOMContentLoaded', function(){

	var drops = [];
	var x;
	var y;
	var yspeed;
	var z;
	var grav = 0.2;

	var body = document.getElementById('body');

	function setup(){
		for (var i = 0; i < 500; i++) {
			x = Math.floor(Math.random() * window.innerWidth);
			y = -Math.floor(Math.random() *  window.innerHeight) - 10;
			z = Math.floor(Math.random() * 20);
			yspeed = z / 2;
			drops[i] = document.createElement('div');
			drops[i].id = i;
			drops[i].className = 'drop';
			drops[i].style.height = z + 'px';
			drops[i].style.width = (z / 10) + 'px';
			drops[i].style.left = x + 'px';
			drops[i].style.top = y + 'px';
			body.appendChild(drops[i]);
			drops[i] = [x, y, yspeed, z];
		}		
	}

	function draw(){
		for (var i = 0; i < 500; i++) {
			fall(i);
			show(i);	
		}			
	}

	function fall(i){
		drops[i][2] += grav;
		drops[i][1] += drops[i][2];
		if (drops[i][1] > window.innerHeight + 20) {
			drops[i][0] = Math.floor(Math.random() * window.innerWidth);
			drops[i][1] = Math.floor(Math.random() * -100) - 10;
			drops[i][3] = Math.floor(Math.random() * 20);
			drops[i][2] = drops[i][3] / 4;
		}
	}

	function show(i){
		drop = document.getElementById(i);
		drop.style.height = drops[i][3] + 'px';
		drop.style.width = (drops[i][3] / 10) + 'px';
		drop.style.top = drops[i][1] + 'px';
		drop.style.left = drops[i][0] + 'px';
	}

	setup();

	setInterval(draw, 20);
});
