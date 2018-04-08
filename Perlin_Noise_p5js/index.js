const inc = 0.2
const scale = 10
let zOff = 0
let particles
let flowField

const settings = {
  inc: 0.2,
  scale: 10,
  magnitude: 4,
  particlesNum: 500,
  fps: 0
}

let fr
let cols
let rows

function setup() {
  createCanvas(600, 600)  
  particles = []
  cols = floor(width / settings.scale)
  rows = floor(height / settings.scale)
  
  flowField = new Array(cols, rows)
  
  // fr = createP('')
  for (let i = 0; i < settings.particlesNum; i++) {
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
      v.setMag(settings.magnitude)
      flowField[index] = v
      xOff += settings.inc
    }
    yOff += settings.inc
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField)
    particles[i].update()
    particles[i].edges()
    particles[i].show()
  }

  zOff += 0.004
  settings.fps = frameRate()
  // fr.html(floor(frameRate()))
}

const datgui = () => {
  gui = new dat.GUI()

  let guiSettings = gui.addFolder('Settings')

  guiSettings
    .add(settings, 'inc', 0, 1)
    .step(0.01)
    .onChange(setup)
    .listen()
  
  guiSettings
    .add(settings, 'magnitude', 0, 10)
    .step(0.01)
    .onChange(setup)
    .listen()

  guiSettings
    .add(settings, 'scale', 0, 100)
    .step(10)
    .onChange(setup)
    .listen()
  
  guiSettings
    .add(settings, 'particlesNum', 100, 2000)
    .step(100)
    .onChange(setup)
    .listen()
  
  gui.add(settings, 'fps').listen()
  
  guiSettings.open()

  return gui
}

datgui()