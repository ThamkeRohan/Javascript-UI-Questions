const inputElem = document.querySelector("input")
const resultElem = document.querySelector(".result")

inputElem.addEventListener("input", debounce(onChange, 1000))

function debounce(func, ms) {
    let timeout
    return function(...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), ms);
    }
}

function fetchData(query) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(`Result for the query: ${query}`), 0)
    })
}

async function onChange() {
    const result = await fetchData(this.value)
    console.log(result)
    resultElem.textContent = result
}