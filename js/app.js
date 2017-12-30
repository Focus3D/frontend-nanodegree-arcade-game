// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    b = Math.floor(Math.random()*3)+1;
    if(b === 1){
    this.y = 40;
    }
    else if(b===2){
        this.y = 125;
    }
    else if(b===3){
        this.y = 210;
    }

    this.x = Math.floor(Math.random() * 180) + 50;
    this.speed = Math.floor(Math.random() * 100) + 300;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if(this.x > 520)
    {
        this.x = -100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var allEnemies = [];
var colision = function(){
    allEnemies.forEach(function(enemy){
         if (enemy.x + 50 > player.x && enemy.x - 50 < player.x & enemy.y + 50 > player.y
          && enemy.y -50 < player.y) {
        player.x = 202.5;
        player.y = 383;
    }
    });
};

var Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function(dt){
    if(this.y < -60){
        this.y = 400;
    }
    colision();
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(code){
    if((code == 'left')&&(this.x > 30)){
        this.x -= this.speed + 15;
    }
    if((code == 'right')&&(this.x < 400)){
        this.x += this.speed + 15;
    }
    if(code == 'up'){
        this.y -= this.speed ;
    }
    if((code == 'down')&&(this.y < 380)){
        this.y += this.speed ;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(205, 380, 85);
for(let i = 0; i < 5; i++){
    const enemy = new Enemy;
    setTimeout (function(){ allEnemies.push(enemy);
        console.log(allEnemies.length);}, i * 600);

}



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
