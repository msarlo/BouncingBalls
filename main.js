import { Ball } from "./ball.js";
import { EvilCircle } from "./EvilCircle.js";
import { random } from "./Utilitarios.js";
import { randomRGB } from "./Utilitarios.js";

// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let balls = [];

let config = {
  width: width,
  height: height,
  ctx: ctx
};

while (balls.length < 100) {
  let size = random(10,20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7,7),
    random(-7,7),
    randomRGB(),
    size,
    config,
    balls
  );
  balls.push(ball);
}

let evil = new EvilCircle(random(10, width - 10), random(10, height - 10), config, balls);
evil.setControls();

function loop() {
  
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  
  balls.forEach(ball =>{
    if(ball.exists)
    {
      ball.update();
      ball.collisionDetect();
      ball.draw();
    }
  });

  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  
  requestAnimationFrame(loop);
}

loop();