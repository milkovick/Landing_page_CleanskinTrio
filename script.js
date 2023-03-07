// Mobile Navigation (hamburger menu)
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Enter icon on landing page and dark overlay on hover
let enterBtn = document.querySelector(".enter-icon");
let headerColorChange = document.querySelector(".header");
//Colors for dark image overlay (linear-gradient overlay):
let color1 = "rgb(17, 25, 44, 0.111)";
let color2 = "rgb(17, 25, 44, 0.333)";
let color3 = "rgb(17, 25, 44, 0.666)";
const darkerImg = "images/imgpeople/headermodel.jpg"; // DO NOT REMOVE.

enterBtn.addEventListener("mouseenter", function () {
  headerColorChange.style.background = `linear-gradient(to bottom, ${color1}, ${color2}, ${color3}), url(${darkerImg}) no-repeat center center fixed`;
  headerColorChange.style.backgroundSize = "cover";
});
enterBtn.addEventListener("mouseleave", function () {
  headerColorChange.style.background = "";
});

// Smooth scroll
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    //Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile navigation
    if (link.classList.contains("nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// Sticky nav
const sectionHeaderEl = document.querySelector(".header");
const nav = document.querySelector(".pre-nav");
const navHeight = document
  .querySelector(".pre-nav")
  .getBoundingClientRect().height;

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  },
  {
    //In the viewport
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
obs.observe(sectionHeaderEl);

// Hidden form (shows on click on CTA - 'Free consultation')
const openWindowCta = document.querySelector(".main-btn");
const hiddenWindow = document.querySelector(".hidden-form");
const closeWindowBtn = document.querySelector(".close-form-btn");
const overlay = document.querySelector(".overlay");

const openForm = function () {
  hiddenWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeForm = function () {
  hiddenWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

openWindowCta.addEventListener("click", openForm);
closeWindowBtn.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);

// Close form on ESC key when the form is visible
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !hiddenWindow.classList.contains("hidden")) {
    closeForm();
  }
});

// Reveal sections on scroll
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObsr = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// First hide all sections, and then show them (code above)
allSections.forEach(function (section) {
  sectionObsr.observe(section);
  section.classList.add("section--hidden");
});
