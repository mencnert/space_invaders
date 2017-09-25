function ufo() {
  this.x = 900;
  this.y = 50;
  this.speed = 3;
  this.rect = new rect(this.x, this.y, 80, 40);
  this.update = function() {
    this.x -= this.speed;
    this.rect.setPosition(this.x, this.y);
  }
  this.draw = function() {
    game.ctx.drawImage(game.ufoImg, this.x, this.y);
  }
}
