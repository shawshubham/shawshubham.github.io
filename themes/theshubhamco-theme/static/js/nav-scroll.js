document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".nav-container");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  });