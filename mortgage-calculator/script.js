const formElem = document.querySelector(".form")
const monthlyPaymentElem = document.querySelector(".result .monthly-payment")
const totalPaymentElem = document.querySelector(".result .total-payment")
const totalInterestElem = document.querySelector(".result .total-interest")

formElem.addEventListener("submit", e => {
    e.preventDefault()

    const data = new FormData(e.target)

    const loanAmount = Number(data.get("loan-amount"))
    const monthlyInterestRate = Number(data.get("interest-rate")) / 100 / 12
    const loanTermInMonth = Number(data.get("loan-term")) * 12

    const {
        monthlyMortgage,
        totalPayment,
        totalInterest
    } = calculate(loanAmount, monthlyInterestRate, loanTermInMonth)

    showResult(monthlyMortgage, totalPayment, totalInterest)

})

function calculate(loanAmount, monthlyInterestRate, loanTermInMonth) {
    const monthlyMortgage = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermInMonth)) /
    (Math.pow(1 + monthlyInterestRate, loanTermInMonth) - 1)

    const totalPayment = monthlyMortgage * loanTermInMonth

    const totalInterest = totalPayment - loanAmount

    return {
        monthlyMortgage,
        totalPayment,
        totalInterest
    }
}

function showResult(monthlyMortgage, totalPayment, totalInterest) {
    const currencyFormatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    })

    monthlyPaymentElem.textContent = currencyFormatter.format(monthlyMortgage)
    totalPaymentElem.textContent = currencyFormatter.format(totalPayment)
    totalInterestElem.textContent = currencyFormatter.format(totalInterest)
}