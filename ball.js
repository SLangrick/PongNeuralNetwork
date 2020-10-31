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
        //Makes sure ball goes over halfway point so doesn't get multiple hits
        this.half = 0;
        //This provides a score
        //The more times a ball is hit the better the paddle has done
        this.hits = 0;

        this.rectX = 0;
        this.rectY = 0;

    }
    draw(){
        circle(this.x,this.y,this.r*2)
        fill(this.red,this.g,this.b,100)
    }
    update(paddle, mode, paddle2){
        this.x = this.x + this.vel.x
        this.y = this.y + this.vel.y
        if(this.y - this.r < 0){
            this.vel.y = this.vel.y * -1
        }
        if(this.y + this.r > displayHeight) {
            this.vel.y = this.vel.y * -1
        }
        if(this.x + this.r > displayWidth && mode == "Left") {
            this.vel.x = -8
            let yDir = Math.random() * 10
            if(Math.random() > 0.5){
                this.vel.y = yDir * -1;
            } else {
                this.vel.y = yDir
            }
        }
        if(this.x - this.r < 0 && mode == "Right") {
            this.vel.x = 8
            let yDir = Math.random() * 10
            if(Math.random() > 0.5){
                this.vel.y = yDir * -1;
            } else {
                this.vel.y = yDir
            }
        }
        if(this.halfCross() == true){
            this.half = 0;

        }

        if(this.RectCircleColliding(paddle) == true) {
            if(this.half == 0){
                this.hits += 1;
                this.half = 1;
            }
            
            this.vel.x = this.vel.x * -1 
        }
        if(mode == "Match"){
            if(this.RectCircleColliding(paddle2) == true) {
                if(this.half == 0){
                    this.hits += 1;
                    this.half = 1;
                }
                
                this.vel.x = this.vel.x * -1 
            }
        }
    }
    RectCircleColliding(rect){
        let rectX = rect.x + rect.w/2
        let rectY = rect.y + rect.h/2

        var distX = Math.abs(this.x - rectX);
        var distY = Math.abs(this.y - rectY);

        if (distX > (rect.w/2 + this.r)) { return false; }
        if (distY > (rect.h/2 + this.r)) { return false; }
    
        if (distX <= (rect.w/2)) { return true; } 
        if (distY <= (rect.h/2)) { return true; }
    
        var dx=distX-rect.w/2;
        var dy=distY-rect.h/2;
        return (dx*dx+dy*dy<=(this.r*this.r));
    }
    halfCross(){
        let rectX = (displayWidth / 2 - 5) + (10 / 2)
        let rectY = 0 + displayHeight / 2

        var distX = Math.abs(this.x - rectX);
        var distY = Math.abs(this.y - rectY);

        if (distX > (10/2 + this.r)) { return false; }
        if (distY > (displayHeight/2 + this.r)) { return false; }
    
        if (distX <= (10/2)) { return true; } 
        if (distY <= (displayHeight/2)) { return true; }
    }


    offScreen(mode) {
        if(this.y > displayHeight || this.y < 0){
            return true
        }
        else {
            if(mode == "Left" && this.x < 0){
                return true
            } else if (mode == "Right" && this.x > displayWidth) {
                return true
            } else if (mode == "Match" && this.x > displayWidth || this.x < 0){
                return true
            }
            return false
        }
    }
}