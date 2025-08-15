export const updateDomTheme = (theme: "dark" | "light" = "light") => {
  if (window !== undefined) {
    if (theme === "light") {
      document.body.classList.remove("theme-dark");
    } else {
      document.body.classList.add("theme-dark");
    }
  }
};
