const tabs = document.querySelectorAll(".tab")
const contents = document.querySelectorAll(".content")

tabs.forEach(tab => {
    tab.addEventListener("click", e => {
        //Remove previous active
        document.querySelector(".tab.active").classList.remove("active")
        document.querySelector(".content.active").classList.remove("active")

        //Add new active
        e.target.classList.add("active")
        document.querySelector(`.content[data-content="${e.target.dataset.tab}"]`).classList.add("active")
    })
})

