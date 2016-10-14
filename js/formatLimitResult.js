class FormatLimitResult {

	constructor(){
	}

	static decimalToFraction (limitResult){
		this.resultLenght = limitResult.length;
		this.result = parseInt(limitResult);
		if (this.result > 0){
			this.result = `${this.result}/${pow(10,this.resultLenght)}`;
		}else {
			this.result =`${this.result}/${pow(10,this.resultLenght)}`;
		}
		return this.result;
	}

}
