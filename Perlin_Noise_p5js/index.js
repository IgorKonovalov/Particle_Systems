let zOff = 0
let particles
let flowField

const settings = {
  inc: 0.2,
  noiseDensity: 1,
  zOffset: 0.004,
  scale: 10,
  magnitude: 4,
  particlesNum: 500,
  showField: false,
  fps: 0
}

let fr
let cols
let rows

function setup() {
  createCanvas(800, 800)  
  particles = []
  cols = floor(width / settings.scale)
  rows = floor(height / settings.scale)
  
  flowField = new Array(cols, rows)
  
  for (let i = 0; i < settings.particlesNum; i++) {
    particles[i] = new Particle()
  }
  background(0)
}

function draw() {
  if (settings.showField) {
    background(0)
  }

  let yOff = 0
  for (let y = 0; y < rows; y++) {
    let xOff = 0  
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols
      const angle = noise(xOff, yOff, zOff) * TWO_PI * settings.noiseDensity
      const v = p5.Vector.fromAngle(angle)
      if (settings.showField) {
        stroke(180)
        push()
        translate(x * settings.scale, y * settings.scale)
        rotate(v.heading())
        line(0, 0, settings.scale, 0)
        pop()  
      }
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

  zOff += settings.zOffset
  settings.fps = frameRate()
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
    .add(settings, 'noiseDensity', 0, 10)
    .step(0.01)
    .onChange(setup)
    .listen()

  guiSettings
    .add(settings, 'zOffset', 0, 0.1)
    .step(0.005)
    .onChange(setup)
    .listen()

  guiSettings
    .add(settings, 'particlesNum', 100, 2000)
    .step(100)
    .onChange(setup)
    .listen()
  
  guiSettings
    .add(settings, 'showField', false)
    .onChange(setup)
  
  gui.add(settings, 'fps').listen()
  
  guiSettings.open()

  return gui
}

datgui()