const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0;
let lives = 0;
const gravity = 3;
const platformMoveVel = 7;
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
};

var scoreCount = document.querySelector(".scoreCount").innerHTML;
var livesCount = document.querySelector(".livesCount").innerHTML;

// construting and drawing top spikes
var xTop = 0;
var yTop = 0;
var heightTop = 50;
var widthTop = 100;
for (var i = 0; i <= window.innerWidth / widthTop; i++) {
  c.beginPath();
  c.moveTo(xTop, yTop);
  c.lineTo(xTop + widthTop, yTop);
  c.lineTo(xTop + widthTop / 2, yTop + heightTop);
  c.fillStyle = "#2C3333";
  c.fill();
  xTop += widthTop;
}

function Ball() {
  this.location = {
    x: canvas.width / 2 + 25,
    y: canvas.height / 2 - 25,
  };
  this.vel = {
    dx: 0,
    dy: 0,
  }
  this.drawingBall = function() {
    c.fillStyle = "blue";
    c.beginPath();
    c.arc(this.location.x, this.location.y, 25, 0, Math.PI * 2);
    c.strokeStyle = "purple";
    c.stroke();
    c.fill();
    c.closePath();
  }
  this.updatingBall = function() {
    this.location.y += this.vel.dy;
    this.vel.dy += gravity;
    if (this.location.x +25 >= canvas.width) {
      this.vel.dx = 0;
    } else if (this.location.x - 25 <= 0) {
      this.vel.dx = 0;
    }
    this.drawingBall();
  }
}

function Platform(x_location, y_location) {
  // console.log("is this happening?");
  this.location = {
    x: x_location,
    y: y_location
  };
  this.height = 15;
  this.width = 180;
  if (screen.width <= 360) {
    this.width = 90;
  }

  this.drawingPlatform = function() {
    c.fillstyle = "#EF5B0C";
    c.beginPath();
    c.fillRect(this.location.x, this.location.y, this.width, this.height);
    c.closePath();
  }
}

function HealthPack(x_location, y_location) {
  this.location = {
    x: x_location,
    y: y_location,
  }
  this.drawingPack = function() {
    c.fillstyle = "pink";
    c.beginPath();
    c.arc(this.location.x, this.location.y, 20, 0, Math.PI * 2);
    c.fill();
    c.closePath();
  }
}

const ball = new Ball();
const platforms = [];
const healthPacks = [];

let yCoordinate = 200;
let xCoordinate = 0;
let left = true;

// constructing the coordinates for platforms and the health packs on the platforms
for (var i = 0; i < 10000; i++) {
  if (left) {
    xCoordinate = Math.floor((Math.random() * canvas.width)/2);
    left = false;
  } else {
    xCoordinate = Math.floor(Math.random() * canvas.width / 2 + canvas.width / 2 - 50);
    left = true;
  }
  platforms.push(new Platform(xCoordinate, yCoordinate));

  if (i % 25 === 0) {
    healthPacks.push(new HealthPack(xCoordinate + Math.floor(Math.random()*180), yCoordinate - 25 ));
  }
  yCoordinate += 150;
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, yTop, canvas.width, canvas.height );
  ball.updatingBall();
  // the following code are conditions for the movement of the ball.
  if (keys.right.pressed) {
    ball.vel.dx += 3;
    ball.location.x += ball.vel.dx;
  } else if (keys.left.pressed) {
    ball.vel.dx += 3;
    ball.location.x -= ball.vel.dx;
  } else if (keys.up.pressed) {
    ball.vel.dy = -3;
  }
  if (
    ball.location.y - 25 <= yTop + heightTop ||
    ball.location.y + 25 >= screen.height
  ) {
    console.log("You Lost");
    scoreCount--;
  }
  console.log(platforms);
  platforms.forEach(function(platform) {
    console.log(platforms);
    platform.drawingPlatform();
    if (
      ball.location.y  <= (platform.location.y-25) &&
      ball.location.y + ball.vel.dy >= (platform.location.y - 25) &&
      ball.location.x >= platform.location.x &&
      ball.location.x   <= platform.location.x + platform.width
    ) {
      ball.vel.dy = 0;
    }
    platform.location.y -= platformMoveVel;
  });
  ball.location.y -= platformMoveVel;
  //
  for (var i = 0; i < healthPacks.length; i++) {
    healthPacks[i].drawingPack();
    healthPacks[i].location.y -= platformMoveVel;

    if (Math.ceil(healthPacks[i].location.y)+25 === Math.ceil(ball.location.y)) {

      if ((ball.location.x - healthPack[i].location.x) <= 50 || ball.location.x - health[i].location.x >=-50) {
        healthPacks.splice(i, 1);
      }
    }
  }
}

animate();

// the below piece of code is to control the ball.
window.addEventListener("keydown", function(e) {
  if (e.code === "ArrowLeft") {
    keys.left.pressed = true;
  } else if (e.code === "ArrowRight") {
    keys.right.pressed = true;
  } else if (e.code === "ArrowUp") {
    keys.up.pressed = true;
  }
});

window.addEventListener("keyup", function(e) {
  if (e.code === "ArrowLeft") {
    keys.left.pressed = false;
    ball.vel.dx = 0;
  } else if (e.code === "ArrowRight") {
    keys.right.pressed = false;
    ball.vel.dx = 0;
  } else if (e.code === "ArrowUp") {
    keys.up.pressed = false;
    ball.vel.dy = 0;
  }
});

const scoremanaging = setInterval(function(){
  scoreCount++;
},1000)
