var game = {
  canvas: document.createElement('canvas'),
  ctx: null,
  ship: null,
  shields: [],

  setup: function() {
    this.ship = new ship(375, 520);
    //shield setup
    this.shields.push(new shield(100, 450));
    this.shields.push(new shield(275, 450));
    this.shields.push(new shield(450, 450));
    this.shields.push(new shield(625, 450));
    this.shields.forEach(function(shield) {
      shield.setup();
    }); //end forEach
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
    this.ship.update();
  },

  draw: function() {
    this.clearMap();
    this.ship.draw();
    this.shields.forEach(function(shield) {
      shield.draw();
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
