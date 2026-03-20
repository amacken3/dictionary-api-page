const searchForm = document.getElementById("search-form");
const wordInput = document.getElementById("word-input");
const resultsSection = document.getElementById("results-section");
const resultsDiv = document.getElementById("results");

searchForm.addEventListener("submit", handleSearch);

async function handleSearch(event) {
    event.preventDefault();

    const word = getInputValue();
    console.log(word);

}

function getInputValue() {
    return wordInput.value;
}

function validateInput(word) {

}

function clearResults() {

}

function showResults() {

}

function hideResults() {

}

function displayError(message) {

}

function fetchWordData(word) {

}

function extractWordData(wordData) {

}

function displayWordData(wordData) {

}