let storedNum1 = "";
let storedNum2 = "";
let operator = "";
let previousNum2 = ""; //used for situations when user is pressing equals over and over to repeat an operation

function add (sum1, sum2) {
	return parseFloat(sum1)+parseFloat(sum2); //need to use parseFloat because it will just concatenate since these are strings
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

document.querySelectorAll('.button').forEach(button => button.addEventListener('click', pressButton)); //forEach will add a listener to all items in docment that contain the ID .button

function pressButton(e){ //e is the div that the button was pressed on 
    const buttonId = e.target.id;  //.target.id retursn the ID of the div that was pressed. This identifies what button was pressed. 
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
    if(operator && storedNum2 === "") displayResults(""); // assumes that this is the second number being typed only if there is no second number
                                                            // and an operator button has been pressed. 

    storeNum(num);
    displayResults(num);
}

function pressAC(e){    //clears all variables and sets displayResults to show 0
    let num = e.target.textContent;
    displayResults(num);
    storedNum1 = "";
    storedNum2 = "";
    operator = "";
    previousNum2 = "";
}

function pressOperator(e, buttonId){
    if(storedNum1 !== "" && storedNum2 !== "") {  //if both numbers are entered then treats the operator as an equals sign so you can 
        displayResults("");                       //fast input multiple numbers and get results as you hit operations                      
        let tempResult = operate(operator, storedNum1, storedNum2);
        displayResults(parseFloat(tempResult.toString())); //removes trailing zeroes of a float because toString removes them automatically
        storedNum1 = tempResult;
        storedNum2 = "";
    }
    operator = buttonId;
}

function pressEquals(e){
    if(operator && (storedNum2!=="" || previousNum2 !== "")){         //equals only does something if an operator has been chosen already
        displayResults("");
        let tempResult = operate(operator, storedNum1, storedNum2!=="" ? storedNum2 : previousNum2);
        displayResults(parseFloat(tempResult.toString()));  //removes trailing zeroes of a float because toString removes them automatically
        previousNum2 = (storedNum2!=="") ? storedNum2 : previousNum2;  //used so that you can press equals over and over to do the same operation again 
        storedNum1 = tempResult;                                        // with the last number that was entered
        storedNum2 = "";
    }
}

function storeNum(num){  //logic here makes it so the stored number is either being added for first time or concatenated to current number. 
        if(storedNum1 === "" && storedNum2 === ""){
            storedNum1 = num;
        }
        else if(!operator){storedNum1 += num;} //if they havent pressed an operation yet then keep increasing the current number
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
        if (Math.abs(textContents) < 100000000000) {
            textContents = textContents.toFixed(10-Math.ceil(textContents).toString().length);  //round decimal places based on how big the integer portion of the number is
        }
        else textContents = "Overflow";    
    }

    if(textContents === "AC") resultNode.textContent = "0"; 
    else if (textContents !== "Overflow"){
        if(resultNode.textContent === "0" || textContents === "") resultNode.textContent = ""; //clear the zero on the board if you just cleared or clear the board if AC was pressed. 
        
        if(resultNode.textContent.toString().length <11) resultNode.textContent += textContents; //add the number typed to the end of the number on display if room for it
        else resultNode.textContent = resultNode.textContent.slice(1)+textContents; //if no room for it then remove first digit and add next to last position
    }
    else resultNode.textContent = textContents; 
   }