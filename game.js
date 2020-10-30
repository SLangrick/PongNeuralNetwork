class Game {
    constructor(r,b,g, brain){
        //Creates Game
        this.paddle = new Paddle(r,b,g,brain);
        this.paddle.mutate;
        let yDir = Math.random() * 10
        if(Math.random() > 0.5){
            yDir = yDir * -1;
        }
        this.ball = new Ball(displayWidth - 30, displayHeight / 2, {x: -8,y: yDir}, r,b,g);
    }
    update(){
        //Updates Positions
        this.paddle.update(this.ball);
        this.ball.update(this.paddle);
    }
    draw(){
        //Draws on canvas
        this.paddle.draw();
        this.ball.draw();
    }
}




