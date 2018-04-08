const inc = 0.2
const scale = 40
let zOff = 0
const particles = []
let flowField

let cols
let fr
let rows

function setup() {
  createCanvas(600, 600)
  fr = createP('')
  cols = floor(width / scale)
  rows = floor(height / scale)

  flowField = new Array(cols, rows)

  for (let i = 0; i < 500; i++) {
    particles[i] = new Particle()
  }
  background(0)
}

function draw() {
  let yOff = 0
  for (let y = 0; y < rows; y++) {
    let xOff = 0
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols
      const angle = noise(xOff, yOff, zOff) * TWO_PI
      const v = p5.Vector.fromAngle(angle)
      v.setMag(1)
      flowField[index] = v
      xOff += inc
    }
    yOff += inc
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField)
    particles[i].update()
    particles[i].edges()
    particles[i].show()
  }

  zOff += 0.004
  fr.html(floor(frameRate()))
}
