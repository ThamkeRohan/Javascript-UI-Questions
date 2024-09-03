const secondHand = document.querySelector(".hand.second")
const minuteHand = document.querySelector(".hand.minute")
const hourHand = document.querySelector(".hand.hour")

setInterval(setClock, 1000)

function setClock() {
    const date = new Date()
    const secondsRatio = date.getSeconds() / 60
    const minutesRatio = (secondsRatio + date.getMinutes()) / 60
    const hoursRatio = (minutesRatio + date.getHours()) / 12

    setHand(secondHand, secondsRatio)
    setHand(minuteHand, minutesRatio)
    setHand(hourHand, hoursRatio)
}

function setHand(hand, rotationRatio) {
    hand.style.setProperty("--rotate", rotationRatio * 360)
}

setClock()