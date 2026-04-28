import "./style.css";
// 1. Logika Dark Mode
const initDarkMode = () => {
  const themeToggle = document.querySelector("#theme-toggle");
  const htmlElement = document.documentElement;

  // Cek preferensi pengguna di local storage atau sistem
  const isDark =
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Set tema awal
  if (isDark) {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }

  // Event Listener untuk tombol toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      htmlElement.classList.toggle("dark");

      // Simpan pilihan ke localStorage agar tidak reset saat refresh
      if (htmlElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
};

// 2. Logika Navbar (Opsional: Mengubah background saat scroll)
const initNavbarScroll = () => {
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("shadow-md", "py-3");
      header.classList.remove("py-4");
    } else {
      header.classList.remove("shadow-md", "py-3");
      header.classList.add("py-4");
    }
  });
};

// 3. Menjalankan semua fungsi setelah DOM siap
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initNavbarScroll();

  console.log("KreatifLab JS Ready! Tema: Tailwind v4");
});
