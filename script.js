'use strict';

// Simply Bank App

const account1 = {
    userName: 'Cecil Ireland',
    transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
    interest: 1.5,
    pin: 1111,
    transactionsDates: [
        '2020-10-02T14:43:31.074Z',
        '2020-10-29T11:24:32.531Z',
        '2020-11-06T10:49:51.135Z',
        '2020-11-30T14:15:31.372Z',
        '2020-12-02T09:10:21.761Z',
        '2021-12-21T11:34:30.907Z',
        '2022-06-10T12:19:45.255Z',
        '2022-06-14T15:01:13.486Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account2 = {
    userName: 'Amani Salt',
    transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
    interest: 1.3,
    pin: 2222,
    transactionsDates: [
        '2020-10-02T14:43:31.074Z',
        '2020-10-29T11:24:32.531Z',
        '2020-11-06T10:49:51.135Z',
        '2020-11-30T14:15:31.372Z',
        '2020-12-02T09:10:21.761Z',
        '2020-12-21T11:34:30.907Z',
        '2021-01-05T12:19:45.255Z',
        '2021-01-02T15:01:13.486Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    userName: 'Corey Martinez',
    transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
    interest: 0.8,
    pin: 3333,
    transactionsDates: [
        '2020-10-02T14:43:31.074Z',
        '2020-10-29T11:24:32.531Z',
        '2020-11-06T10:49:51.135Z',
        '2020-11-30T14:15:31.372Z',
        '2020-12-02T09:10:21.761Z',
        '2020-12-21T11:34:30.907Z',
        '2021-01-05T12:19:45.255Z',
        '2021-01-02T15:01:13.486Z',
    ],
    currency: 'UAH',
    locale: 'uk-UA',
};

const account4 = {
    userName: 'Julia Palchun',
    transactions: [530, 1300, 500, 40, 190, 4000, 2400],
    interest: 1.7,
    pin: 4444,
    transactionsDates: [
        '2020-10-02T14:43:31.074Z',
        '2020-10-29T11:24:32.531Z',
        '2020-11-06T10:49:51.135Z',
        '2020-11-30T14:15:31.372Z',
        '2020-12-02T09:10:21.761Z',
        '2020-12-21T11:34:30.907Z',
        '2021-01-05T12:19:45.255Z',
    ],
    currency: 'RUB',
    locale: 'ru-RU',
};

const account5 = {
    userName: 'Oliver Avila',
    transactions: [630, 800, 300, 50, 120],
    interest: 1.1,
    pin: 5555,
    transactionsDates: [
        '2020-10-02T14:43:31.074Z',
        '2020-10-29T11:24:32.531Z',
        '2020-11-06T10:49:51.135Z',
        '2020-11-30T14:15:31.372Z',
        '2020-12-02T09:10:21.761Z',
    ],
    currency: 'USD',
    locale: 'en-CA',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const formatTransactionDate = function (date, locale) {
    const getDaysBetween2Dates = (date1, date2) =>
        Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

    const daysPassed = getDaysBetween2Dates(new Date(), date);
    if(daysPassed === 0) return '??????????????';
    if(daysPassed === 1) return '??????????';
    if(daysPassed <= 5) return `${daysPassed} ?????? ??????????`;
    if(daysPassed > 5 && daysPassed <= 7) return `${daysPassed} ???????? ??????????`;
    else {
        return new Intl.DateTimeFormat(locale).format(date);
    }
};

const formatCurrency = function (value, locale, currency){
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
}
const displayTransactions = function(account, sort = false){
    containerTransactions.innerHTML = '';

    const transacs = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions;
        transacs.forEach(function(trans, index){
        const transType = trans > 0 ? 'deposit' : 'withdrawal';
            const date = new Date(account.transactionsDates[index]);
            const transDate = formatTransactionDate(date, account.locale);

            const formattedTrans = formatCurrency(trans, account.locale, account.currency);

        const transactionsRow = `
              <div class="transactions__row">
                <div class="transactions__type transactions__type--${transType}">
                    ${index + 1} ${transType}
                </div>
                <div class="transactions__date">${transDate}</div>
                <div class="transactions__value">${formattedTrans}</div>
              </div>
              `;
        containerTransactions.insertAdjacentHTML('afterbegin', transactionsRow)
    });
};


const createNicknames = function (accs) {
    accs.forEach(function (acc) {
        acc.nickname = acc.userName
            .toLowerCase()
            .split(' ')
            .map(word => word[0])
            .join('');
    });
};
createNicknames(accounts);

const displayBalance = function(account) {
    const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
    account.balance = balance;
    labelBalance.textContent = formatCurrency(balance, account.locale, account.currency);
}

const displayTotal = function(account) {
    const depositsTotal = account.transactions.filter(trans =>
        trans > 0).reduce((acc, trans) => acc + trans, 0);
    labelSumIn.textContent = formatCurrency(depositsTotal, account.locale, account.currency);


    const withdrawalsTotal = account.transactions.filter( trans =>
        trans < 0).reduce((acc, trans) => acc + trans, 0);
    labelSumOut.textContent = formatCurrency(withdrawalsTotal, account.locale, account.currency);


    const interestTotal = account.transactions
        .filter(trans => trans > 0)
        .map(depos =>  (depos * account.interest) / 100)
        .filter((interest, index, arr) => { return interest >= 5})
        .reduce((acc, interest) => acc + interest, 0);
    labelSumInterest.textContent = formatCurrency(interestTotal, account.locale, account.currency);

};

const updateUi = function (account){
    displayTransactions(account);

    displayBalance(account);

    displayTotal(account);
}


btnClose.addEventListener('click',function (e) {
    e.preventDefault();
    const closeUser = inputCloseNickname.value;
    const closePin = +(inputClosePin.value);
    if (closeUser === currentAccount.nickname && closePin === currentAccount.pin){
        const currentAccountIndex = accounts.findIndex(account =>
            account.nickname === currentAccount.nickname);

        accounts.splice(currentAccountIndex, 1);
        containerApp.style.opacity = 0;
        labelWelcome.textContent = '?????????????? ?? ???????? ??????????????'
    }

    inputCloseNickname.value = '';
    inputClosePin.value = 0;

});
let currentAccount, currentLogOutTimer;

const startLogoutTimer = function() {

    const logoutTimerCallback = function () {
            const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
            const seconds = String(time % 60).padStart(2, '0');

            labelTimer.textContent = `${minutes}:${seconds}`;


            if (time === 0) {
                clearInterval(logoutTimer);
                containerApp.style.opacity = 0;
                labelWelcome.textContent = '?????????????? ?? ???????? ??????????????'
            }
            time--;
        };
    let time = 300;

    logoutTimerCallback();
   const logoutTimer = setInterval(logoutTimerCallback, 1000);

   return logoutTimer;
};



btnLogin.addEventListener('click', function (e){
    e.preventDefault();
    currentAccount = accounts.find(account => account.nickname === inputLoginUsername.value);
    console.log(currentAccount)

    if (currentAccount?.pin === +(inputLoginPin.value)) {
        containerApp.style.opacity = 100;

        labelWelcome.textContent = `?????????? ????????????????????, ${currentAccount.userName.split(' ')[0]}!`;

        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long',
        };

        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

        inputLoginUsername.value = '';
        inputLoginPin.value = '';
        inputLoginPin.blur();

        if (currentLogOutTimer)
            clearInterval(currentLogOutTimer);
         currentLogOutTimer = startLogoutTimer();


        updateUi(currentAccount);
    }
});


btnTransfer.addEventListener('click', function (e){
    e.preventDefault();
    const transferAmount = +(inputTransferAmount.value);
    const recipientNickname = inputTransferTo.value
    const recipientAccount = accounts.find(account => account.nickname === recipientNickname);

    inputTransferTo.value = '';
    inputTransferAmount.value = '';

    if (transferAmount > 0 && currentAccount.balance >= transferAmount
            && recipientAccount && currentAccount.nickname !== recipientAccount.nickname){
        currentAccount.transactions.push(-transferAmount);
        recipientAccount.transactions.push(transferAmount);

        currentAccount.transactionsDates.push(new Date().toISOString());
        recipientAccount.transactionsDates.push(new Date().toISOString());

        updateUi(currentAccount);

        clearInterval(currentLogOutTimer);
        currentLogOutTimer = startLogoutTimer();

    };
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const loanAmount = Math.floor(inputLoanAmount.value);

    if (loanAmount > 0 &&
        currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
    ) {
        setTimeout(function () {
            currentAccount.transactions.push(loanAmount);
            currentAccount.transactionsDates.push(new Date().toISOString());
            updateUi(currentAccount);
        }, 5000);
    }
        inputLoanAmount.value = '';

        clearInterval(currentLogOutTimer);
        currentLogOutTimer = startLogoutTimer();
});

let transactionsSorted = false;

btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayTransactions(currentAccount, !transactionsSorted);
    transactionsSorted = !transactionsSorted;
});

const logoImage = document.querySelector('.logo');
logoImage.addEventListener('click',function(){
    [...document.querySelectorAll('.transactions__row')].
    forEach(function (row, i){
        if(i % 2 === 0){
            row.style.backgroundColor = 'lightgrey';
        }
    });
});