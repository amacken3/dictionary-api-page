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
    console.log(word);

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

function hideResults() {

}

function displayError(message) {
    resultsDiv.textContent = message;
}

function fetchWordData(word) {

}

function extractWordData(wordData) {

}

function displayWordData(wordData) {

}