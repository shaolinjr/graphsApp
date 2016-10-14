class GraphFactory {
  constructor(eqInput){
    this.eqInput = eqInput;
  }

  draw() {
    try {
      functionPlot({
        target: '#plot',
        data: [{
          fn: document.querySelector(this.eqInput).value,
          sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
          graphType: 'polyline'
        }]
      });
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }
}
