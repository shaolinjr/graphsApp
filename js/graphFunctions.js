
function calculateLimit(equation, xToLimit) {
  var parser = math.parser();

  if (equation.indexOf('/') >= 0) {
    // temos que pegar a equação antes da barra e a equação depois da barra para dar eval separado
    // result = numerador + '/'+ denominador
    // em seguida mandamos o Ratio simplificar..

    // separamos as equações
    numerador = equation.split("/")[0].replace("(", "").replace(")", "");
    denominador = equation.split("/")[1].replace("(", "").replace(")", "");

    // validamos e calculamos os valores dos limites
    numerador = parser.eval("f(x)=" + numerador);
    numerador = parser.eval("f(" + xToLimit + ")");
    console.log("Numerador: " + numerador);

    denominador = parser.eval("f(x)=" + denominador);
    denominador = parser.eval("f(" + xToLimit + ")");
    console.log("Denominador: " + denominador);

    // montamos o resultado
    result = numerador + "/" + denominador; //type string
    console.log("Resultado: " + result);
  } else {
    result = parser.eval("f(x)=" + equation);

    if (Number.isInteger(parser.eval("f(" + xToLimit + ")"))) {
      result = parseInt(parser.eval("f(" + xToLimit + ")"));
    } else {
      result = parseFloat(math.format(parser.eval("f(" + xToLimit + ")"), { precision: 4 }));

      console.log("Wasn't an integer")
    }
  }

  if (typeof result == "string" || !Number.isInteger(result)) {
    // usar o Ratio
    result = Ratio.parse(result).simplify();
  } else if (isNaN(result)) {
    // deu indeterminação
    result = "0/0 (Indeterminação matemática)";
  }

  return result;
}

function calculateDerivative(equation, symbol) {
  try {
    var derivative = nerdamer(`diff(${equation},x)`);
  } catch (err) {
    console.log("Unsupported function to calculate derivative")
    return;
  }

  return derivative.toString();
}

function drawGraph(equationValue) {
  graphOptions   = generateGraph({}, equationValue);

  try {
    functionPlot(graphOptions);
    return graphOptions;

  } catch (err) {
    console.log(err);
    alert(err);
  }
}
function initGraph() {
  return {
  target: '#plot',
  data: []
  };
}

function generateGraph(graphOptions, equationValue) {
  //let equation = document.querySelector(equationId).value;
  graphOptions = {
  target: '#plot',
  data: [{
      fn: equationValue,
      color: "#007C4B",
      sampler: 'builtIn', // this will make function-plot use the evaluator of math.js
      graphType: 'polyline',
      // derivative:{
      //   fn: calculateDerivative(equation, "x"),
      //   // x0: 2,
      //   updateOnMouseMove:true
      // }
    }]
  }
  return graphOptions;

  // try {
  //   functionPlot(graphOptions);
  //   return graphOptions;

  // } catch (err) {
  //   console.log(err);
  //   alert(err);
  // }
}

function generateInverse(graphOptions, equationId) {
  let inverseEq = document.querySelector(equationId).value;
  
  // temos que dar o update no gráfico

  graphOptions.data[1] = {

    fn: inverseEq,
    color: "#D32F2F",
    sampler: 'builtIn', // this will make function-plot use the evaluator of math.js
    graphType: 'polyline',
    // derivative:{
    //   fn: calculateDerivative(inverseEq, "y"),
    //   // x0: 2,
    //   updateOnMouseMove:true
    // }
  }
  return graphOptions;
}

function removeInverse(graphOptions){
  let _graphOptions = graphOptions;

  _graphOptions.data = _graphOptions.data.slice(0, 1);
  return _graphOptions;
}

function formatToTex (expressionValue){
  var node = math.parse(expressionValue);
  var latex;
  if (node){
    latex =  node.toTex({parenthesis: "auto", implicit: "show"});
  }else {
    latex = "";
  }
  return `${latex}`;
}

function clearFunctionFields () {
  let func = $("#eq");
  let inverse = $("#inverse-eq");
  

  func.val("");
  $(func).siblings("label").removeClass("active");
  inverse.val("");
  $(inverse).siblings("label").removeClass("active");
}

function clearLimitField() {
  let limit = $("#limit-value");
  limit.val("");
  $(limit).siblings("label").removeClass("active");
}

function fadeFunctionsOut (){
  $(".preview").eq(0).fadeOut('1200', function() {
    
  });
  $(".preview").eq(1).fadeOut('1200', function() {
    
  });
}

function fadeLimitOut (){
  $(".preview").eq(2).fadeOut('1200', function() {
    
  });
}