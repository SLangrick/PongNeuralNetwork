Leftbrains = [[0 , 0],
    [0 , 0],
    [0 , 0],
    [0 , 0],
    [0 , 0]];

Rightbrains = [[0 , 0],
    [0 , 0],
    [0 , 0],
    [0 , 0],
    [0 , 0]];

total = 50;
show = 1;
gameSelect = 0;
timer = setInterval(test(), 600);
function setup() {
    tf.setBackend('cpu');
    createCanvas(displayWidth, displayHeight);

    games = [];
    for(i = 0; i < total; i++){
        Leftbrains[0][1] = new NeuralNetwork(3, 8, 3);
        Rightbrains[0][1] = new NeuralNetwork(3, 8, 3);
        games.push(new Game(random()*255,random()*255,random()*255, Leftbrains[0][1], Rightbrains[0][1]))
    }
  }

  function newGen() {
    //clearInterval(timer)
    console.log('New Generation')
    done = 0
    games = []
    console.log(tf.memory());
    hits = 0
    defaultLeftBrain = new NeuralNetwork(3, 8, 3);
    defaultRightBrain = new NeuralNetwork(3, 8, 3);
    for(i = 0; i < Leftbrains.length; i++){
        if(Leftbrains[i][0] > 0){
            hits = Leftbrains[i][0]
            for(j = 0; j < Leftbrains.length; j++){
                if(Rightbrains[j][0] > 0){
                    games.push(new Game(random()*255,random()*255,random()*255, Leftbrains[i][1], Rightbrains[j][1]))
                }
                else {
                    games.push(new Game(random()*255,random()*255,random()*255, Leftbrains[i][1], defaultRightBrain))
                }
                done++                
                
            }
        }
    }
    console.log(Rightbrains)
    for(i = 0; i < Rightbrains.length; i++){
        if(Rightbrains[i][0] > 0){
            hits = Rightbrains[i][0]
            for(j = 0; j < Leftbrains.length; j++){
                if(Leftbrains[j][0] > 0){
                    games.push(new Game(random()*255,random()*255,random()*255, Leftbrains[j][1], Rightbrains[i][1]))
                }
                else {
                    games.push(new Game(random()*255,random()*255,random()*255, defaultLeftBrain, Rightbrains[i][1]))
                }
                done++  
            }
        }
    }
    diff = total - done   
    for(i = 0; i < diff; i++){
            games.push(new Game(random()*255,random()*255,random()*255, defaultLeftBrain, defaultRightBrain))
    }
    //defaultLeftBrain.dispose();
    //defaultRightBrain.dispose();
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
       
    }
}
function test(){
    console.log('here')
}

  function draw() {
    background(220);
    if (games.length ==0) {
        newGen()
        
    } else {
        games[0].draw();
    }
    games.forEach((game) => {
        if(game.ball.offScreen() === "LEFT"){
            hits = 0;
            index = 0;
            smallest = Leftbrains[0][0];
            for(i = 0; i < Leftbrains.length; i++){
                if(Leftbrains[i][0] < smallest){
                    smallest = Leftbrains[i][0];
                    index = i;
                    
                }
                
            }
            if(game.ball.hits > smallest){
                console.log("brain copied")
                Leftbrains[index][0] = game.ball.hits
                Leftbrains[index][1] = game.paddleLeft.brain
            }
            games.splice(games.indexOf(game), 1)
        }
        if(game.ball.offScreen() === "RIGHT"){
            hits = 0;
            index = 0;
            smallest = Rightbrains[0][0];
            for(i = 0; i < Rightbrains.length; i++){
                if(Rightbrains[i][0] < smallest){
                    smallest = Rightbrains[i][0];
                    index = i;
                    
                }
                
            }
            if(game.ball.hits > smallest){
                console.log("brain copied")
                Rightbrains[index][0] = game.ball.hits
                Rightbrains[index][1] = game.paddleRight.brain
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
  
