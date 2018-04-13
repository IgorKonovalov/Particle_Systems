let zOff = 0
let particles
let flowField

const settings = {
  inc: 0.2,
  noiseDensity: 1,
  zOffset: 0.004,
  scale: 10,
  magnitude: 4,
  particlesNum: 200,
  renderBackground: false,
  showField: false,
  applySeparation: false,
  maxSpeed: 2,
  size: 1,
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
  const {
    showField,
    noiseDensity,
    scale,
    magnitude,
    inc,
    zOffset,
    renderBackground
  } = settings

  if (renderBackground) {
    background('rgba(0,0,0,0.02)')
  }

  if (showField) {
    background('rgba(0,0,0,1)')
  }

  let yOff = 0
  for (let y = 0; y < rows; y++) {
    let xOff = 0
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols
      const angle = noise(xOff, yOff, zOff) * TWO_PI * noiseDensity
      const v = p5.Vector.fromAngle(angle)
      if (showField) {
        stroke(180)
        push()
        translate(x * scale, y * scale)
        rotate(v.heading())
        line(0, 0, scale, 0)
        pop()
      }
      v.setMag(magnitude)
      flowField[index] = v
      xOff += inc
    }
    yOff += inc
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].move(flowField, particles)
    particles[i].update()
    particles[i].edges()
    particles[i].show()
  }

  zOff += zOffset
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
    .add(settings, 'particlesNum', 30, 2000)
    .step(50)
    .onChange(setup)
    .listen()

  guiSettings
    .add(settings, 'size', 0.1, 100)
    .step(0.5)
    .onChange(setup)
    .listen()

  guiSettings
    .add(settings, 'maxSpeed', 0.1, 10)
    .step(0.1)
    .onChange(setup)
    .listen()

  guiSettings.add(settings, 'showField', false).onChange(setup)
  guiSettings.add(settings, 'renderBackground', false).onChange(setup)
  guiSettings.add(settings, 'applySeparation', false).onChange(setup)

  gui.add(settings, 'fps').listen()

  guiSettings.open()

  return gui
}

datgui()
