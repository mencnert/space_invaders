function bullet(x, y) {
  this.x = x;
  this.y = y;
  this.w =2;
  this.h = 5;
  this.speed = 15;
  this.rect = new rect(this.x, this.y, this.w, this.h);

  this.update = function() {
    this.y -= this.speed;
    this.rect.setPosition(this.x, this.y);
  }

  this.draw = function() {
    game.ctx.fillStyle = "white";
    game.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
