function ship(x, y) {
  this.x = x;
  this.y = y;
  this.speed = 0;
  this.size = 10;
  this.bullet = null;
  this.rectHead = new rect(this.x + 2 * this.size, this.y + this.size / 2,
    this.size, this.size);
  this.rectNeck = new rect(this.x + this.size, this.y + this.size + this.size / 2,
    this.size * 3, this.size / 2);
  this.rectBody = new rect(this.x, this.y + 2 * this.size,
    this.size * 5, this.size);

  this.move = function(dir) {
    this.speed = dir * 5;
  }

  this.update = function() {
    this.x += this.speed;
    this.x = (this.x < 0) ? 0 : this.x;
    this.x = (this.x > 800 - this.rectBody.width) ? 800 - this.rectBody.width : this.x;
    this.rectHead.setPosition(this.x + 2 * this.size, this.rectHead.y);
    this.rectNeck.setPosition(this.x + this.size, this.rectNeck.y);
    this.rectBody.setPosition(this.x, this.rectBody.y);
    if (this.bullet != null) {
      this.bullet.update();
      if (this.bullet.y < 0) this.bullet = null;
    }
  }

  this.fire = function() {
    if (this.bullet == null) {
      this.bullet = new bullet(this.x + 2.5 * this.size, this.rectHead.y);
    }
  }

  this.draw = function() {
    game.ctx.fillStyle = "green";
    game.ctx.fillRect(this.rectHead.x, this.rectHead.y, this.rectHead.width, this.rectHead.height);
    game.ctx.fillRect(this.rectNeck.x, this.rectNeck.y, this.rectNeck.width, this.rectNeck.height);
    game.ctx.fillRect(this.rectBody.x, this.rectBody.y, this.rectBody.width, this.rectBody.height);

    if (this.bullet != null) {
      this.bullet.draw();
    }
  }

  this.collisionLight = function(light) {
    if (this.rectHead.intersect(light.rect) || this.rectNeck.intersect(light.rect) || this.rectBody.intersect(light.rect)) {
      game.lights.splice(game.lights.indexOf(light), 1);
      this.bullet = null;
      game.lights = [];
      game.lives--;
      game.gameOver = (game.lives == 0)
      if (!game.gameOver) {
        game.sleep(1500);
        this.x = 375;
        this.y = 520;
      }
    }
  }
}
