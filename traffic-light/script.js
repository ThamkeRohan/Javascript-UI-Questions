const redLightElem = document.querySelector(".red")
const yellowLightElem = document.querySelector(".yellow")
const greenLightElem = document.querySelector(".green")

const redDuration = 4000
const yellowDuration = 500
const greenDuration = 3000

function turnOffActiveLight() {
    document.querySelector(".light.active").classList.remove("active")
}

function trafficLightCycle() {
    setTimeout(() => {
        turnOffActiveLight()
        redLightElem.classList.add("active")
    }, 0)

    setTimeout(() => {
        turnOffActiveLight()
        greenLightElem.classList.add("active")
    }, redDuration)

    setTimeout(() => {
        turnOffActiveLight()
        yellowLightElem.classList.add("active")
    }, redDuration + greenDuration)
}

function startTrafficLight() {
    trafficLightCycle()
    setInterval(trafficLightCycle, redDuration + greenDuration + yellowDuration)
}

startTrafficLight()