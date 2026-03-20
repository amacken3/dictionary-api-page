const searchForm = document.getElementById("search-form");
const wordInput = document.getElementById("word-input");
const resultsSection = document.getElementById("results-section");
const resultsDiv = document.getElementById("results");
const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

searchForm.addEventListener("submit", handleSearch);
//search event
async function handleSearch(event) {
    event.preventDefault();

    const word = getInputValue();
    const isValidInput = validateInput(word);
    clearResults();

    if (!isValidInput) {
        showResults();
        displayError("Please enter a valid word.");
        return;
    }
    const wordData = await fetchWordData(word);
    showResults();
    displayWordData(wordData);
    console.log(wordData);
}

function getInputValue() {
    return wordInput.value;
}

function validateInput(word) {
    
    if (word.trim().length === 0) {
        return false;
    } 
    
    return true;
}

function clearResults() {
    resultsDiv.textContent = "";
}

function showResults() {
    resultsSection.style.display = "block";
}

function displayError(message) {
    resultsDiv.textContent = message;
}

async function fetchWordData(word) {
    const url = `${DICTIONARY_API_URL}${word}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function extractWordData(wordData) {

}

function displayWordData(wordData) {
//word display
    const entry = wordData[0];
    const h2 = document.createElement("h2");
    h2.textContent = entry.word;
    resultsDiv.appendChild(h2);
//checks if phonetic exists if so creates and appends "p"  
    entry.phonetics.forEach((phonetic) => {
        const phoneticContainer = document.createElement("div")

        if (phonetic.text) {
            const phoneticText = document.createElement("p")
            phoneticText.textContent = phonetic.text;
            phoneticContainer.appendChild(phoneticText);
        }

        if (phonetic.audio) {
            const audioPlayer = document.createElement("audio");
        }
    })
//definitions
    entry.meanings.forEach((meaning) => {
        const h3 = document.createElement("h3");
        h3.textContent = meaning.partOfSpeech;
        resultsDiv.appendChild(h3);

        const ul = document.createElement("ul");

        meaning.definitions.forEach((definitionObj) => {
            const li = document.createElement("li");
            li.textContent = definitionObj.definition;
            ul.appendChild(li);
        })

        resultsDiv.appendChild(ul);
    })
}