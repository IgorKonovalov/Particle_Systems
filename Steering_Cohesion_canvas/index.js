const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')
const start = document.getElementById('start')

// temp commit

canvas.width = document.body.offsetWidth
canvas.height = document.body.offsetHeight

let xStart = canvas.width / 2
let yStart = canvas.height / 2

window.addEventListener('resize', () => {
  canvas.width = document.body.offsetWidth
  canvas.height = document.body.offsetHeight
  xStart = canvas.width / 2
  yStart = canvas.height / 2
})

const border = {
  x: xStart * 2,
  y: yStart * 2
}

const numberOfVenicles = 100
const particles = []

const randomInRange = (from = -1, to = 1) => Math.random() * (to - from) + from

function Swarm() {
  this.venicles = []
}

Swarm.prototype = {
  createVenicle(x, y) {
    this.venicles.push(new Venicle(x, y))
  },
  draw() {
    this.venicles.forEach(venicle => venicle.draw())
  },
  applyVelocity() {
    this.venicles.forEach(venicle => venicle.applyVelocity())
  }
}

function Venicle(x = 0, y = 0) {
  this.acceleration = new Vector(0, 0)
  this.velocity = new Vector(randomInRange(), randomInRange())
  this.position = new Vector(x, y)
  this.radius = 5.0
  this.maxspeed = 3
  this.maxforce = 0.05
}

Venicle.prototype = {
  randomizePosition({ x, y }) {
    this.position = new Vector(randomInRange(0, x), randomInRange(0, y))
  },
  draw() {
    cx.beginPath()
    cx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false)
    cx.fillStyle = 'white'
    cx.fill()
  },
  applyVelocity() {
    this.position = this.position.add(this.velocity)
  }
}

const swarm = new Swarm()
canvas.addEventListener('click', e => {
  swarm.createVenicle(e.clientX, e.clientY)
  swarm.draw()
})

let drawFlag = false
let drawInterval
start.addEventListener('click', () => {
  if (!drawFlag) {
    drawInterval = setInterval(() => {
      cx.clearRect(0, 0, canvas.width, canvas.height)
      swarm.applyVelocity()
      swarm.draw()
    }, 20)
    drawFlag = true
    start.innerHTML = 'STOP'
  } else {
    clearInterval(drawInterval)
    drawFlag = false
    start.innerHTML = 'START'
  }
})
