// ============================================================================
// indexPage.js — Language selector for index.html
// ============================================================================

// Show only the elements whose lang attribute matches the selected language
function showLanguage(lang) {
    // Update the <html> element's language attribute
    // This improves accessibility, SEO, and ensures screen readers use the correct language
    document.documentElement.setAttribute("lang", lang);

    // Show only the elements whose lang attribute matches the selected language
    document.querySelectorAll(".lang").forEach(el => {
        // Display the element if its lang matches the selected one, otherwise hide it
        el.style.display = el.getAttribute("lang") === lang ? "" : "none";
    });
}

// Initialize language selector
function initLanguageSelector() {
    const langSelector = document.getElementById("langSelector");
    if (!langSelector) return;

    // Load saved language or default to selector value
    const savedLang = localStorage.getItem("preferredLang");
    const initialLang = savedLang || langSelector.value;

    langSelector.value = initialLang;
    showLanguage(initialLang);

    // Update language on change
    langSelector.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem("preferredLang", selectedLang);
        showLanguage(selectedLang);
    });
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", initLanguageSelector);
