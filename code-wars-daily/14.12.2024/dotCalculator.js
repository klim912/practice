const dotCalculator = (equation) => {
    const [leftPart, operator, rightPart]=equation.split(" ");
    const leftCount=leftPart.length;
    const rightCount=rightPart.length;

    let result = 0;

    switch(operator){
        case "+":
        result = leftCount+ rightCount; 
        break;
        case "-":
        result = leftCount-rightCount;
        break;
        case "*":
        result = leftCount*rightCount 
        break;
        case "//":
        result = Math.floor(leftCount / rightCount);
        break;
    }
	return ".".repeat(result);
}

console.log(dotCalculator("..... - ..."));