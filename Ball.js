import { Shape } from "./Shape.js";
import { randomRGB } from "./Utilitarios.js";

export class Ball extends Shape {
    constructor(x, y, velX, velY, color, size, config, balls){
      super(x, y, velX, velY, true);
      this.color = color;
      this.size = size;
      this.width = config.width;
      this.height = config.height;
      this.ctx = config.ctx
      this.balls = balls
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.x,this.y,this.size,0,2* Math.PI);
      this.ctx.fill();
    }
  
    update() {
    
      if ((this.x + this.size) >= this.width){
        this.velX = -(this.velX);
      }
      
      if((this.x - this.size) <= 0){
        this.velX = -(this.velX);
      }
      
      if ((this.y + this.size) >= this.height){
        this.velY = -(this.velY);
      }
      
      if((this.y - this.size) <= 0){
        this.velY = -(this.velY);
      }
      
      this.x += this.velX;
      this.y += this.velY;
    }
  
    collisionDetect() {
        this.balls.forEach( (testBall,j) =>{
            if (this.exists && testBall.exists && !(this === testBall))
            {
                const dx = this.x - testBall.x;
                const dy = this.y - testBall.y;
                const distance = Math.sqrt(dx*dx+dy*dy);
            
                if (distance <= (this.size+testBall.size)){
                    testBall.color = this.color = randomRGB();
                    this.velX *= -1;
                    this.velY *= -1;
                    testBall.velX *= -1;
                    testBall.velY *= -1;
                }
            
            }
        });  
    }
}