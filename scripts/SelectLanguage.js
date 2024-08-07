function changeLanguage(languageCode) {
    // Extract base URL from the current filename
    const fileName = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    const fileNameParts = fileName.split("_"); // Split by underscore
    const baseUrl = fileNameParts.slice(0, -1).join("_") + "_"; // Join all parts except the last two

    // Update URL with new language code
    window.location.href = `${baseUrl}${languageCode}.html`;

    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', languageCode);
}

// select handler
const selector = document.getElementById("langSelector");
selector.addEventListener("change", function (evt) {
    changeLanguage(this.value);
});

// 2. Detecting Initial Browser Language:
/*This line attempts to retrieve the user's preferred browser language in the following order:
navigator.userLanguage: This property is less common but might hold the user's language preference.
navigator.language: This is a more widely supported property that provides the browser's language preference.
If both properties are unavailable, it defaults to "en" (English) as a fallback. */
const lang = navigator.userLanguage || navigator.language || 'en';

// 3. Finding Matching Language Option:
/*This line determines the initial language to display based on the user's browser language and the available options in the language selector (selector). Here's the breakdown:
Array.from(selector.options): Converts the options collection of the selector element to a regular array.
.map(opt => opt.value): Iterates through each option in the array and extracts its value property (the language code). This creates a new array containing just the language codes from the options.
.find(val => lang.includes(val)): Uses the find method to search for the first element (language code) in the new array where the user's browser language (lang) includes that code (e.g., if lang is "es-ES", it might find "es").
If a match is found, it becomes the startLang.
|| 'en': If no matching language code is found in the selector options, it defaults to "en" for English.*/
let startLang = Array.from(selector.options).map(opt => opt.value).find(val => lang.includes(val)) || 'en';

// 4. Checking for Stored Language Preference:
/* This block checks if a language preference has been previously stored in the browser's localStorage using the key "selectedLanguage".
If a stored language exists, it overwrites the startLang variable, prioritizing the user's previous selection.*/
if (localStorage.getItem('selectedLanguage')) {
    startLang = localStorage.getItem('selectedLanguage');
}
// 5. Setting Initial Language and Display:
/* This line determines the initial language to display based on the user's browser language and the available options in the language selector (selector). Here's the breakdown:
changeLanguage(startLang);*/

/* This line sets the selected index of the language selector (selector) to match the startLang. It uses a similar approach as before to find the index of the option with the matching language code.*/
selector.selectedIndex = Array.from(selector.options).map(opt => opt.value).indexOf(startLang)