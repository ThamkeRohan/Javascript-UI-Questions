const jobPostingsListElem = document.querySelector(".job-postings-list")
const loadMoreBtnElem = document.querySelector(".load-more-btn")

const PAGE_SIZE = 6
let currentPage = 0

getJobs()

loadMoreBtnElem.addEventListener("click", getJobs)

async function getJobIds() {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
    const jobIds = await res.json()

    return jobIds.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
}

async function getJob(jobId) {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
    const job = await res.json()
    return job
}

async function getJobs() {
    loadMoreBtnElem.textContent = "Loading..."

    const jobIds = await getJobIds()
    const jobs = await Promise.all(
        jobIds.map(jobId => getJob(jobId))
    )

    loadMoreBtnElem.textContent = "Load more"
    currentPage++

    jobs.forEach(job => createJobPostingElem(job))
}

function createJobPostingElem(job) {
    const jobPostingElem = document.createElement("li")
    jobPostingElem.classList.add("job-posting")

    const postTitleElem = document.createElement("a")
    postTitleElem.href = job.url
    postTitleElem.classList.add("post-title")
    const h3Elem = document.createElement("h3")
    h3Elem.textContent = job.title
    postTitleElem.appendChild(h3Elem)

    const metaElem = document.createElement("div")
    metaElem.classList.add("meta")

    const posterElem = document.createElement("p")
    posterElem.classList.add("poster")
    posterElem.textContent = `By ${job.by}`

    const dateElem = document.createElement("p")
    dateElem.classList.add("date")
    dateElem.textContent = job.time

    metaElem.append(posterElem, dateElem)

    jobPostingElem.append(postTitleElem, metaElem)

    jobPostingsListElem.appendChild(jobPostingElem)
}