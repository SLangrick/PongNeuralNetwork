class NeuralNetwork {
    constructor(a, b, c, d) {
      if (a instanceof tf.Sequential) {
        this.model = a;
        this.input_nodes = b;
        this.hidden_nodes = c;
        this.output_nodes = d;
      } else {
        this.input_nodes = a;
        this.hidden_nodes = b;
        this.output_nodes = c;
        this.model = this.createModel();
      }
    }

copy() {
    return tf.tidy(() => {
      const modelCopy = this.createModel();
      const weights = this.model.getWeights();
      const weightCopies = [];
      for (let i = 0; i < weights.length; i++) {
        weightCopies[i] = weights[i].clone();
      }
      modelCopy.setWeights(weightCopies);
      return new NeuralNetwork(
        modelCopy,
        this.input_nodes,
        this.hidden_nodes,
        this.output_nodes
      );
    });
  }

mutate(rate) {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutatedWeights = [];
      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i];
        let shape = weights[i].shape;
        let values = tensor.dataSync().slice();
        for (let j = 0; j < values.length; j++) {
          if (random(1) < rate) {
            let w = values[j];
            values[j] = w + randomGaussian();
          }
        }
        let newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }
      this.model.setWeights(mutatedWeights);
    });
  }

  dispose() {
    this.model.dispose();
  }

predict(inputs) {
    return tf.tidy(() => {
        //inputs
        const xs = tf.tensor2d([inputs]);
        //outputs
        const ys = this.model.predict(xs);
        const outputs = ys.dataSync();
        return outputs;
    });
  }

  name(){
      console.log(this.model.getConfig())
  }

async save(){
    //save to local storage
    await this.model.save('localstorage://my-model');
}
async load(){
    //load from local storage
    this.model = await tf.loadLayersModel('localstorage://my-model');
}

createModel() {
    const model = tf.sequential();
    //Dense is connected to every node
    const hidden = tf.layers.dense({
        //Number of nodes
        units: this.hidden_nodes,
        //Number of inputs
        inputShape: [this.input_nodes],
        //Sigmoid, Need to look further into activation
        //Using by popular use
        activation: 'sigmoid'
    });
    model.add(hidden);
    const output = tf.layers.dense({
        //Nodes
        units: this.output_nodes,
        //Softmax produces a confidence score
        //All outputs = 1
        //Highest is most confident
        activation: 'softmax'
    });
    model.add(output);
    return model;
  }
}