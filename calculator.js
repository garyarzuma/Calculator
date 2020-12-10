function add (sum1, sum2) {
	return sum1+sum2;
}

function subtract (sum1, sum2)  {
	return sum1-sum2;
}

function multiply (sum1, sum2)  {
	return sum1*sum2;
}

function divide(num1, num2){
    return num1/num2;
}

function operate (operator, num1, num2){
    switch(operator){
        case "add":
            return add(num1,num2);
        case "subtract": 
            return subtract(num1,num2);
        case "multiply": 
            return multiply(num1,num2);
        case "divide": 
            return divide(num1,num2);
    }
}

