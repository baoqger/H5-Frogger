// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.speed = (Math.random()*5 + 0.5 )*101;
	this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed*dt;
	//handle the collision with the player
	if (Math.abs(this.x- player.x) <=5 && Math.abs(this.y - player.y)<=5 ) {
		player.reset();
		game.reset();
	}
	//relocate the enemy location when it reaches to the right boundary
	if (this.x >= 5*101) {
		this.reset();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
// encapsulate the location initialization process into the reset function 
Enemy.prototype.reset = function() {
	this.x = -101;
	this.y = Math.floor(Math.random()*3 + 1)*83;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = "images/char-boy.png";
	this.reset();
}

//update the location of the player
Player.prototype.update = function(direction) {
	if (direction === "left") {
		this.x -= 101;
	} else if (direction === "right") {
		this.x += 101;
	} else if (direction === "up") {
		this.y -= 83; 
	} else if (direction === "down") {
		this.y += 83;  
	}
 }


//handle the key press event: check the player can still move or not and check the player reach the water
Player.prototype.handleInput = function(keyname) {
	switch (keyname) {
		case "left":
			//the player can't move out of the map
			if (this.x > 0) { 
				this.update(keyname);
			}
			break;
		case "right":
			//the player can't move out of the map
			if (this.x < 4*101) { 
				this.update(keyname);
			}
			break;
		case "up":
			//the player can't move out of the map
			if (this.y > 0) { 
				this.update(keyname);
				//check if the player reaches the water, only need to check the going up case
				if (this.checkWin()){
					game.upgrade();
				};
			}
			break;
		case "down":
			//the player can't move out of the map
			if (this.y < 5*83) { 
				this.update(keyname);
			}
			break;
		default:
			return;
	}
}

//draw the player on the map
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//encapsulate the location initialization process into the reset function 
Player.prototype.reset = function() {
	this.x = 2*101;
	this.y = 5*83;
}
//check if the player reach the water block level on the top of the map
Player.prototype.checkWin = function() {
	if (this.y === 0) {
		this.reset();
		return true;
	}
	return false;
}



// Now instantiate your objects.
var allEnemies = [], player;

//create the Game class to control the game process
var Game = function() {
	// Place the player object in a variable called player
	player = new Player();
	// Place all enemy objects in an array called allEnemies
	for (var i = 0 ; i <= 2 ; i++) {
		var enemy = new Enemy();
		allEnemies.push(enemy);
	}
}

//upgrade method is used to increase the difficulty of the game
Game.prototype.upgrade = function() {
	allEnemies.push(new Enemy());

	for (var i = 0; i < allEnemies.length ; i++) {
		allEnemies[i].speed *= 1.1;
	}
} 

//reset method to reset the game when collision happens
Game.prototype.reset = function() {
	allEnemies = [];
	for (var i = 0 ; i <= 2 ; i++) {
		var enemy = new Enemy();
		allEnemies.push(enemy);
	}
}
//create a game object to start the game
var game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
