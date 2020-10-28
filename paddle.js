class Paddle {
    constructor(r,g,b, brain) {
      this.y = displayHeight / 2;
      this.x = 100;
      this.w = 1;
      this.h = 100;
      this.r = r;
      this.g = g;
      this.b = b;
      //console.log(brain)
      this.brain = brain;

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
  
    offScreen() {
      return this.y > height || this.y < 0;
    }

    mutate() {
        this.brain.mutate(0.1);
    }
  
    update(ball) {
        let inputs = [];
        inputs[0] = this.y;
        inputs[1] = ball.x;
        inputs[2] = ball.y;
        //inputs[3] = ball.vel.x;
        //inputs[4] = ball.vel.y;
        //console.log(this.brain)
        let output = this.brain.predict(inputs);
        //if (output[0] > output[1] && this.velocity >= 0) {
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
  