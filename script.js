const display = document.querySelector(".calculator-input"); //yazı kısmını aldık
const keys = document.querySelector(".calculator-keys"); //butonlar kısmını aldık


let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingforSecondValue = false;


updateDisplay();

function updateDisplay(){ //başlangıçta 0 yazdırma
    display.value = displayValue;
}

keys.addEventListener('click', function(e) { //consola değeri alma
    const element = e.target; //elemente ulaşma
    const value = element.value;

    if(!element.matches('button')) return; //buton harici bir noktaya tıklandığında herhangi birşey yapmama

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(value);
    }
    updateDisplay();

    /* SWİTCH CASE İLE BURALARA GEREK KALMIYOR!!!
    if(element.classList.contains('operator')) { //class ı operatormü
        //console.log('operator', element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')) { //class ı decimal mi
        //console.log('decimal', element.value);
        inputDecimal(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')) { //class ı silme mi
        //console.log('clear', element.value);
        clear();
        updateDisplay();
        return;
    }

    //console.log('number', element.value); //üsttekilerin hiçbiri değilse sayı butonudur.

    inputNumber(element.value);
    updateDisplay();
*/
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && waitingforSecondValue){
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator){
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`; //max 7 basamak
        firstValue = result;
    }

    waitingforSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingforSecondValue);
}

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    } else if(operator === '-'){
        return first - second;
    } else if(operator === '*'){
        return first * second;
    } else if(operator === '/') {
        return first / second;
    }
    
    return second;
}

function inputNumber(num){
    if(waitingforSecondValue){ //true eşitse
        displayValue = num;
        waitingforSecondValue = false;
    } 
    else{
        displayValue = displayValue === '0'? num: displayValue + num;
        /*
            : dan öncesi
                displayValue değeri 0a eşitse num değerini at

            : dan sonrası (burada bir butona tıklandığını ve tıkladığımız butonun yanına gelmesini sağlıyoruz.)
                displayValue değerinin sonuna yani yanına numu ekle
        */
    }

    console.log(displayValue, firstValue, operator, waitingforSecondValue);
}

function inputDecimal(){
    if(!displayValue.includes('.')){ // daha önceden nokta içermiyosa . koy
        displayValue += '.';
    }
    
}

function clear(){
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingforSecondValue = false;
}