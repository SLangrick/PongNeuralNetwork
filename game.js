class Game {
    constructor(r,b,g, brain, mode, brain2){
        //Creates Game{
        //console.log(mode)
        this.mode = mode;
        if (this.mode == "Left"){
            this.paddle = new Paddle(r,b,g,brain, "Left");
        } else if(this.mode == "Right"){
            this.paddle = new Paddle(r,b,g,brain, "Right");
        } else {
            this.paddle = new Paddle(r,b,g,brain, "Left");
            this.paddle2 = new Paddle(r,b,g,brain2, "Right");
            this.paddle2.mutate();
        }
        
        this.paddle.mutate();
        
        let yDir = Math.random() * 10
        if(Math.random() > 0.5){
            yDir = yDir * -1;
        }
        this.ball = new Ball(displayWidth / 2, displayHeight / 2, {x: -8,y: yDir}, r,b,g);
    }
    update(mode){
        //Updates Positions
        this.paddle.update(this.ball);
        this.ball.update(this.paddle,this.mode, this.paddle2);
        if(mode == "Match"){
            this.paddle2.update();
        }
    }
    draw(){
        //Draws on canvas
        this.paddle.draw();
        if(mode == "Match"){
            this.paddle2.draw();
        }
        
        this.ball.draw();
    }
}




