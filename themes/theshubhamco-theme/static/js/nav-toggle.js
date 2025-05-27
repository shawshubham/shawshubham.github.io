document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
  
    toggleBtn.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  });