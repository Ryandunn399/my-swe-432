const followBtnClass = 'material-symbols-outlined fav-page-btn md-34'

const followComponent = (name, desc, imgUrl, i) => {
    const followElement = document.createElement('div')
    followElement.className = 'follower-info'

    const image = document.createElement('img')
    image.src = imgUrl
    image.alt = name

    followElement.append(image)

    const textWrapper = document.createElement('div')
    textWrapper.className = 'follower-info-text'

    const nameDiv = document.createElement('div')
    const descDiv = document.createElement('div')

    nameDiv.className = 'dj-info-name'
    descDiv.className = 'dj-info-desc'

    nameDiv.innerHTML = name
    descDiv.innerHTML = desc

    textWrapper.append(nameDiv)
    textWrapper.append(descDiv)

    followElement.append(textWrapper)

    const followButton = document.createElement('button')
    followButton.className = followBtnClass
    followButton.id = `follow-btn-${i}`
    followButton.innerHTML = 'favorite'

    followElement.append(followButton)

    return followElement
}

/**
 * Read our json file that is current our "database"
 * 
 * @returns a JSON array of mock DJ names.
 */
async function database(dbName) {
    const res = await fetch(`../../data/${dbName}.json`);
    return await res.json();
}

const followListDiv = document.getElementById('follow-wrapper')

/**
 * Create array and load values
 */
following = []

function reloadPage () {
    followListDiv.innerHTML = ''

    for (let i = 0; i < following.length; i++) {
        const element = following[i];
        const name = element.name;
        const desc = element.description
        const imgUrl = element.imgUrl

        const newComponent = followComponent(name, desc, imgUrl, i)
        followListDiv.append(newComponent)

        const hr = document.createElement('hr')
        followListDiv.append(hr)
    }

    generateListeners()
}

/**
 * Use a query selector to attach event listeners to each button.
 */
function generateListeners() {

    const btns = document.querySelectorAll('.fav-page-btn')

    btns.forEach((btn) => {
        btn.addEventListener('mouseover', () => {
            btn.innerHTML = 'heart_broken'
        })

        btn.addEventListener('mouseout', () => {
            btn.innerHTML = 'favorite'
        })


        btn.addEventListener('click', (e) => {
            const id = e.target.id

            console.log(following)
            following.splice(parseInt(id.slice(-1)), 1)

            reloadPage()
        })
    })

}

async function loadFollowers () {
    await database('database_followers').then((data) => {

        data.forEach((element) => {
            following = [...following, element]
        })
    
    })

    reloadPage()
}

loadFollowers();