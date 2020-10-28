class Game {
    constructor(r,b,g, brain){
        this.paddle = new Paddle(r,b,g,brain);
        this.ball = new Ball(displayWidth - 30, displayHeight / 2, {x: Math.random() * 10* -1,y: Math.random() * 10}, r,b,g);
    }
    update(){
        this.paddle.update(this.ball);
        this.ball.update(this.paddle);
    }
    draw(){
        this.paddle.draw();
        this.ball.draw();
    }
}




