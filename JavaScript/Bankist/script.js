'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Varun Dobhal',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Vedant Dobhal',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Vaibhav Dobhal',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Parents',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2024-11-25T14:43:26.374Z',
    '2024-11-23T18:49:59.371Z',
    '2024-11-24T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

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
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Update UI:-

const updateUi = function (currentAccount) {
  dispaly(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

// Date Function:-

const formattedDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 3600 * 24));

  const daysPAssed = calcDaysPassed(new Date(), date);

  if (daysPAssed === 0) return 'Today';
  if (daysPAssed === 1) return 'Yesterday';
  if (daysPAssed <= 7) return `${daysPAssed} days ago`;
  return new Intl.DateTimeFormat('en-US').format(date);
};

// Formated Number:-

const formatCur = function (value, currency) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Implementing Timeout:-

const startTimeout = function () {
  let time = 300;

  const timer = setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'login To Your Account:';
      containerApp.style.opacity = 0;
    }
    time--;
  }, 1000);
  return timer;
};

// Displaying Details:-

const dispaly = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const mov = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  mov.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.movementsDates[index]);
    const dispalyDate = formattedDate(date);
    const formateNumber = formatCur(mov, 'INR');

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__date">${dispalyDate}</div>
        <div class="movements__value">${formateNumber}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Computing user names:-

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};
createUsernames(accounts);

// Login Section:-
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // user
  currentAccount = accounts.find(function (accounts) {
    return accounts.username === inputLoginUsername.value;
  });
  // pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // clear input fields:-
    inputLoginUsername.value = inputLoginPin.value = '';

    if (timer) clearInterval(timer);
    timer = startTimeout();

    updateUi(currentAccount);
  }
});

// Current Balance Calculations:-

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(account.balance, 'INR');
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
};

// Calculation Summary:-

const calcDisplaySummary = function (accounts) {
  // IN:
  const income = accounts.movements
    .filter(function (movements) {
      return movements > 0;
    })
    .reduce(function (acc, movements) {
      return acc + movements;
    }, 0);
  labelSumIn.textContent = formatCur(income, 'INR');

  // OUT:
  const outcome = accounts.movements
    .filter(function (movements) {
      return movements < 0;
    })
    .reduce(function (acc, movements) {
      return acc + movements;
    }, 0);
  labelSumOut.textContent = formatCur(outcome, 'INR');

  // INTEREST:
  const interest = accounts.movements
    .filter(function (movements) {
      return movements > 0;
    })
    .map(function (movements) {
      return (movements * accounts.interestRate) / 100;
    })
    .reduce(function (acc, movements) {
      return acc + movements;
    }, 0);
  labelSumInterest.textContent = formatCur(interest, 'INR');
};

// Implementing Transfer:-

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    account => account.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Transfer Date:-
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUi(currentAccount);

    clearInterval(timer);
    timer = startTimeout();
  }
});

// Implementing Loan:-

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(Number(inputLoanAmount.value));
  if (
    amount > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= amount / 10;
    })
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUi(currentAccount);

      clearInterval(timer);
      timer = startTimeout();
    }, 5000);
  }
  inputLoanAmount.value = '';
});

// Implementing Close:-
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    Number(inputClosePin.value) === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.username
  ) {
    const index = accounts.findIndex(function (account) {
      return account.username === currentAccount.username;
    });
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

// Implementing Sort Button:-

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  dispaly(currentAccount, !sorted);
  sorted = !sorted;
});

const o = {
  style: 'currency',
  currency: 'EUR',
};
