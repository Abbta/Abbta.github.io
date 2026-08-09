const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function activateTab(tab, updateHash = true) {
  const panelId = tab.dataset.tab;

  tabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });

  if (updateHash) {
    history.replaceState(null, "", `#view-${panelId}`);
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));

  tab.addEventListener("keydown", (event) => {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});

const requestedPanel = window.location.hash.slice(1).replace(/^view-/, "");
const requestedTab = tabs.find((tab) => tab.dataset.tab === requestedPanel);

if (requestedTab) {
  history.replaceState(null, "", `#view-${requestedPanel}`);
  activateTab(requestedTab, false);
}

document.querySelector("#current-year").textContent = new Date().getFullYear();

const lightbox = document.querySelector("#image-lightbox");
const lightboxMedia = lightbox.querySelector(".lightbox__media");
const lightboxCaption = lightbox.querySelector(".lightbox__caption");
const lightboxClose = lightbox.querySelector(".lightbox__close");
const galleryButtons = [...document.querySelectorAll(".gallery-button")];
let lastGalleryButton;

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const visual = button.querySelector(".image-placeholder, img");
    const caption = button.closest("figure").querySelector("figcaption");

    if (!visual) return;

    const enlargedVisual = visual.cloneNode(true);
    enlargedVisual.classList.add("lightbox__image");
    enlargedVisual.setAttribute("aria-hidden", "true");
    lightboxMedia.replaceChildren(enlargedVisual);
    lightboxCaption.textContent = caption?.textContent ?? "";
    lastGalleryButton = button;
    lightbox.showModal();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  const clickedOutsideImage =
    event.target === lightbox ||
    event.target === lightbox.querySelector(".lightbox__inner") ||
    event.target === lightboxMedia;

  if (clickedOutsideImage) lightbox.close();
});

lightbox.addEventListener("close", () => lastGalleryButton?.focus());
