function light(x, y) {
  this.x = x;
  this.y = y;
  this.w = 12;
  this.h = 20;
  this.speed = 4;
  this.type = true;
  this.lightWait = 7;
  this.wait = this.lightWait;
  this.rect = new rect(this.x, this.y, this.w, this.h);
  this.update = function() {
    this.y += this.speed;
    this.rect.setPosition(this.x, this.y);
    if (this.wait == 0) {
      this.type = !this.type;
      this.wait = this.lightWait;
    }
    this.wait--;
  }
  this.draw = function() {
    if (this.type) {
      game.ctx.drawImage(game.light1, this.x, this.y);
    } else {
      game.ctx.drawImage(game.light2, this.x, this.y);
    }
  }
}
