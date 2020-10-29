class Paddle {
    constructor(r,g,b, brain) {
      this.y = displayHeight / 2;
      this.x = 100;
      this.w = 1;
      this.h = 100;
      this.r = r;
      this.g = g;
      this.b = b;
      //Copies so not a pointer
      this.brain = brain.copy();

    }

    draw() {
      //beginPath();
      rect(this.x,this.y, this.w, this.h);
      //fillStyle = 'Black';
      fill(this.r,this.g,this.b,100);
    }
  
    up() {
        if(this.y <= 0){
            this.y = 1;
        }
        else {
            this.y -= 8;
        }
        
        
    }

    down() {
        if(this.y + this.h > displayHeight){
            this.y = displayHeight - this.h - 1;
        }
        else {
            this.y += 8;
        }
        
    }

    nothing() {
        this.y = this.y;
    }

    mutate() {
        //Changes weights within neural network
        //Allows for evolution and adaption
        this.brain.mutate(0.1);
    }
    name(){
        //Returns Name of model
        //Used to check that not pointer 
        this.brain.name();
    }
  
    update(ball) {
        //Thinking
        let inputs = [];
        inputs[0] = this.y;
        inputs[1] = ball.x;
        inputs[2] = ball.y;

        //Adding velocity may allow prediction of where ball is in the future
        //maybe too complex

        //inputs[3] = ball.vel.x;
        //inputs[4] = ball.vel.y;
        let output = this.brain.predict(inputs);
        if (output[0] > output[1] && output[0] > output[2]) {
            this.up();
        }
        if (output[1] > output[2] && output[1] > output[0]) {
            this.nothing();
        }
        if (output[2] > output[1] && output[2] > output[0]) {
            this.down();
        };


    }
  }
  