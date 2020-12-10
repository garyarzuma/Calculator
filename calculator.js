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

document.querySelectorAll('.button').forEach(button => button.addEventListener('click', displayButton));

function displayButton(e){ 
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
        case "num9": 
        case "AC":  { displayResults(e.target.textContent)
                        return e.target.textContent;
                    }
        
    
    } 
   
}

function displayResults(textContents){
    let resultNode = document.getElementById("result");
    if(textContents === "AC") resultNode.textContent = "0"; 
    else{
        if(resultNode.textContent === "0") resultNode.textContent = "";
        if(resultNode.textContent.toString().length <11) resultNode.textContent += textContents;
        else resultNode.textContent = resultNode.textContent.slice(1)+textContents;
    }
   }