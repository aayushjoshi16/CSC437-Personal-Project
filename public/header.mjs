console.log("Hello, world!");

// Determine if we're in a subdirectory
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes("/hobbies/") || path.includes("/enrolled_courses/")) {
    return "../";
  }
  return "";
}

// Generate navigation links for current page
function getNavLinks() {
  const basePath = getBasePath();
  const links = [];

  // Hobbies link on header
  if (!window.location.pathname.includes("/hobbies/")) {
    links.push({ text: "My Hobbies", href: basePath + "hobbies/index.html" });
  }

  // Enrolled Courses link on header
  if (!window.location.pathname.includes("/enrolled_courses/")) {
    links.push({
      text: "Enrolled Courses",
      href: basePath + "enrolled_courses/index.html",
    });
  }

  // Back to Home link on header
  if (basePath) {
    links.push({ text: "Back to Home", href: basePath + "index.html" });
  }

  return links;
}

// Create header HTML from navigation links
function createHeader() {
  const basePath = getBasePath();
  const navLinks = getNavLinks();
  const linksHtml = navLinks
    .map((link) => `<a href="${link.href}">${link.text}</a>`)
    .join("\n");

  const headerHtml = `
      <nav>
        <div class="nav-left">
          <h1><a href="${basePath}index.html" style="text-decoration: none;">Aayush Joshi</a></h1>
          <div class="nav-links">
            ${linksHtml}
          </div>
        </div>
        <div class="dark-mode-container">
          <label class="dark-mode-label">
            <input type="checkbox" id="dark-mode-toggle" autocomplete="off" />
            Dark mode
          </label>
        </div>
        <div class="nav-right">
          <button>Menu</button>
        </div>
      </nav>
    `;

  const template = document.createElement("template");
  template.innerHTML = headerHtml.trim();
  return template.content.firstElementChild;
}

// Set up dark mode toggle functionality
function setupDarkModeToggle() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  // Set initial state based on localStorage
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }

  // Dark mode toggle
  darkModeToggle.addEventListener("change", () => {
    console.log("Dark mode toggled:", darkModeToggle.checked);

    if (darkModeToggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  });
}

// Set up mobile menu functionality
function setupMobileMenu(header) {
  const menuButton = header.querySelector(".nav-right button");
  const navLinks = header.querySelector(".nav-links");

  // Hide nav links by default
  if (window.innerWidth <= 600) {
    navLinks.style.display = "none";
  }

  // Toggle menu on button click
  menuButton.addEventListener("click", () => {
    if (window.innerWidth <= 600) {
      navLinks.style.display =
        navLinks.style.display === "none" ? "flex" : "none";
    }
  });

  // Hide menu when clicking outside of header
  document.body.addEventListener("click", (event) => {
    if (!header.contains(event.target) && window.innerWidth <= 600) {
      navLinks.style.display = "none";
    }
  });

  // Window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      navLinks.style.display = "flex";
    } else {
      navLinks.style.display = "none";
    }
  });
}

// Additional CSS for the header
function addHeaderStyles() {
  const style = document.createElement("style");
  style.textContent = `
      .nav-links a {
        padding: 0.5rem 1rem;
        transition: background-color 0.3s ease;
      }
      
      .nav-links a:hover {
        background-color: var(--color-link);
        color: var(--color-background);
      }
      
      .nav-links a[href$="index.html"]:not([href$="hobbies/index.html"]):not([href$="enrolled_courses/index.html"]) {
        font-weight: bold;
      }
      
      .dark-mode-container {
        display: flex;
        align-items: center;
        background-color: var(--color-nav-background);
      }
      
      .dark-mode-label {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        cursor: pointer;
        background-color: var(--color-nav-background);
        color: var(--color-nav-text);
      }
      
      .dark-mode-label input {
        margin-right: 0.5rem;
        background-color: transparent;
        cursor: pointer;
      }
      
      @media (max-width: 600px) {
        .nav-right {
          display: flex;
          align-items: flex-end;
        }
        
        .dark-mode-container {
          margin-right: 1rem;
        }
        
        .nav-links {
          padding-top: 0.5rem;
        }
        
        .nav-links a {
          width: 100%;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-right button {
          cursor: pointer;
          padding: 0.5rem 1rem;
          background-color: var(--color-link);
          color: var(--color-background);
          border: none;
          border-radius: 4px;
        }
      }
      
      @media (min-width: 601px) {
        .nav-right {
          display: none;
        }
      }
    `;
  document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", () => {
  // Add custom styles for the header
  addHeaderStyles();

  // Create new header
  const header = createHeader();
  document.body.insertBefore(header, document.body.firstChild);

  // Mobile functionality
  setupMobileMenu(header);

  // Dark mode toggle
  setupDarkModeToggle();
});
