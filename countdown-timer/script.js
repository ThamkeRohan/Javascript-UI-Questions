const daysElem = document.querySelector(".days")
const hoursElem = document.querySelector(".hours")
const minutesElem = document.querySelector(".minutes")
const secondsElem = document.querySelector(".seconds")
const dateElem = document.querySelector("input[type='date']")
const timeElem = document.querySelector("input[type='time']")
const formElem = document.querySelector(".countdown-form")
const startBtnElem = document.querySelector(".start-btn")
const resetBtnElem = document.querySelector(".reset-btn")

let targetTime = null
let intervalId = null

formElem.addEventListener("submit", onCounterStart)

resetBtnElem.addEventListener("click", onReset)

function onCounterStart(e) {
    e.preventDefault()

    dateElem.disabled = true
    timeElem.disabled = true
    startBtnElem.classList.remove("show")
    resetBtnElem.classList.add("show")
    
    targetTime = dateElem.value + "T" + timeElem.value
    intervalId = setInterval(setTime, 1000)
}

function setTime() {
    const {days, hours, minutes, seconds, remainingTime} = getTime()

    daysElem.textContent = String(days).padStart(2, "0")
    hoursElem.textContent = String(hours).padStart(2, "0")
    minutesElem.textContent = String(minutes).padStart(2, "0")
    secondsElem.textContent = String(seconds).padStart(2, "0")

    if(remainingTime <= 0) {
        onReset()
    }
}

function getTime() {
    const endTime = new Date(targetTime)
    const currTime = new Date()

    const remainingTime = Math.trunc((endTime - currTime) / 1000)

    const oneMinute = 60
    const oneHour = oneMinute * 60
    const oneDay = oneHour * 24

    const days = Math.trunc(remainingTime / oneDay)

    const hours = Math.trunc((remainingTime % oneDay) / oneHour)

    const minutes = Math.trunc((remainingTime % oneHour) / oneMinute )

    const seconds = remainingTime % oneMinute

    

    return {days, hours, minutes, seconds, remainingTime}
}

function onReset() {
    formElem.reset()
    dateElem.disabled = false
    timeElem.disabled = false
    startBtnElem.classList.add("show")
    resetBtnElem.classList.remove("show")

    daysElem.textContent = "00"
    hoursElem.textContent = "00"
    minutesElem.textContent = "00"
    secondsElem.textContent = "00"

    clearInterval(intervalId)
    intervalId = null
    targetTime = null 
}