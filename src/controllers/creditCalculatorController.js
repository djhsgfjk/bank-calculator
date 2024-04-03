import {creditCalculatorAnnuityPayment, creditCalculatorDifferentiatedPayment} from "../modules/creditCalculator";

function annuityPaymentController(months, amount, percent) {
    const [overpayment, duty, monthlyPayment] = creditCalculatorAnnuityPayment(months, percent, amount)
    console.log(overpayment, duty, monthlyPayment)
    document.querySelector('.credit-payment__output').textContent = amount + overpayment + ' $'
    document.querySelector('.credit-overpayment__output').textContent = overpayment + ' $'

    const table = document.querySelector('.credit-schedule__table')
    const thead = table.firstElementChild
    const tbody = table.lastElementChild
    let new_thead = document.createElement('thead')
    new_thead.innerHTML = '<th>Month</th><th>Loan payment</th><th>Remaining debt</th>'
    let new_tbody = document.createElement('tbody')
    for (let i = 0; i < months; i++) {
        let row = new_tbody.insertRow(i)
        row.insertCell(0).textContent = i + 1
        row.insertCell(1).textContent = monthlyPayment.toFixed(2)
        row.insertCell(2).textContent = duty[i].toFixed(2)
    }
    table.replaceChild(new_thead, thead)
    table.replaceChild(new_tbody, tbody)
}

function differentiatedPaymentController(months, amount, percent) {
    const [payments, percentPerPayment, basicPayment, creditBalance, overpayment] = creditCalculatorDifferentiatedPayment(months, percent, amount)
    console.log(payments, percentPerPayment, basicPayment, creditBalance, overpayment)
    document.querySelector('.credit-payment__output').textContent = amount + overpayment + ' $'
    document.querySelector('.credit-overpayment__output').textContent = overpayment + ' $'

    const table = document.querySelector('.credit-schedule__table')
    const thead = table.firstElementChild
    const tbody = table.lastElementChild
    let new_thead = document.createElement('thead')
    new_thead.innerHTML = '<th>Месяц</th><th>Loan payment</th><th>Interest</th><th>Main part</th><th>Remaining debt</th>'
    let new_tbody = document.createElement('tbody')
    for (let i = 0; i < months; i++) {
        let row = new_tbody.insertRow(i)
        row.insertCell(0).textContent = i + 1
        row.insertCell(1).textContent = payments[i].toFixed(2)
        row.insertCell(2).textContent = percentPerPayment[i].toFixed(2)
        row.insertCell(3).textContent = (Math.round((payments[i] - percentPerPayment[i]) *  100) / 100).toFixed(2)
        row.insertCell(4).textContent = creditBalance[i].toFixed(2)
    }

    table.replaceChild(new_thead, thead)
    table.replaceChild(new_tbody, tbody)
}

export default function creditCalculatorController() {
    const repaymentType = document.querySelector(".credit-repayment__select select").value
    console.log(repaymentType)

    const creditInput = Array.from(document.querySelectorAll("[class^='credit-calc-input__'] > [class$='input'] > input")).map(input => +input.value)
    console.log(creditInput)
    if (repaymentType === 'annuity')
        annuityPaymentController(...creditInput)
    else
        differentiatedPaymentController(...creditInput)
}