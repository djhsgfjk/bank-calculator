import {depositCalculator} from "../modules/depositCalculator";

export default function depositCalculatorController() {
    const [period, deposit, percent] = Array.from(document.querySelectorAll("[class^='deposit-calc-input__'] > [class$='input'] > input")).map(input => +input.value)
    console.log(period, deposit, percent)

    const [profit, balance, payment, income] = depositCalculator(period, deposit, percent)
    console.log('deposit', profit, balance, payment, income)
    document.querySelector('.deposit-payment__output').textContent = payment + ' $'
    document.querySelector('.deposit-income__output').textContent = income + ' $'

    const table = document.querySelector('.deposit-schedule__table')
    const tbody = table.lastElementChild
    let new_tbody = document.createElement('tbody')
    for (let i = 0; i < period; i++) {
        let row = new_tbody.insertRow(i)
        row.insertCell(0).textContent = i + 1
        row.insertCell(1).textContent = profit[i].toFixed(2)
        row.insertCell(2).textContent = balance[i].toFixed(2)
    }
    table.replaceChild(new_tbody, tbody)
}