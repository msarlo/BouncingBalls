import { Shape } from "./Shape.js";

const para = document.querySelector("h1");

export class EvilCircle extends Shape{
    constructor(x,y, config, balls){
        super(x, y, 20, 20, true);
        this.color = 'white';
        this.size = 10;
        this.width = config.width;
        this.height = config.height;
        this.ctx = config.ctx;
        this.balls = balls;
        this.count = balls.length;
    }
  
  draw(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 3;
    this.ctx.arc(this.x,this.y, this.size, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  
  checkBounds(){
      if ((this.x + this.size) >= this.width){ 
          this.x = this.x - this.size;
        }
        
        if((this.x - this.size) <= 0){
          this.x += this.size
        }
         
        if ((this.y + this.size) >= this.height){
          this.y -= this.size;
        }
        
        if((this.y - this.size) <= 0){
          this.y += this.size; 
        }
  
  }
  
  setControls()
  {   var _this = this;
      window.onkeydown = function(e) {
      if(e.key === 'a')
      {
          _this.x -= _this.velX;
      }
      else if(e.key === 'd')
      {
          _this.x += _this.velX;
      }
      else if (e.key === 'w')
      {
          _this.y -= _this.velY;
      }
      else if (e.key === 's')
      {
          _this.y += _this.velY;
      }
    }
  }
  
  collisionDetect(){
    this.balls.forEach(ball =>{
      if(ball.exists)
      {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distancia = Math.sqrt(dx*dx + dy*dy);
  
        if(distancia <= (this.size+ball.size))
        {
          ball.exists = false;
          this.count--;
          para.textContent = `Ball count: ${this.count}`;
        }
      }
      })
    }
  }
  