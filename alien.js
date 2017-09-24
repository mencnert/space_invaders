var alienWait = 55;

function alien(x, y, w, wait, type) {
  this.x = x;
  this.y = y;
  this.size = 50;
  this.alienSpeed = 10;
  this.type = type;
  this.sw = true;
  this.wait = wait;
  this.rect = new rect(this.x, this.y, w, this.size - 10);

  this.update = function(x, maxY) {

    this.wait--;
    var collision = false;
    if (this.wait === 0) {
      this.x += this.alienSpeed;
      this.rect.setPosition(this.x, this.y);
      this.wait = alienWait;
      if (this.rect.intersect(game.leftEdge) || this.rect.intersect(game.rightEdge)) {
        collision = true;
        var y = this.y
        game.aliens.forEach(function(alien) {
          if (alien.y == y) {
            alien.x -= alien.alienSpeed * 2;
            alien.rect.setPosition(alien.x, alien.y);
          }
        }); //end forEach
      }
      game.aliens.forEach(function(alien) {
        maxY = (alien.x >= x - 10 && alien.x <= x + 10 && maxY < alien.y) ? alien.y : maxY;
      }); //end forEach
      if (Math.floor(Math.random() * 30) == 0 && maxY == this.y) {
        game.lights.push(new light(x + 20, maxY + 30));
      }
      this.sw = !this.sw;
    }
    return collision;
  }

  this.draw = function() {
    /*game.ctx.fillStyle = "white";
    game.ctx.fillRect(this.rect.x, this.rect.y,
      this.rect.width, this.rect.height);*/
    switch (this.type) {
      case 1:
        if (this.sw) {
          game.ctx.drawImage(game.alien11, this.x, this.y);
        } else {
          game.ctx.drawImage(game.alien12, this.x, this.y);
        }
        break;
      case 2:
        if (this.sw) {
          game.ctx.drawImage(game.alien21, this.x, this.y);
        } else {
          game.ctx.drawImage(game.alien22, this.x, this.y);
        }
        break;
      case 3:
        if (this.sw) {
          game.ctx.drawImage(game.alien31, this.x, this.y);
        } else {
          game.ctx.drawImage(game.alien32, this.x, this.y);
        }
        break;
    }
  }

  this.changeDir = function() {
    this.y += this.size / 2;
    this.rect.setPosition(this.x, this.y);
    this.alienSpeed *= -1;
  }

  this.collisionBullet = function(rect, index) {
    if (this.rect.intersect(rect)) {
      game.aliens.splice(index, 1);
      game.ship.bullet = null;
      alienWait--;
    }
  }

  this.collisionShield = function(rect, j, k) {
    if (this.rect.intersect(rect)) {
      game.shields[j].rects.splice(k, 1);
    }
  }
}
