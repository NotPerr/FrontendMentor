const billInput = document.querySelector('.bill-input');
const peopleInput = document.querySelector('.input-people');
const tipPerPerson = document.getElementById('tip-amount');
const totalPerPerson = document.getElementById('total-amount');
const tips = document.querySelectorAll('.tip');
const tipCustom = document.querySelector('.tip-custom');
const resetBtn = document.querySelector('.reset');
const error = document.querySelector('.error');

billInput.addEventListener('input', handleBillInput);
peopleInput.addEventListener('input', handlePeopleInput);
tips.forEach(function(val){
    val.addEventListener('click',handleTipClick);
})
tipCustom.addEventListener('input',handleTipCustomInput);
resetBtn.addEventListener('click', reset);

billInput.value = '0.0';
peopleInput.value = '1';
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);


let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;
let currentTipValue = tipValue * 100 + "%";
tips.forEach(function(val) {
    val.classList.remove('active-tip');
    if(val.innerHTML === currentTipValue) {
        val.classList.add('active-tip')
    }
});

function handleBillInput() {
    billValue = parseFloat(billInput.value);
    // console.log(billValue);
    calculateTip();
}

function handlePeopleInput() {
    peopleValue = parseFloat(peopleInput.value);
    // console.log(peopleValue);
    

    if(peopleValue < 1) {
        error.style.display = 'flex';
        peopleInput.style.border = 'thick solid red';
    }else {
        error.style.display = 'none';
        peopleInput.style.border = 'none';
        calculateTip();
    }
}

function handleTipClick(e) {
    tips.forEach(function(val) {
        val.classList.remove('active-tip');
        if(e.target.innerHTML === val.innerHTML) {
            val.classList.add('active-tip')
            tipValue = parseFloat(val.innerHTML)/100
        }
    });
    calculateTip();
}

function calculateTip() {
    if(peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue / peopleValue) + tipAmount;
        tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = "$" + total.toFixed(2);
    }
}

function handleTipCustomInput() {
    tipValue = parseFloat(tipCustom.value / 100);

    tips.forEach(function(val) {
        val.classList.remove('active-tip');
    })
    calculateTip();
}

function reset() {
    billInput.value = '0.0';
    handleBillInput();
    peopleInput.value = '1';
    handlePeopleInput();
    tipValue = 0.15;
    currentTipValue = tipValue * 100 + "%";
    tips.forEach(function(val) {
        val.classList.remove('active-tip');
        if(val.innerHTML === currentTipValue) {
            val.classList.add('active-tip')
        }
    });
    tipCustom.value = "";
}