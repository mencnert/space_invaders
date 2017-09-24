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
  //img section
  light1: null,
  light2: null,
  setup: function() {
    this.ship = new ship(375, 520);

    //edge setup
    this.leftEdge = new rect(-20, 0, 20, 600);
    this.rightEdge = new rect(800, 0, 20, 600);
    //shield setup
    this.shields.push(new shield(100, 450));
    this.shields.push(new shield(275, 450));
    this.shields.push(new shield(450, 450));
    this.shields.push(new shield(625, 450));
    this.shields.forEach(function(shield) {
      shield.setup();
    }); //end forEach

    //alien
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 11; j++) {
        this.aliens.push(new alien(50 + j * 65,
          this.level * 50 + i * 50,
          100 - i * 5));
      }
    }

    //img
    this.light1 = new Image();
    this.light2 = new Image();
    this.light1.src = "img/light1.png";
    this.light2.src = "img/light2.png";
    //canvas setup
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.canvas.style.backgroundColor = "black";
    this.ctx = this.canvas.getContext('2d');
    document.getElementById('game').appendChild(this.canvas);
    setInterval(this.run, 20);
  },

  run: function() {
    game.update();
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
      if (this.ship.bullet != null) {
        this.aliens[i].collisionBullet(this.ship.bullet.rect, i);
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
