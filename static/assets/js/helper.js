/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/
// Color themes defined here.
const colorThemes = {
  "4874E2": {
    normal: "#4874E2",
    light: "#5a82e5",
    veryLight: "#edf1fc",
    dark: "#4168cb",
    primaryText: "#ffffff",
    lightMode: {
      link: "#4874E2", iconSecondary: "#FFD43B"
    },
    darkMode: {
      link: "#4874E2", iconSecondary: "#3f4347"
    }
  },
  "ef476f": {
    normal: "#ef476f",
    light: "#f1597d",
    veryLight: "#fdedf1",
    dark: "#d74064",
    primaryText: "#ffffff",
    lightMode: {
      link: "#ef476f", iconSecondary: "#FCC417"
    },
    darkMode: {
      link: "#ef476f", iconSecondary: "#3f4347"
    }
  },
  "5468e7": {
    normal: "#5468e7",
    dark: "#4c5ed0",
    light: "#6577e9",
    veryLight: "#eef0fd",
    primaryText: "#ffffff",
    lightMode: {
      link: "#5468e7", iconSecondary: "#FFD43B"
    },
    darkMode: {
      link: "#5468e7", iconSecondary: "#3f4347"
    }
  },
  "e94c2b": {
    normal: "#e94c2b",
    dark: "#d24427",
    veryLight: "#fdedea",
    light: "#eb5e40",
    primaryText: "#ffffff",
    lightMode: {
      link: "#e94c2b", iconSecondary: "#FFD43B"
    },
    darkMode: {
      link: "#e94c2b", iconSecondary: "#3f4347"
    }
  }
};

// Light theme config variables defined.
const lightTheme = {
  "--background-color": "#ffffff",
  "--background-light": "#f1f3f5",
  "--background-light-dark": "#d9dbdd",
  "--background-placeholder": "#dddddd",
  "--background-alert-info": "#f1f3f5",
  "--text-color": "#373b3e",
  "--text-subtitle": "#4d5154",
  "--navbar-background-color": "#ffffff",
  "--navbar-brand-color": "#4a4a4a",
  "--navbar-text": "#373b3e",
  "--navbar-alert-color": "#ffffff",
  "--navbar-brand-color": "#4d5154",
  "--navbar-search-background": "#f1f3f5",
  "--navbar-search-border": "#f1f3f5",
  "--navbar-search-placeholder": "#6c757d",
  "--form-background": "#ffffff",
  "--form-border-color": "#6c757d",
  "--card-background-color": "#ffffff",
  "--modal-background-color": "#ffffff",
  "--shadow-md": "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
  "--shadow-xl": " 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "--slider-background-color": "#f5f5f5"
};

// Dark theme config defined.
const darkTheme = {
  "--background-color": "#1E1F26",
  "--background-light": "#2A2E32",
  "--background-light-dark": "#26292d",
  "--background-placeholder": "#2A2E32",
  "--background-alert-info": "#323338",
  "--text-color": "#e6e6e6",
  "--text-subtitle": "#6c757d",
  "--navbar-background-color": "#18191e",
  "--navbar-alert-color": "#18191e",
  "--navbar-brand-color": "#6c757d",
  "--navbar-text": "#6c757d",
  "--navbar-search-background": "#1f2028",
  "--navbar-search-border": "#1f2028",
  "--navbar-search-placeholder": "#6c757d",
  "--drop-background-color": "#1b1d23",
  "--card-background-color": "#22242C",
  "--form-background": "#22242C",
  "--form-border-color": "#22242C",
  "--modal-background-color": "#1b1c22",
  "--shadow-md": "0 0rem 0rem rgba(0, 0, 0, 0)",
  "--shadow-xl": "0 0rem 0rem rgba(0, 0, 0, 0)",
  "--slider-background-color": "#2A2E32"
};

// This function set theme config.
function setTheme(theme) {
  let colorTheme = colorThemes[theme.color];
  let themeMode = {
    "--primary": colorTheme.normal,
    "--primary-light": colorTheme.light,
    "--primary-very-light": colorTheme.veryLight,
    "--primary-dark": colorTheme.dark,
    "--text-over-primary": colorTheme.primaryText
  };
  if (theme.dark) {
    // Set dark mode config.
    Object.keys(darkTheme).forEach(key => {
      themeMode[key] = darkTheme[key];
    });
    themeMode["--icon-secondary"] = colorTheme.darkMode.iconSecondary;
    themeMode["--icon-brand-secondary"] = colorTheme.darkMode.iconSecondary;
    themeMode["--link-color"] = colorTheme.darkMode.link;
    themeMode["--navbar-brand-color"] = colorTheme.normal;
  } else {
    // Set light theme mode.
    Object.keys(lightTheme).forEach(key => {
      themeMode[key] = lightTheme[key];
    });
    themeMode["--icon-secondary"] = colorTheme.lightMode.iconSecondary;
    themeMode["--icon-brand-secondary"] = colorTheme.lightMode.iconSecondary;
    themeMode["--link-color"] = colorTheme.lightMode.link;
    themeMode["--drop-background-color"] = colorTheme.veryLight;
  }
  Object.keys(themeMode).forEach(key => {
    document.documentElement.style.setProperty(key, themeMode[key]);
  });
}

// Set mode.
let dark = false;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  dark = true;
}

// Random set color.
let colors = ["4874E2", "ef476f", "5468e7", "e94c2b"];
let color = colors[Math.floor(Math.random() * colors.length)];
setTheme({ color: color, dark: dark })

// This function checks if email is valid or not.
function isEmail(string) {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (emailRegexp.test(string) == false) {
    return false;
  }
  return true;
}

// This is a showModal function which shows modal based on given options as an argument.  
function showModal(content) {
  let modal = document.getElementById("modal_id");
  if (modal == null) { return; }
  modal.style = "display: block;";
  modal.innerHTML = content;
}

// This is closeModal function which closes modal and remove backdrop from body.
function closeModal() {
  let modal = document.getElementById("modal_id");
  if (modal == null) { return; }
  modal.style = "display: none;";
  modal.innerHTML = ``;
}

// This is closeModal background function which closes modal.
function closeModalBackground(e) {
  if (e.target.id != "modal_id") { return; }
  let modal = document.getElementById("modal_id");
  if (modal == null) { return; }
  modal.style = "display: none;";
  modal.innerHTML = ``;
}
