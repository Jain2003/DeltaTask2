var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
const platformPositionX = [175,1225,675,25,935];
const platformPositionY = [325,425,575,675,725];
var gravity = 0.6;
var friction = 0.7;
var batch = 1;
var platformPositionInMotionX = [175,1225,675,25,975];
var platformPositionInMotionY = [225,325,475,575,675];
var order = [3,0,4,2,1]
var user = false;
var userX = [];
var userY = [];
// making the top Nails
var keys = {
        right: false,
        left: false,
        up: false,
        };
function Player(xPosition,yPosition,widthUser,heightUser){
  this.yPosition = yPosition;
  this.xPosition = xPosition;
  this.widthUser = widthUser;
  this.heightUser = heightUser;
  this.dxUser = 0;
  this.dyUser = 0;
  this.jump = true;
  this.drawUser = function(){
    c.fillStyle = "red";
    c.fillRect(this.xPosition , this.yPosition , this.widthUser , this.heightUser, this.dxUser , this.dyUser);
  }
  this.updateUser = function(){
    this.drawUser();
          // Updating the y and x coordinates of the player
          player.yPosition -= player.dyUser;
          player.xPosition += player.dxUser;
          if(player.xPosition < window.innerWidth - player.widthUser ){
            if(keys.right) {
                player.dxUser = 1.5;
            }
          }
          if(player.xPosition  > player.widthUser ){
            // If the left key is pressed increase the relevant horizontal velocity
            if(keys.left) {
                player.dxUser = -1.5;
            }
          }
          if(player.yPosition >window.innerHeight - player.heightUser ){
            // If the player is not jumping apply the effect of frictiom
            if(player.jump == false) {
                player.dxUser *= friction;
            } else {
                // If the player is in the air then apply the effect of gravity
                player.dyUser += gravity;
            }
            player.jump = true;
          }
    // if(user === false){
    //   this.yPosition -= this.dyUser;
    //   // console.log(this.yPosition);
    //   if(this.yPosition < heightTop){
    //     location.reload();
    //   }
    // }
  }
}
var player = new Player(225,455,20,20,1,1);
document.addEventListener("keydown",function(e){
  console.log("keydown");
  if(e.keyCode == 37) {
    console.log("left movement");
      keys.left = true;
      console.log(e);
      // player.updateUser();
  }
  if(e.keyCode == 38) {
      if(player.jump == false) {
          player.dyUser = -1;
      }
      // player.updateUser();
  }
  if(e.keyCode == 39) {
      keys.right = true;
  }
  player.updateUser();
})

document.addEventListener("keyup",function(e){
console.log("keyup");
  if(e.keyCode == 37) {
      keys.left = false;
      // player.updateUser();
  }
  if(e.keyCode == 38) {
      // if(player.dyUser < -2) {
      player.dyUser = -1;
      // }
      // player.updateUser();
  }
  if(e.keyCode == 39) {
      keys.right = false;
  }
  player.updateUser();
})

var xTop = 0;
var yTop = 0;
var heightTop = 50;
var widthTop = 100;
for(var i = 0 ; i<=window.innerWidth/widthTop ; i++){
    c.beginPath();
    c.moveTo(xTop, yTop);
    c.lineTo(xTop + widthTop, yTop);
    c.lineTo(xTop + widthTop/2, yTop + heightTop);
    c.fillStyle = "#019267";
    c.fill();
    xTop+=widthTop;
}
// // making the bottom Nails
var xBottom = 0;
var yBottom = window.innerHeight;
var heightBottom = 50;
var widthBottom = 100;
for(var j = 0 ; j<=window.innerWidth/widthBottom ; j++){
  c.beginPath();
  c.moveTo(xBottom , yBottom);
  c.lineTo(xBottom+widthBottom , yBottom);
  c.lineTo(xBottom + widthBottom/2 , yBottom - heightBottom);
  c.fillStyle = "#019267";
  c.fill();
  xBottom+=widthBottom;
}
var rectangleArray=[];
for(var i = 0 ; i<platformPositionInMotionX.length ; i++){
  rectangleArray.push(new Rectangle(platformPositionInMotionX[i] , platformPositionInMotionY[i] , 1 , 200 , 15));
}


//  now i will create a js object in which I will make multiple platforms
function Rectangle(x,y,dy,rectWidth,rectHeight){
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.rectWidth = rectWidth;
  this.rectHeight = rectHeight;
  this.draw = function(){
    c.fillStyle = "#82954B";
    c.fillRect(this.x , window.innerHeight-2*this.rectHeight - this.y , this.rectWidth , this.rectHeight);
  }
  this.update = function(){
    this.draw();
    if(this.y > window.innerHeight - 2*heightTop){
      var i = 0;
      this.rectHeight = 0;
      this.rectWidth = 0;
    }
    else{
      this.y += this.dy;
    }
  }

}

// generating new platformPosition
var platformUpdatedY = [180 , 110 , 70 , 150 ,200];
function generateNewPlatforms(){
  setInterval(function(){
    for(var i = 0 ; i<platformPositionInMotionX.length ; i++){
      rectangleArray.push(new Rectangle(Math.random()*window.innerWidth , platformUpdatedY[i] , 1, 200 , 15));
    }
  },4000*batch)
  batch++;
}
generateNewPlatforms();
// animate function
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0 , yTop+heightTop , window.innerWidth , window.innerHeight - 2*heightBottom);
  for(var i = 0 ; i<rectangleArray.length ; i++){
    rectangleArray[i].update();
  }
  player.updateUser();
}
animate();
