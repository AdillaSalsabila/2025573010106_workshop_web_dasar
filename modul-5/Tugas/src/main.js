import "./style.css";

const initDarkMode = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // 1. Fungsi untuk menerapkan tema
  const applyTheme = (theme) => {
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  };

  // 2. Cek tema saat pertama kali load
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  // 3. Logika Klik Tombol
  if (themeToggle) {
    console.log("Tombol Toggle Ditemukan!"); // Cek di console browser

    themeToggle.addEventListener("click", () => {
      const isDark = htmlElement.classList.toggle("dark");
      const newTheme = isDark ? "dark" : "light";

      localStorage.setItem("theme", newTheme);
      console.log("Tema saat ini:", newTheme);
    });
  } else {
    console.error(
      "EROR: Tombol dengan id='theme-toggle' tidak ditemukan di HTML!",
    );
  }
};

document.addEventListener("DOMContentLoaded", initDarkMode);
