export function creditCalculatorAnnuityPayment(months, percent, amount) {
    const rate = percent / 1200;
    const monthlyPayment = Math.round(amount * rate * (1 + 1 / (Math.pow(1 + rate, months) - 1)) * 100) / 100;
    const overpayment = Math.round((monthlyPayment * months - amount) * 100) / 100;
    const duty = new Array(months)
    duty[0] = Math.round((amount + overpayment - monthlyPayment) * 100) / 100
    for (let i = 1; i < months - 1; i++) {
        duty[i] = Math.round((duty[i - 1] - monthlyPayment) * 100) / 100
    }
    duty[months - 1] = 0
    return [overpayment, duty, monthlyPayment];
}

export function creditCalculatorDifferentiatedPayment(months, percent, amount) {
    const basicPayment = Math.round((amount / months) * 100) / 100;
    const percentPerPayment = new Array(months);
    const payments = new Array(months);
    const creditBalance = new Array(months);
    let overpayment = 0;
    const rate = percent / 1200

    percentPerPayment[0] = Math.round(amount * rate * 100) / 100;
    creditBalance[0] = Math.round((amount - basicPayment) * 100) / 100;
    payments[0] = basicPayment + percentPerPayment[0];
    overpayment += percentPerPayment[0];

    for (let k = 1; k < months; k++) {

        percentPerPayment[k] = Math.round(creditBalance[k - 1] * rate * 100) / 100;

        if (k === months - 1) {
            payments[k] = Math.round((creditBalance[k - 1] + percentPerPayment[k]) * 100) / 100;
        }
        else {
            payments[k] = basicPayment + percentPerPayment[k];
        }

        if (k === months - 1) {
            creditBalance[k] = 0
        }
        else {
            creditBalance[k] = Math.round((creditBalance[k - 1] - basicPayment) * 100) / 100;
        }

        overpayment += percentPerPayment[k];
    }

    return [payments, percentPerPayment, basicPayment, creditBalance, Math.round(overpayment * 100) / 100];
}
