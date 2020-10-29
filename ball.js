class Ball {
    constructor(x,y,vel,r,g,b) {
        this.y = y;
        this.x = x;
        this.vel = vel;
        this.color = color;
        this.r = 15;
        
        this.red = r;
        this.g = g;
        this.b = b;
        //Makes sure ball hits the back wall so a paddle can't hit a ball multiple times
        this.backHit = 0;
        //This provides a score
        //The more times a ball is hit the better the paddle has done
        this.hits = 0;

    }
    draw(){
        circle(this.x,this.y,this.r*2)
        fill(this.red,this.g,this.b,100)
    }
    update(paddle){
        this.x = this.x + this.vel.x
        this.y = this.y + this.vel.y
        if(this.y - this.r < 0){
            this.vel.y = this.vel.y * -1
        }
        if(this.y + this.r > displayHeight) {
            this.vel.y = this.vel.y * -1
        }
        if(this.x + this.r > displayWidth) {
            this.vel.x = -8
            this.vel.y = Math.random() * 10
            this.backHit = 0;
        }
        if(this.RectCircleColliding(paddle) == true) {
            if(this.backHit == 0){
                this.hits += 1;
                this.backHit = 1;
            }
            
            this.vel.x = this.vel.x * -1 
        }
    }
    RectCircleColliding(rect){
        var distX = Math.abs(this.x - rect.x);
        var distY = Math.abs(this.y - rect.y);

        if (distX > (rect.w/2 + this.r)) { return false; }
        if (distY > (rect.h/2 + this.r)) { return false; }
    
        if (distX <= (rect.w/2)) { return true; } 
        if (distY <= (rect.h/2)) { return true; }
    
        var dx=distX-rect.w/2;
        var dy=distY-rect.h/2;
        return (dx*dx+dy*dy<=(this.r*this.r));
    }

    offScreen() {
        if(this.y > displayHeight || this.y < 0 || this.x < 0){
            return true
        }
        else {
            return false
        }
    }
}