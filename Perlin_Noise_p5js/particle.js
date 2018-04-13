function Particle() {
  this.position = createVector(random(width), random(height))
  this.vel = createVector(random(-1, 1), random(-1, 1))
  this.acc = createVector(0, 0)
  this.maxSpeed = settings.maxSpeed

  this.prevPosition = this.position.copy()

  this.update = function() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.position.add(this.vel)
    this.acc.mult(0)
  }

  this.move = function(vectors, particles) {
    const x = floor(this.position.x / settings.scale)
    const y = floor(this.position.y / settings.scale)
    const index = x + y * cols
    const force = vectors[index]
    this.applyForce(force)

    if (settings.applySeparation) {
      const separationForce = this.separate(particles)
      this.applyForce(separationForce)
    }
  }

  this.applyForce = function(force) {
    this.acc.add(force)
  }

  this.separate = function(particles) {
    const desiredSeparation = 100
    const steer = createVector(0, 0)
    let count = 0

    particles.forEach(particle => {
      const distance = p5.Vector.dist(this.position, particle.position)
      if (distance > 0 && distance < desiredSeparation) {
        const diff = p5.Vector.sub(this.position, particle.position)
        diff.normalize()
        diff.div(distance)
        steer.add(diff)
        count++
      }
    })

    if (count > 0) {
      steer.div(count)
    }

    if (steer.mag() > 0) {
      steer.normalize()
      steer.sub(this.vel)
      steer.limit(this.maxSpeed)
    }

    return steer
  }

  this.show = function() {
    stroke('rgba(255,255,255,0.15)')
    strokeWeight(settings.size)
    line(
      this.position.x,
      this.position.y,
      this.prevPosition.x,
      this.prevPosition.y
    )
    this.updatePrev()
  }

  this.updatePrev = function() {
    this.prevPosition.x = this.position.x
    this.prevPosition.y = this.position.y
  }

  this.edges = function() {
    if (this.position.x > width) {
      this.position.x = 0
      this.updatePrev()
    }
    if (this.position.x < 0) {
      this.position.x = width
      this.updatePrev()
    }
    if (this.position.y > height) {
      this.position.y = 0
      this.updatePrev()
    }
    if (this.position.y < 0) {
      this.position.y = height
      this.updatePrev()
    }
  }
}
