export function depositCalculator(period, deposit, percent) {
    const rate = percent / 1200
    const profit = new Array(period);
    const balance = new Array(period);

    let currrentProfit = Math.round(deposit * rate * 100) / 100;
    balance[0] = Math.round((deposit + currrentProfit) * 100) / 100;
    profit[0] = currrentProfit;

    for (let month = 1; month < period; month++) {
        currrentProfit = Math.round(balance[month - 1] * rate * 100) / 100;
        balance[month] = Math.round((balance[month - 1] + currrentProfit) * 100) / 100;
        profit[month] = currrentProfit;
    }
    const payment = balance[period - 1]
    const income = Math.round((payment - deposit) * 100) / 100

    return [profit, balance, payment, income];
}
