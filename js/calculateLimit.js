class CalculateLimit{
	

	constructor(equation, xToLimit){
		this.eq = equation;
		this.x = xToLimit;
	}

	calculate (){
		// pegamos a equação e subtituimos o 'x' pelo valor do limite e damos o parse.eval
		// se der número decimal, tentamos transformar em fração
		parser = math.parser();
		result = parser.eval("f(x)="+this.eq);
		result = parser.eval("f("+ this.x+")");

		result = math.format(math.eval(result), {precision:6})

		if (result > 0){
			result = result.toString().substring(2);	
			result = FormatLimitResult.decimalToFraction(result);
		}else if (isNaN(result)){
			// deu indeterminação
			result = "Indeterminação matemática, resultado = 0/0";
		}
		else{
			result = result.toString().substring(3);	
			result = FormatLimitResult.decimalToFraction(result);
		}
		
		return result;
	}
}