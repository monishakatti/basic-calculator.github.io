let runningTotal = 0;
let buffer = "0";
let display = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick (value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    //this is not number 
    else{
        handleNumber(value);
    }
    
   
    screen.innerText = display;
        // to display numbers on the screen 
}

function handleSymbol(symbol){
   //if(symbol === 'C'){
   //    buffer = '0';
   //    runningTotal = 0;
   //}

   switch(symbol){
       case 'C': 
            buffer = '0';
            display = buffer;
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            display = buffer;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
                display = buffer;
            }
            else{
                buffer = buffer.substring(0, buffer.length - 1);
                display = display.substring(0, display.length - 1);
            }
            break;
        case '+':
        case '−':
        case '÷':
        case '×':
            handleMathSymbol(symbol);
            break;
   }
}

function handleMathSymbol(symbol){
    if (buffer === '0'){
        //do nothing 
        return;
    }

    const intBuffer  = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
    display += symbol;
}

function flushOperation(intBuffer) {
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }
    else if (previousOperator === '−'){
        runningTotal -= intBuffer;
    }
    else if (previousOperator === '×'){
        runningTotal *= intBuffer;
    }
    else {
        runningTotal /= intBuffer;
    }     
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }
    else {
        buffer += numberString;
    }  

    display = display === "0" ? numberString : (display + numberString);

    /*same as
    if (display === "0")
    {
        display = numberString;
    }
    else{
        display = display + numberString
    } */
    
}

function init (){
    var el = document.querySelector('.calc-buttons')
    el.addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
