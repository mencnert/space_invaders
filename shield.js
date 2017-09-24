function shield(x, y) {
  this.x = x;
  this.y = y;
  this.size = 15;
  this.rects = [];

  this.setup = function() {
    this.rects = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 5; j++) {
        this.rects.push(new rect(this.x + j * this.size, this.y + i * this.size,
          this.size, this.size));
      }
    }
    this.rects.push(new rect(this.x, this.y + 3 * this.size,
      this.size, this.size));
    this.rects.push(new rect(this.x + 4 * this.size, this.y + 3 * this.size,
      this.size, this.size));
  }

  this.draw = function() {
    game.ctx.fillStyle = "green";
    var size = this.size;
    this.rects.forEach(function(rect) {
      game.ctx.fillRect(rect.x, rect.y, size, size);
    });
  }

  this.collision = function(bulletRect) {
    var n = this.rects.length;
    for (var i = 0; i < n; i++) {
      if (this.rects[i].intersect(bulletRect)) {
        this.rects.splice(i, 1);
        game.ship.bullet = null;
        break;
      }
    }

  }

  this.collisionLight = function(light) {
    var n = this.rects.length;
    for (var i = 0; i < n; i++) {
      if (this.rects[i].intersect(light.rect)) {
        this.rects.splice(i, 1);
        game.lights.splice(game.lights.indexOf(light), 1);
        break;
      }
    }
  }
}
