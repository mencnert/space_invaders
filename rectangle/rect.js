function rect(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.intersect = function(r) {
    return (this.x < r.x + r.width && this.x + this.width > r.x && this.y < r.y + r.height && this.y + this.height > r.y);
  }
  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  }
  this.setSize = function(w, h) {
    this.width = w;
    this.height = h;
  }
  this.scale = function(mul) {
    this.width *= mul;
    this.height *= mul;
  }
}
