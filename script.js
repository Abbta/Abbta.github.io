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
