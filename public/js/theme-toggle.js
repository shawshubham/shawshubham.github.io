document.addEventListener("DOMContentLoaded", () => {
  const selectDesktop = document.getElementById("theme-select-desktop");
  const selectMobile = document.getElementById("theme-select-mobile");

  function applyTheme(theme) {
    if (theme === "auto") {
      const hour = new Date().getHours();
      theme = (hour >= 18 || hour < 6) ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
  }

  const saved = localStorage.getItem("theme") || "auto";
  if (selectDesktop) selectDesktop.value = saved;
  if (selectMobile) selectMobile.value = saved;
  applyTheme(saved);

  function syncTheme(e) {
    const selected = e.target.value;
    localStorage.setItem("theme", selected);
    applyTheme(selected);
    if (selectDesktop && e.target !== selectDesktop) selectDesktop.value = selected;
    if (selectMobile && e.target !== selectMobile) selectMobile.value = selected;
  }

  if (selectDesktop) selectDesktop.addEventListener("change", syncTheme);
  if (selectMobile) selectMobile.addEventListener("change", syncTheme);
});