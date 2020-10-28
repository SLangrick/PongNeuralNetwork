class Game {
    constructor(r,b,g, brain1, brain2){
        this.paddleLeft = new Paddle(r,b,g,brain1, "LEFT");
        this.paddleRight = new Paddle(r,b,g,brain2, "RIGHT");
        this.ball = new Ball(displayWidth / 2, displayHeight / 2, {x: Math.random() * 10,y: Math.random() * 10}, r,b,g);
    }
    update(){
        this.paddleLeft.update(this.ball);
        this.paddleRight.update(this.ball);
        this.ball.update(this.paddleLeft,this.paddleRight);
    }
    draw(){
        this.paddleLeft.draw();
        this.paddleRight.draw();
        this.ball.draw();
    }
}




