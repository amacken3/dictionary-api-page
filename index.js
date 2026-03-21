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
    } catch (error) {
        showResults();
        displayError(error.message);
        console.error(error);
    }
}

function getInputValue() {
    return wordInput.value.trim();
}

function validateInput(word) {
    return word.length > 0;
}
//results
function clearResults() {
    resultsDiv.textContent = "";
}

function showResults() {
    resultsSection.style.display = "block";
}
//error message display
function displayError(message) {
    const errorText = document.createElement("p");
    errorText.classList.add("error-message", "fade-in");
    errorText.textContent = message;
    resultsDiv.appendChild(errorText);
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
//renders fetched word data
function displayWordData(wordData) {
    const entry = wordData[0];

    renderWordTitle(entry);
    renderPhonetics(entry.phonetics);
    renderDefinitions(entry.meanings);
    renderSynonyms(entry.meanings);
}
//word entry 
function renderWordTitle(entry) {
    const wordHeading = document.createElement("h2");
    wordHeading.classList.add("fade-in");
    wordHeading.textContent = entry.word;
    resultsDiv.appendChild(wordHeading);
}
//phonetics
function renderPhonetics(phonetics) {
    phonetics.forEach((phonetic) => {
        const phoneticBlock = createPhoneticBlock(phonetic);

        if (phoneticBlock) {
            resultsDiv.appendChild(phoneticBlock);
        }
    });
}

function createPhoneticBlock(phonetic) {
    const phoneticContainer = document.createElement("div");
    phoneticContainer.classList.add("phonetic-row", "fade-in");

    let hasContent = false;

    if (phonetic.audio) {
        let audioUrl = phonetic.audio;

        if (audioUrl.startsWith("//")) {
            audioUrl = `https:${audioUrl}`;
        }

        const audioPlayer = document.createElement("audio");
        audioPlayer.src = audioUrl;
        audioPlayer.style.display = "none";

        const playButton = createPlayButton(audioPlayer);
        playButton.classList.add("play-button");

        phoneticContainer.appendChild(playButton);
        phoneticContainer.appendChild(audioPlayer);
        hasContent = true;
    }

    if (phonetic.text) {
        const phoneticText = document.createElement("p");
        phoneticText.textContent = phonetic.text;
        phoneticText.classList.add("phonetic-text");
        phoneticContainer.appendChild(phoneticText);
        hasContent = true;
    }

    return hasContent ? phoneticContainer : null;
}

function createPlayButton(audioPlayer) {
    const playButton = document.createElement("button");
    playButton.textContent = "▶";
    playButton.type = "button";

    playButton.addEventListener("click", () => {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });

    return playButton;
}
//definition
function renderDefinitions(meanings) {
    meanings.forEach((meaning) => {
        const partOfSpeechHeading = document.createElement("h3");
        partOfSpeechHeading.classList.add("part-of-speech-heading", "fade-in")
        partOfSpeechHeading.textContent = meaning.partOfSpeech;
        resultsDiv.appendChild(partOfSpeechHeading);

        const definitionsList = document.createElement("ul");
        definitionsList.classList.add("definitions-list");

        meaning.definitions.forEach((definitionObj) => {
            const definitionItem = document.createElement("li");
            definitionItem.textContent = definitionObj.definition;
            definitionItem.classList.add("definition-list-item", "fade-in");
            definitionsList.appendChild(definitionItem);
        });

        resultsDiv.appendChild(definitionsList);
    });
}
//synonyms
function renderSynonyms(meanings) {
    const synonyms = [];

    meanings.forEach((meaning) => {
        meaning.definitions.forEach((definitionObj) => {
            if (Array.isArray(definitionObj.synonyms) && definitionObj.synonyms.length > 0) {
                definitionObj.synonyms.forEach((synonym) => {
                    if (!synonyms.includes(synonym)) {
                        synonyms.push(synonym);
                    }
                });
            }
        });
    });

    if (synonyms.length > 0) {
        const synonymsHeading = document.createElement("h3");
        synonymsHeading.textContent = "Synonyms";
        synonymsHeading.classList.add("synonyms-heading", "fade-in");
        resultsDiv.appendChild(synonymsHeading);

        const synonymsList = document.createElement("ul");
        synonymsList.classList.add("synonyms-list")

        synonyms.forEach((synonym) => {
            const synonymItem = document.createElement("li");
            synonymItem.classList.add("synonym-item", "fade-in");
            synonymItem.textContent = synonym;
            synonymsList.appendChild(synonymItem);
        });

        resultsDiv.appendChild(synonymsList);
    }
}
