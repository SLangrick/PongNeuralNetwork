class Ball {
    constructor(x,y,vel,r,g,b) {
        this.vel = vel;
    if(Math.random() > 0.5){
        this.vel.x = 4 * -1;
    }
    else {
        this.vel.x = 4
    }
    if(Math.random() > 0.5){
        this.vel.y = vel.y * -1;
    }
        this.x = x
        this.y = y;
      this.color = color;
      this.r = 15;
      this.hits = 0;
      this.red = r;
      this.g = g;
      this.b = b;
    if(this.x < 0){
        this.paddleHit = 0;
    }
    else {
        this.paddleHit = 1;
    }
      

    }
    draw(){
        circle(this.x,this.y,this.r*2)
        //arc(this.x,this.y, this.r, 0, Math.PI * 2, false)
        //C.fillStyle = (100,100,100,255)
        fill(this.red,this.g,this.b,100)
        //circle(this.x,this.y,this.r*2)
    }
    update(paddleLeft, paddleRight){
        this.x = this.x + this.vel.x
        this.y = this.y + this.vel.y
        if(this.y - this.r < 0){
            this.vel.y = this.vel.y * -1
        }
        if(this.y + this.r > displayHeight) {
            this.vel.y = this.vel.y * -1
        }
        if(this.RectCircleColliding(paddleLeft) == true) {
            if(this.paddleHit == 0){
                this.hits += 1;
                this.paddleHit = 1;
            }
            
            this.vel.x = this.vel.x * -1 
            this.vel.y = Math.random() * 10
        }
        if(this.RectCircleColliding(paddleRight) == true) {
            if(this.paddleHit == 1){
                this.hits += 1;
                this.paddleHit = 0;
            }
            
            this.vel.x = this.vel.x * -1 
            this.vel.y = Math.random() * 10
        }
    }
    RectCircleColliding(rect){
        var distX = Math.abs(this.x - rect.x);
        var distY = Math.abs(this.y - rect.y);
        //console.log("Rect x: " + rect.x + "Circle x : " + this.x + "Dist x: " + distX + "Calc " + (rect.w/2 + this.r))
    
        if (distX > (rect.w/2 + this.r)) { return false; }
        if (distY > (rect.h/2 + this.r)) { return false; }
    
        if (distX <= (rect.w/2)) { return true; } 
        if (distY <= (rect.h/2)) { return true; }
    
        var dx=distX-rect.w/2;
        var dy=distY-rect.h/2;
        return (dx*dx+dy*dy<=(this.r*this.r));
    }

    offScreen() {
        if(this.x < 0){
            return "RIGHT";
        }
        else if(this.x > displayWidth){
            return "LEFT";
        }
        else {
            return false;
        }
    }
}