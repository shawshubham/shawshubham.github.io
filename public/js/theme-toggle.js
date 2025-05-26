document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("theme-select");
  
    function applyTheme(theme) {
      if (theme === "auto") {
        const hour = new Date().getHours();
        theme = (hour >= 18 || hour < 6) ? "dark" : "light";
      }
  
      document.documentElement.setAttribute("data-theme", theme);
    }
  
    const saved = localStorage.getItem("theme") || "auto";
    select.value = saved;
    applyTheme(saved);
  
    select.addEventListener("change", () => {
      const selected = select.value;
      localStorage.setItem("theme", selected);
      applyTheme(selected);
    });
  });