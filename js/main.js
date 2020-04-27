let startBtn = document.querySelector("#start"),
    // input
    expensesBtn = document.querySelector('.expenses-item-btn'),
    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesValue = document.querySelector('.expenses-value'),   
    
    optionalExpensesBtn = document.querySelector('.optionalexpenses-btn'),
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'),

    incomItem = document.querySelector('.choose-income'),
    incomValue = document.querySelector('.income-value'),

    checkSavings = document.querySelector('#savings'),

    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),

    // output
    countBtn = document.querySelector('.count-budget-btn'),
    levelValue = document.querySelector('.level-value'),

    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),

    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),

    yearValue = document.querySelector('.time-data .year-value'),
    monthValue = document.querySelector('.time-data .month-value'),
    dayValue = document.querySelector('.time-data .day-value');

let money, time;

startBtn.addEventListener('click', function() {
    let time = prompt('Введите дату в формате YYYY-MM-DD', '');
    let money = +prompt('Ваш бюджет на месяц?', '');

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет?', '');
    }

    appData.budget = money;
    appData.timeData = time;

    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;

    for ( let i = 0; i < expensesItem.length; i++ ) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50 ) {
            console.log('Aite!');
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    }

    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {
    for ( let i = 0; i < optionalExpensesItem.length; i++ ) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent +=  appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', function() {

    if ( appData.budget != undefined ) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudgetValue.innerHTML = '<span style="color:#f00;">Произошла ошибка</span>';
    }
});

incomItem.addEventListener('input', function() {
    let items = incomItem.value;
    appData.income = items.split(',');
    incomValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    ( appData.savings == true ) ? appData.savings = false : appData.savings = true;
});

sumValue.addEventListener('input', function() {
    calcValue();
});

percentValue.addEventListener('input', function() {
    calcValue();
});

function calcValue() {
    if ( appData.savings ) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        console.log(appData.sum);
        console.log(appData.percent);

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
}

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
    monthIncome: 0,
    yearIncome: 0,
};
