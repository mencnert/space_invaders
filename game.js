var game = {
  canvas: document.createElement('canvas'),
  ctx: null,
  ship: null,
  bullet: null,
  setup: function() {
    this.ship = new ship(400, 520);
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.canvas.style.backgroundColor = "black";
    this.ctx = this.canvas.getContext('2d');
    document.getElementById('game').appendChild(this.canvas);
    setInterval(this.run, 20);
  },
  run: function() {
    game.ship.update();
    game.clearMap();
    game.ship.draw();
  },
  clearMap: function() {
    this.ctx.clearRect(0, 0, 800, 600)
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
