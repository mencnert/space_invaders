function alien(x, y, wait) {
  this.x = x;
  this.y = y;
  this.size = 35;
  this.alienSpeed = 10;
  this.alienWait = 30;
  this.wait = wait;
  this.rect = new rect(this.x, this.y, this.size, this.size - 10);

  this.update = function() {

    this.wait--;
    var collision = false;
    if (this.wait === 0) {
      this.x += this.alienSpeed;
      this.rect.setPosition(this.x, this.y);
      this.wait = this.alienWait;
      if (this.rect.intersect(game.leftEdge) || this.rect.intersect(game.rightEdge)) {
        collision = true;
        var y = this.y
        game.aliens.forEach(function(alien) {
          if (alien.y == y) {
            alien.x -= alien.alienSpeed;
            alien.rect.setPosition(alien.x, alien.y);
          }
        }); //end forEach
      }
    }
    return collision;
  }

  this.draw = function() {
    game.ctx.fillStyle = "white";
    game.ctx.fillRect(this.rect.x, this.rect.y,
      this.rect.width, this.rect.height);
  }

  this.changeDir = function() {
    this.y += this.size / 2;
    this.rect.setPosition(this.x, this.y);
    this.alienSpeed *= -1;
  }
}
