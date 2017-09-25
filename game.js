var game = {
  canvas: document.createElement('canvas'),
  ctx: null,
  ship: null,
  shields: [],
  aliens: [],
  lights: [],
  level: 1,
  leftEdge: null,
  rightEdge: null,
  gameOver: false,
  lives: 3,
  score: 0,
  //img section
  light1: null,
  light2: null,
  alien11: null,
  alien12: null,
  alien21: null,
  alien22: null,
  alien31: null,
  alien32: null,
  setup: function() {
    this.ship = new ship(375, 520);
    //edge setup
    this.leftEdge = new rect(-20, 0, 20, 600);
    this.rightEdge = new rect(800, 0, 20, 600);
    this.loadShield();
    this.loadAlien();

    //img
    this.light1 = new Image();
    this.light2 = new Image();
    this.alien11 = new Image();
    this.alien12 = new Image();
    this.alien21 = new Image();
    this.alien22 = new Image();
    this.alien31 = new Image();
    this.alien32 = new Image();
    this.light1.src = "img/light1.png";
    this.light2.src = "img/light2.png";
    this.alien11.src = "img/alien11.png";
    this.alien12.src = "img/alien12.png";
    this.alien21.src = "img/alien21.png";
    this.alien22.src = "img/alien22.png";
    this.alien31.src = "img/alien31.png";
    this.alien32.src = "img/alien32.png";
    //canvas setup
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.canvas.style.backgroundColor = "black";
    this.ctx = this.canvas.getContext('2d');
    document.getElementById('game').appendChild(this.canvas);
    setInterval(this.run, 20);
  },

  run: function() {
    if (!game.gameOver) {
      if (game.aliens.length == 0) {
        console.log(this.aliens);
        game.level++;
        game.ship = new ship(375, 520);
        game.loadShield();
        game.loadAlien();
      } else {
        game.update();
      }
    }
    game.draw();
  },

  clearMap: function() {
    this.ctx.clearRect(0, 0, 800, 600)
  },

  update: function() {
    //alien
    var changeDir = false;
    this.ship.update();
    var len = this.aliens.length;

    for (var i = 0; i < len; i++) {
      var x = this.aliens[i].x;
      var maxY = this.aliens[i].y;
      changeDir = (this.aliens[i].update(x, maxY)) ? true : changeDir;
    }

    for (var i = 0; i < len; i++) {
      if (alienWait != 0) {
        if (this.ship.bullet != null) {
          console.log(this.aliens[i]);
          this.aliens[i].collisionBullet(this.ship.bullet.rect, i);
        }
        if (this.aliens[i].y > 480) {
          this.gameOver = true;
        }
      }
    }
    len = this.aliens.length;

    for (var i = 0; i < len; i++) {
      for (var j = 0; j < this.shields.length; j++) {
        for (var k = 0; k < this.shields[j].rects.length; k++) {
          this.aliens[i].collisionShield(this.shields[j].rects[k], j, k);
        }
      }
    }

    if (changeDir) {
      this.aliens.forEach(function(alien) {
        alien.changeDir();
      }); //end forEach
    }
    // alien end

    this.lights.forEach(function(light) {
      light.update();
      game.ship.collisionLight(light);
    });

    this.lightsCollision();
    //shield-bullet
    this.shields.forEach(function(shield) {
      if (game.ship.bullet != null) {
        shield.collision(game.ship.bullet.rect);
      }
      game.lights.forEach(function(light) {
        shield.collisionLight(light);
      });
    }); //end forEach
  },

  draw: function() {
    this.clearMap();
    this.ship.draw();
    this.shields.forEach(function(shield) {
      shield.draw();
    }); //end forEach
    this.aliens.forEach(function(alien) {
      alien.draw();
    }); //end forEach
    this.lights.forEach(function(light) {
      light.draw();
    }); //end forEach
    //text
    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Lives: " + this.lives, 550, 40);
    this.ctx.fillText("Score: " + this.score, 40, 40);
    if (this.gameOver) {
      this.ctx.font = "150px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("Game over", 20, 250);
    }
  },

  lightsCollision: function() {
    var lightLen = this.lights.length;
    for (var i = 0; i < lightLen; i++) {

      if (this.lights[i].y > 600) {
        this.lights.splice(i, 1);
        lightLen--;
      }
    }
  },

  loadAlien: function() {
    this.aliens = [];

    alienWait = 55;
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 11; j++) {
        switch (i) {
          //type 1
          case 0:
            this.aliens.push(new alien(57 + j * 65,
              this.level * 50 + i * 50, 40,
              100 - i * 5, 1));
            break;
            //type 2
          case 1:
          case 2:
            this.aliens.push(new alien(50 + j * 65,
              this.level * 50 + i * 50, 55,
              100 - i * 5, 2));
            break;
            //type 3
          default:
            this.aliens.push(new alien(50 + j * 65,
              this.level * 50 + i * 50, 55,
              100 - i * 5, 3));
            break;
        }
      }
    }
  },

  loadShield: function() {
    this.shields = [];
    this.shields.push(new shield(100, 450));
    this.shields.push(new shield(275, 450));
    this.shields.push(new shield(450, 450));
    this.shields.push(new shield(625, 450));
    this.shields.forEach(function(shield) {
      shield.setup();
    }); //end forEach
  }
}

$(document).keyup(function(e) {
  if (e.which != 32) {
    game.ship.move(0);
  }
});

$(document).keydown(function(e) {
  switch (e.which) {
    case 37: // left
      game.ship.move(-1);
      break;
    case 39: // right
      game.ship.move(1);
      break;
    case 32: // space
      game.ship.fire();
      break;
  }
});

function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {}
}
