var game = {
  canvas: document.createElement('canvas'),
  ctx: null,
  ship: null,
  shields: [],
  aliens: [],
  level: 1,
  leftEdge: null,
  rightEdge: null,
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
        this.aliens.push(new alien(100 + j * 50, 50 + this.level * 30 + i * 40, 100 - i * 5));
      }
    }
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
    var collision = false;
    this.ship.update();
    this.aliens.forEach(function(alien) {
      collision = (alien.update()) ? true : collision;
    }); //end forEach

    if (collision) {
      this.aliens.forEach(function(alien) {
        alien.changeDir();
      }); //end forEach
    }

    this.shields.forEach(function(shield) {
      if (game.ship.bullet != null) {
        shield.collision(game.ship.bullet.rect);
      }
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
