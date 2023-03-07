import './styles/main.css'
import {depositCalculator} from "./modules/depositCalculator";
import creditCalculatorController from './controllers/creditCalculatorController'
import depositCalculatorController from "./controllers/depositCalculatorController";

//navigation
const calcSelect = document.querySelector('.nav__select')
calcSelect.addEventListener('change', (e) => {
    document.querySelectorAll("[class$='-calc']").forEach((calc) => {calc.style.display = 'none'})
    document.querySelector(`.${e.target.value}-calc`).style.display = 'block'
})
calcSelect.dispatchEvent(new Event('change'))

//credit calculator
const creditInput = document.querySelectorAll("[class^='credit-calc-input__'] > .input, .select")
creditInput.forEach((input) => input.addEventListener('input', creditCalculatorController))
creditCalculatorController()

//deposit calculator
const depositInput = document.querySelectorAll("[class^='deposit-calc-input__'] > .input")
depositInput.forEach((input) => input.addEventListener('input', depositCalculatorController))
depositCalculatorController()