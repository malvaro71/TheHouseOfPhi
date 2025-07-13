
document.addEventListener("DOMContentLoaded", () => {
  const langSelector = document.getElementById("langSelector");

  function showLanguage(lang) {
    // Muestra el idioma seleccionado y oculta los demás
    document.querySelectorAll(".lang").forEach(el => {
      // Oculta si el atributo lang no coincide con el seleccionado
      el.style.display = el.getAttribute("lang") === lang ? "" : "none";
    });
  }

  // Recupera el idioma guardado o usa el valor actual del selector
  const savedLang = localStorage.getItem("preferredLang");
  const initialLang = savedLang || langSelector.value;
  langSelector.value = initialLang;
  showLanguage(initialLang);

  langSelector.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("preferredLang", selectedLang);
    showLanguage(selectedLang);
  });
});