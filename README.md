# Wordly

Wordly is a single-page dictionary web application that allows users to search for a word and view its definitions, pronunciation, audio pronunciation, and synonyms using data from the Free Dictionary API.

## Features

- Search for any valid English word
- Display multiple definitions
- Show parts of speech
- Show phonetic spellings
- Play pronunciation audio with a custom play button
- Display synonyms when available
- Handle invalid searches with a user-friendly error message
- Responsive layout for desktop and mobile devices

## Technologies Used

- HTML
- CSS
- JavaScript
- Free Dictionary API

## API

This project uses the Free Dictionary API:

`https://api.dictionaryapi.dev/api/v2/entries/en/<word>`

## How It Works

1. The user enters a word into the search field.
2. JavaScript listens for the form submission.
3. The app prevents the page from reloading.
4. A request is sent to the Dictionary API.
5. The returned data is displayed dynamically in the results section.

## Project Structure

- `index.html` – page structure
- `style.css` – styling and responsive design
- `index.js` – app logic, API calls, and DOM rendering

## Error Handling

The app checks for:
- empty input
- invalid words
- unsuccessful API responses

If a search fails, the user sees a clear error message instead of the app breaking.

## Responsive Design

The layout is designed to work well on:
- desktop
- tablet
- mobile devices

## Author

Aengus MacKenzie