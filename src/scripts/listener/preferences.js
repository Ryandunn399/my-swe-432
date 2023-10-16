/**
 * Array of our preferences so we can add or remove them
 * as needed.
 */
let preferences = []

/**
 * Will create a preference button for us.
 * 
 * @param {*} pref the preference text we would like to place as the button's value.
 * @returns a button element.
 */
const prefElement = (pref, id) => {
    const prefBox = document.createElement('button');
    prefBox.className = 'pref-div';
    prefBox.id = `pref-div-${id}`
    prefBox.innerHTML = pref
    return prefBox;
}

/**
 * This is the div container that will hold all our preferences.
 */
const preferenceWrapper = document.getElementById('pref-wrapper')

/**
 * Will reload all the values currently placed within our preferences array.
 */
function refreshValues() {
    preferenceWrapper.innerHTML = ''
    
    for (let i = 0; i < preferences.length; i++) {
        const prefButton = prefElement(preferences[i], i)
        preferenceWrapper.appendChild(prefButton)
    }
}

/**
 * The text input form.
 */
const prefForm = document.getElementById("pref-form")

/**
 * Will handle the submission, or adding of the preference
 */
prefForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const textBar = document.getElementById('pref-input')
    const textValue = textBar.value;

    if (!textValue || textValue === '') {
        alert("Must input a valid preference.")
        return;
    }

    if (preferences.includes(textValue.toLowerCase())) {
        alert("Preference already added.");
        return;
    }

    preferences = [...preferences, textValue.toLowerCase()]

    textBar.value = ''

    refreshValues()
})

/**
 * 
 */
preferenceWrapper.addEventListener("click", (e) => {
    const value = e.target.innerHTML;
    const index = preferences.indexOf(value.toLowerCase())
    
    if (index > -1) {
        preferences.splice(index, 1)
        refreshValues()
    }
})






