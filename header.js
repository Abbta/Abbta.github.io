const headerTransitionStart = 10;

var headerScroll = function () {
    const headerBorder = document.getElementById("header-border-visible");
    const authorName = document.getElementById("author-name");
    const headerContainer = document.getElementById("header-container");
    if (window.scrollY >= headerTransitionStart) {
        headerBorder.classList.remove("header-border-before");
        headerBorder.classList.add("header-border-after");
        authorName.classList.remove("author-name-before");
        authorName.classList.add("author-name-after");
        headerContainer.classList.remove("header-container-before");
        headerContainer.classList.add("header-container-after");
    }
    else if (headerBorder.classList.contains("header-border-after")) {
        headerBorder.classList.add("header-border-before");
        headerBorder.classList.remove("header-border-after");
        authorName.classList.add("author-name-before");
        authorName.classList.remove("author-name-after");
        headerContainer.classList.add("header-container-before");
        headerContainer.classList.remove("header-container-after");
    }
}