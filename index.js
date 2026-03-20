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
    
    try {
        const wordData = await fetchWordData(word);
        showResults();
        displayWordData(wordData);
        console.log(wordData);
    } catch (error) {
        showResults();
        displayError(error.message);
        console.error(error);
    }
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

    if (!response.ok) {
        throw new Error("Word not found. Please try another search.");
    }

    const data = await response.json();
    return data;
}
//displays word with def,syn, and phonetics
function displayWordData(wordData) {
    const entry = wordData[0];

    renderWordTitle(entry);
    renderPhonetics(entry.phonetics);
    renderDefinitions(entry.meanings);
}
//word entry 
function renderWordTitle(entry) {
    const wordHeading = document.createElement("h2");
    wordHeading.textContent = entry.word;
    resultsDiv.appendChild(wordHeading);
}
//phonetics
function renderPhonetics(phonetics) {
    phonetics.forEach((phonetic) => {
        const phoneticContainer = document.createElement("div");

        if (phonetic.text) {
            const phoneticText = document.createElement("p");
            phoneticText.textContent = phonetic.text;
            phoneticContainer.appendChild(phoneticText);
        }

        if (phonetic.audio) {
            const audioPlayer = document.createElement("audio");
            let audioUrl = phonetic.audio;

            if (audioUrl.startsWith("//")) {
                audioUrl = `https:${audioUrl}`;
            }

            audioPlayer.controls = true;
            audioPlayer.src = audioUrl;
            phoneticContainer.appendChild(audioPlayer);
        }

        if (phoneticContainer.children.length > 0) {
            resultsDiv.appendChild(phoneticContainer);
        }
    });
}
//definition
function renderDefinitions(meanings) {
    meanings.forEach((meaning) => {
        const partOfSpeechHeading = document.createElement("h3");
        partOfSpeechHeading.textContent = meaning.partOfSpeech;
        resultsDiv.appendChild(partOfSpeechHeading);

        const definitionsList = document.createElement("ul");

        meaning.definitions.forEach((definitionObj) => {
            const definitionItem = document.createElement("li");
            definitionItem.textContent = definitionObj.definition;
            definitionsList.appendChild(definitionItem);
        });

        resultsDiv.appendChild(definitionsList);
    });
}