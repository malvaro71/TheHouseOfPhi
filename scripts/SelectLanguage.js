function changeLanguage(languageCode) {
    Array.from(document.getElementsByClassName('lang')).forEach(function (elem) {
        if (elem.classList.contains('lang-' + languageCode)) {
             elem.style.display = "";
        }
        else {
             elem.style.display = 'none';
        }
    });
	// Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', languageCode);
}

// select handler
const selector = document.getElementById('langSelector');
selector.addEventListener('change', function (evt) {
    changeLanguage(this.value);
});

// detect initial browser language
const lang = navigator.userLanguage || navigator.language || 'en-EN';
let startLang = Array.from(selector.options).map(opt => opt.value).find(val => lang.includes(val)) || 'en';
// Check if a language has been stored in localStorage
if (localStorage.getItem('selectedLanguage')) {
    startLang = localStorage.getItem('selectedLanguage');
}
changeLanguage(startLang);

// updating select with start value
selector.selectedIndex = Array.from(selector.options).map(opt => opt.value).indexOf(startLang)

// fill "The selected language is:"
document.getElementById('browserLang').innerText = lang;
document.getElementById('startLang').innerText = startLang;
