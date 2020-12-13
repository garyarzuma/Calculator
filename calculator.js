let storedNum1 = "";
let storedNum2 = "";
let operator = "";
let previousNum2 = "";

function add (sum1, sum2) {
	return parseFloat(sum1)+parseFloat(sum2);
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

document.querySelectorAll('.button').forEach(button => button.addEventListener('click', pressButton));

function pressButton(e){ 
    const buttonId = e.target.id;
    switch(buttonId){
        case "num0":
        case "num1":
        case "num2":
        case "num3":
        case "num4":
        case "num5":
        case "num6":
        case "num7":
        case "num8":
        case "num9": pressNumber(e)
                     break;
        case "AC":  pressAC(e)
                    break;
        case "add": 
        case "subtract":
        case "multiply":
        case "divide":  pressOperator(e,buttonId)
                        break;
        case "equals":  pressEquals(e)
                        break;   
        case "plus-minus": invertSign();
                        break;     
        case "percent" : turnToPercent();
                        break;    
        case "decimal" : addDecimal();
                        break;
    } 
}

function pressNumber(e){
    let num = e.target.textContent;
    if(operator && storedNum2 === "") displayResults("");

    storeNum(num);
    displayResults(num);
}

function pressAC(e){
    let num = e.target.textContent;
    displayResults(num);
    storedNum1 = "";
    storedNum2 = "";
    operator = "";
    previousNum2 = "";
}

function pressOperator(e, buttonId){
    if(storedNum1 !== "" && storedNum2 !== "") {
        displayResults("");
        let tempResult = operate(operator, storedNum1, storedNum2);
        displayResults(tempResult);
        storedNum1 = tempResult;
        storedNum2 = "";
    }
    operator = buttonId;
}

function pressEquals(e){
    if(operator){
        displayResults("");
        let tempResult = operate(operator, storedNum1, storedNum2!=="" ? storedNum2 : previousNum2);
        displayResults(parseFloat(tempResult.toString()));
        previousNum2 = (storedNum2!=="") ? storedNum2 : previousNum2;
        storedNum1 = tempResult;
        storedNum2 = "";
    }
}

function storeNum(num){
        if(storedNum1 === "" && storedNum2 === ""){
            storedNum1 = num;
        }
        else if(!operator){storedNum1 += num;}
        else if (storedNum2 === ""){
            storedNum2 = num;
        }
        else storedNum2 += num; 
}

function invertSign(){
    displayResults("");
    if(storedNum2 === "") {
        storedNum1 *= -1;
        displayResults(storedNum1);
    }
        else {
        storedNum2 *= -1;
        displayResults(storedNum2);
    }
}

function turnToPercent(){
    displayResults("");
    if(storedNum2 === "") {
        storedNum1 /= 100;
        displayResults(storedNum1);
    }
        else {
        storedNum2 /= 100;
        displayResults(storedNum2);
    }
}

function addDecimal(){
    if(document.getElementById("result").textContent.indexOf(".") === -1){ //only add decimal if there is no decimal already in the results window typed
        if(operator && storedNum2 === "") displayResults("");
        displayResults(".");
        if(storedNum2 === "" && !operator) {
            storedNum1 += "."; 
        }
            else {
            storedNum2 += ".";
        }
    }
}

function displayResults(textContents){
    let resultNode = document.getElementById("result");
    const strLength = (textContents) ? textContents.toString().length : 0 ;

    

    if(strLength > 10){
        textContents = textContents.toFixed(10-Math.ceil(textContents).toString().length);
    }

    if(textContents === "AC") resultNode.textContent = "0"; 
    else{
        if(resultNode.textContent === "0" || textContents === "") resultNode.textContent = "";
        if(resultNode.textContent.toString().length <11) resultNode.textContent += textContents;
        else resultNode.textContent = resultNode.textContent.slice(1)+textContents;
    }
   }