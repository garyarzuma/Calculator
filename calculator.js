let storedNum1 = "";
let storedNum2 = "";
let operator = "";

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
    let num = "";
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
        case "num9": num = e.target.textContent;
                     if(operator && storedNum2 === "") displayResults("");
                     storeNum(num);
                     displayResults(num);
                     break;
        case "AC":  num = e.target.textContent;
                    displayResults(num);
                    storedNum1 = "";
                    storedNum2 = "";
                    operator = "";
                    break;
        case "add": 
        case "subtract":
        case "multiply":
        case "divide": if(storedNum1 && storedNum2) {
                                displayResults("");
                                let tempResult = operate(operator, storedNum1, storedNum2);
                                displayResults(tempResult);
                                storedNum1 = tempResult;
                                storedNum2 = "";
                        }
                        operator = buttonId;
                        break;
        case "equals":  displayResults("");
                        displayResults(operate(operator, storedNum1, storedNum2));
                        break;                
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

function displayResults(textContents){
    let resultNode = document.getElementById("result");
    const strLength = textContents.toString().length;
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