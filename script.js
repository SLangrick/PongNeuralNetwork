brains = [[0 , 0],
    [0 , 0],
    [0 , 0],
    [0 , 0],
    [0 , 0]];

total = 250;
show = 1;
gameSelect = 0;
function setup() {
    tf.setBackend('cpu');
    createCanvas(displayWidth, displayHeight);

    games = [];
    for(i = 0; i < total; i++){
        brains[0][1] = new NeuralNetwork(3, 8, 3);
        newBrain = brains[0][1].copy();
        games.push(new Game(random()*255,random()*255,random()*255, newBrain))
    }
    
    console.log(games[0])
  }

  function newGen() {
    done = 0
    for(i = 0; i < brains.length; i++){
        games = []

    }
    console.log(brains)
    console.log(tf.memory());
    hits = 0
    for(i = 0; i < brains.length; i++){
        if(brains[i][0] > 0){
            hits = brains[i][0]
            for(j = 0; j < total/5; j++){
                done++                
                games.push(new Game(random()*255,random()*255,random()*255, brains[i][1]))
                }
            }
        }
    diff = total - done   
    for(i = 0; i < diff; i++){
            defaultBrain = new NeuralNetwork(3, 8, 3);
            games.push(new Game(random()*255,random()*255,random()*255, defaultBrain))
    }
  }

  function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        games.forEach((game) => {
            game.ball.vel.x = -10;
            })
        }
    else if (keyCode === DOWN_ARROW) {
        newGen()
    }
    else if (keyCode === UP_ARROW) {
        games.forEach((game) => {
            console.log(game.ball.hits)
            hits = 0;
            index = 0;
            smallest = brains[0][0];
            for(i = 0; i < brains.length; i++){
                if(brains[i][0] < smallest){
                    smallest = brains[i][0];
                    index = i;
                    
                }
                
            }
            if(game.ball.hits > smallest){
                console.log("brain copied")
                brains[index][0] = game.ball.hits
                brains[index][1] = game.paddle.brain
            }
        });
        newGen()
    }
    else if (keyCode === 49) {
        show = show * -1
    }
    else if (keyCode === 61) {
        framerate(60);
    }
}

  function draw() {
    background(220);
    if (games.length ==0) {
        newGen()
        
    } else {
        games[0].draw();
    }
    games.forEach((game) => {
        if(game.ball.offScreen() === true){
            console.log(game.ball.hits)
            hits = 0;
            index = 0;
            smallest = brains[0][0];
            for(i = 0; i < brains.length; i++){
                if(brains[i][0] < smallest){
                    smallest = brains[i][0];
                    index = i;
                    
                }
                
            }
            if(game.ball.hits > smallest){
                console.log("brain copied")
                brains[index][0] = game.ball.hits
                brains[index][1] = game.paddle.brain
            }
            games.splice(games.indexOf(game), 1)
        }
        else {
            game.update();
            if(show == 1){
                game.draw();
            } 
        }
        
    });
    
    
    
  }
  
