const billInput = document.getElementById('bill');
const tips = document.querySelectorAll('.tips__tip-btn');
const tipInput = document.getElementById('tip');
const peopleField = document.querySelector('.people_field');
const peopleInput = document.getElementById('people');
const tipAmountField = document.querySelector('.tip_result__tip-amount');
const totalAmountField = document.querySelector('.total_result__total-amount');
const resetBtn = document.querySelector('.col_2__reset-btn');

let bill = 0;
let amount = 0;

billInput.addEventListener('focusout', e => {
    if (e.target.value === '' && peopleInput.value === '' || e.target.value === '0' && peopleInput.value === '0' ||
        e.target.value === '' && peopleInput.value === '0' || e.target.value === '0' && peopleInput.value === '') {
        peopleField.classList.contains('error') ? peopleField.classList.remove('error') : null;
        resetBtn.classList.contains('enabled') ? resetBtn.classList.remove('enabled') : null;
        return;
    }
    if (peopleInput.value === '' || peopleInput.value === '0') {
        peopleField.classList.add('error');
        resetBtn.classList.add('enabled');
        bill = +e.target.value;
        return;
    }
    resetBtn.classList.add('enabled');
    bill = +e.target.value;
    amount = (bill / +peopleInput.value).toFixed(2);
    totalAmountField.innerHTML = `&dollar;${amount}`;
});

billInput.addEventListener('input', () => {
    tips.forEach(tip => {
        tip.classList.contains('selected') ? tip.classList.remove('selected') : null;
    });
    tipAmountField.innerHTML = '&dollar;0.00';
});

peopleInput.addEventListener('input', e => {
    peopleField.classList.contains('error') && e.target.value !== '' || e.target.value !== '0' ? peopleField.classList.remove('error') : null;
    tips.forEach(tip => {
        tip.classList.contains('selected') ? tip.classList.remove('selected') : null;
    });
    tipAmountField.innerHTML = '&dollar;0.00';
});

peopleInput.addEventListener('focusout', e => {
    if (billInput.value === '' || billInput.value === '0') {
        peopleField.classList.contains('error') ? peopleField.classList.remove('error') : null;
        resetBtn.classList.contains('enabled') ? resetBtn.classList.remove('enabled') : null;
        return;
    }
    if(e.target.value === '' || e.target.value === '0') {
        peopleField.classList.add('error');
        totalAmountField.innerHTML = '&dollar;0.00';
        resetBtn.classList.contains('enabled') ? resetBtn.classList.remove('enabled') : null;
        return;
    }
    !resetBtn.classList.contains('enabled') ? resetBtn.classList.add('enabled') : null;
    amount = +(bill / +e.target.value).toFixed(2);
    totalAmountField.innerHTML = `&dollar;${amount}`;
});

tipInput.addEventListener('focusout', e => {
    tips.forEach(tip => {
        tip.classList.contains('selected') ? tip.classList.remove('selected') : null;
    });
    if (amount === 0) {
        tipInput.value = '';
        return;
    }
    tipAmountField.innerHTML = `&dollar;${((+tipInput.value / 100) * amount).toFixed(2)}`;
    tipInput.value = '';
});

tips.forEach((tip, i) => {
    tip.addEventListener('click', e => {
        e.preventDefault();
        tip.classList.add('selected');
        tips.forEach((tp, idx) => {
            if (idx !== i && tp.classList.contains('selected')) {
                tp.classList.remove('selected');
            };
        });
        if (amount === 0) {
            tip.classList.remove('selected');
            return;
        }
        tipAmountField.innerHTML = `&dollar;${((+tip.dataset.tip / 100) * amount).toFixed(2)}`;
    });
});

resetBtn.addEventListener('click', e => {
    e.preventDefault();
    e.target.classList.remove('enabled');
    peopleField.classList.contains('error') ? peopleField.classList.remove('error') : null;
    billInput.value = '';
    tipInput.value = '';
    peopleInput.value = '';
    totalAmountField.innerHTML = '&dollar;0.00';
    tipAmountField.innerHTML = '&dollar;0.00';
    tips.forEach(tip => tip.classList.contains('selected') ? tip.classList.remove('selected') : null);
});