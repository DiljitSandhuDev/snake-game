var cvs,ctx;

cvs = document.getElementById('game');
ctx = cvs.getContext('2d');

var x, y, grid, dots, body, food, maxfood, dir;

x = 240;
y = 240;
grid = 10;
dots = 5;
body = new Array();
food = new Array();
maxfood = 10;
dir = "up"; // oops!

var rint = (min,max)=>{
	min = Math.ceil(min);
	max = Math.floor(max);
	return (Math.floor((Math.random()*(max-min))+min));
};

var drawFood = ()=>{
	food.forEach((c,i)=>{
		ctx.fillStyle = "blue";
		ctx.strokeStyle = "black";
		ctx.fillRect(c.x,c.y,grid,grid);
		ctx.strokeRect(c.x,c.y,grid,grid);
	});
};

var drawSnake = ()=>{
	body.forEach((c,i)=>{
		ctx.fillStyle = "yellow";
		ctx.strokeStyle = "black";
		ctx.fillRect(c.x,c.y,grid,grid);
		ctx.strokeRect(c.x,c.y,grid,grid);
	});
	
	ctx.fillStyle = "red";
	ctx.strokeRect(x,y,grid,grid);
	ctx.fillRect(x,y,grid,grid);
};

var drawBG = ()=>{
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,500,500);
};

var lost = ()=>{
	alert('You Lost!');
	dots = 5;
};

var move = ()=>{
	if(dir == "up"){
		y -= grid;
	}
	else if(dir == "down"){
		y += grid;
	}
	else if(dir == "left"){
		x -= grid;
	}
	else if(dir == "right"){
		x += grid;
	}
	
	if(x < 0 || x > 490 || y < 0 || y > 490){
		lost();
	}
};

window.addEventListener('keydown',(evt)=>{
	if(evt.keyCode == 37 && dir != "right"){
		dir = "left";
	}
	if(evt.keyCode == 38 && dir != "down"){
		dir = "up";
	}
	if(evt.keyCode == 39 && dir != "left"){
		dir = "right";
	}
	if(evt.keyCode == 40 && dir != "up"){
		dir = "down";
	}
});

var checkFood = ()=>{
	food.forEach((c,i)=>{
		if(c.x == x && c.y == y){
			dots += 1;
			food[i].x = rint(1,49)*grid;
			food[i].y = rint(1,49)*grid;
		}
	});
};
var addFood = ()=>{
	food.push({x:rint(1,49)*grid,y:rint(1,49)*grid});
};

var init = ()=>{
	drawBG();
	drawSnake();
	drawFood();
	
	body.unshift({x:x,y:y});
	
	move();
	
	checkFood();
	
	if(body.length > dots){
		body.pop();
	}
	if(food.length < maxfood+1){
		addFood();
	}
};
setInterval(init,100);