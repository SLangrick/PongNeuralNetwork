//Main Script

//Stores 5 Best Neural Networks
brains = [[0 , 0],
    [0 , 0],
    [0 , 0],
    [0 , 0],
    [0 , 0]];
//Array to store all running games
games = [];
//Total amount of games
total = 100;
//Toggle Between Viewing all or 1
show = 1;
//Which game to view
gameSelect = 0;
//Which generation
gen = 0;

function setup() {
    //Prevents all running on GPU
    tf.setBackend('cpu');
    createCanvas(displayWidth, displayHeight);
    //For canvas number
    textSize(width / 3);
    textAlign(CENTER, CENTER);
    //creates first network
    defaultBrain = new NeuralNetwork(3, 8, 3);

    //Creates first brains
    for(i = 0; i < total; i++){
        //deletes old network to create a new one
        //Data is copied into a new tensot with paddle
        defaultBrain.dispose();
        //Creates new network
        defaultBrain = new NeuralNetwork(3, 8, 3);
        games.push(new Game(random()*255,random()*255,random()*255, defaultBrain))
    }
    //deletes saved network in variable
    defaultBrain.dispose();
  }

function newGen() {
    console.log("New Gen")
    gen++
    done = 0
    for(i = 0; i < brains.length; i++){
        games = []

    }
    for(i = 0; i < brains.length; i++){
        if(brains[i][0] > 0){
            for(j = 0; j < total/5; j++){
                done++           
                games.push(new Game(random()*255,random()*255,random()*255, brains[i][1]))

                }
            }
        }
    diff = total - done; 
    if (diff > 0){
        console.log("New network");
        //Creates new network
        //Will never get used but here to prevent build up of tensors
        defaultBrain = new NeuralNetwork(3, 8, 3);  
        for(i = 0; i < diff; i++){
                //deletes last network
                defaultBrain.dispose();

                //creates new network
                defaultBrain = new NeuralNetwork(3, 8, 3);
                games.push(new Game(random()*255,random()*255,random()*255, defaultBrain))
        }
        //Deletes final network
        defaultBrain.dispose();

    }
    
  }

  function saveOrDelete(game){
    index = 0;
    smallest = brains[0][0];
    for(i = 0; i < brains.length; i++){
        if(brains[i][0] < smallest){
            smallest = brains[i][0];
            index = i;
            
        }
        
    }
    if(game.ball.hits > smallest){
        brains[index][0] = game.ball.hits
        if(brains[index][1] == 0){
            //No code needed
        }
        else {
            brains[index][1].dispose();
        }
        brains[index][1] = game.paddle.brain
    } else {
        game.paddle.brain.dispose();
    }
        
    games.splice(games.indexOf(game), 1)

  }

  function keyPressed() {
    if (keyCode === 51) {
        games.forEach((game) => {
            game.ball.vel.x = -10;
            })
        }
    else if (keyCode === 52) {
        newGen()
    }
    else if (keyCode === 53) {
        games.forEach((game) => {
            saveOrDelete(game);
        });

    }
    else if (keyCode === 49) {
        show = show * -1
    }
    else if (keyCode === 50) {
        console.log(brains)
        console.log(tf.memory());
    }else if (keyCode === 56) {
        console.log("saved");
        index = 0;
        hits = 0;
        for(i = 0; i < brains.length; i++){
            
            if(hits < brains[i][0]){
                index = i;
                hits = brains[i][0]
                
            }
            
        }
        console.log(brains)
        console.log("Hits = " + hits + " Index: " + index)
        brains[index][1].save();
    
    }else if (keyCode === 57) {
        console.log("loaded")
        brains[4][0] = 10;
        brains[4][1] = new NeuralNetwork(3, 8, 3);
        brains[4][1].load();
    }
}

function draw() {
    background(220);
    text(gen, displayWidth/2, displayHeight/2);
    
    
    games.forEach((game) => {
        if(game.ball.offScreen() === true){
            //If ball goes off screen make decision on whether brain was good
            saveOrDelete(game);
        }
        else {
            game.update();
            if(show == 1){
                //Draws all games
                game.draw();
            } 
        }
        
    });

    //Creates New games once all resolved
    if (games.length ==0) {
        newGen()
        
    } else {
        //Only draws First game
        //Update in future to select
        games[0].draw();
    }
    
    
    
  }
  
