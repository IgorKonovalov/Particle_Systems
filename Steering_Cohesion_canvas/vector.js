// vector constructor
function Vector(x = 0, y = 0, z = 0) {
  this.x = x
  this.y = y
  this.z = z
}

Vector.prototype = {
  negative() {
    return new Vector(-this.x, -this.y, -this.z)
  },
  add(v) {
    if (v instanceof Vector)
      return new Vector(this.x + v.x, this.y + v.y, this.z + v.z)
    else return new Vector(this.x + v, this.y + v, this.z + v)
  },
  subtract(v) {
    if (v instanceof Vector)
      return new Vector(this.x - v.x, this.y - v.y, this.z - v.z)
    else return new Vector(this.x - v, this.y - v, this.z - v)
  },
  multiply(v) {
    if (v instanceof Vector)
      return new Vector(this.x * v.x, this.y * v.y, this.z * v.z)
    else return new Vector(this.x * v, this.y * v, this.z * v)
  },
  divide(v) {
    if (v instanceof Vector)
      return new Vector(this.x / v.x, this.y / v.y, this.z / v.z)
    else return new Vector(this.x / v, this.y / v, this.z / v)
  },
  equals(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z
  },
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }
}
