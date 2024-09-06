const xPosElem = document.querySelector(".value.x")
const yPosElem = document.querySelector(".value.y")

const displayPos = throttle(
    function (e) {
        console.log(this)
        xPosElem.textContent = e.clientX
        yPosElem.textContent = e.clientY
    },
    1000
) 

document.addEventListener("mousemove", displayPos)


function throttle(func, ms) {
    let isThrottled = false, savedArgs, savedThis

    function wrapper() {

        if(isThrottled) {
            savedArgs = arguments
            savedThis = this
            return 
        }

        isThrottled = true
        func.apply(this, arguments)
        setTimeout(() => {
            isThrottled = false
            if(savedArgs) {
                wrapper.apply(savedThis, savedArgs)
                savedArgs = savedThis = null
            }
        }, ms)
    }

    return wrapper
}