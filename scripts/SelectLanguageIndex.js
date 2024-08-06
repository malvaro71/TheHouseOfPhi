/* This code snippet provides a mechanism to dynamically change the visibility of your HTML content based on the user's language selection. It retrieves elements with the lang attribute, checks their language code against the selected language, and shows or hides them accordingly. The optional storage in localStorage allows the code to potentially remember the user's preference for future visits.*/

// 1. defines a function called changeLanguage and sets up a handler for the language selector element.
function changeLanguage(languageCode) {
    // retrieves all elements on the page that have the lang attribute set, regardless of its specific value.
    const elements = document.querySelectorAll('[lang]');
  
    elements.forEach(function (element) {
      // Check if the element's lang attribute value matches the languageCode
      if (element.getAttribute('lang') === languageCode) {
        element.style.display = ""; // Show the element
      } else {
        element.style.display = "none"; // Hide the element
      }
    });
  
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
/* This line determines the initial language to display based on the user's browser language and the available options in the language selector (selector). Here's the breakdown:*/
changeLanguage(startLang);

/* This line sets the selected index of the language selector (selector) to match the startLang. It uses a similar approach as before to find the index of the option with the matching language code.*/
selector.selectedIndex = Array.from(selector.options).map(opt => opt.value).indexOf(startLang)

