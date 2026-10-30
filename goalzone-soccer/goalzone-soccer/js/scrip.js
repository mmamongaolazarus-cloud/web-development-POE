 SOCCER-ZONE - PART 3 JAVASCRIPT
   /*This file controls the interactive features on the website.
   It uses plain JavaScript so that it is easy to understand.
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {
    // Set the current year in the footer.
    var yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Highlight the navigation link for the page currently open.
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });

    // Open and close the mobile navigation menu.
    var menuButton = document.querySelector(".menu-toggle");
    var mainNav = document.getElementById("main-nav");
    if (menuButton && mainNav) {
        menuButton.addEventListener("click", function () {
            var menuIsOpen = mainNav.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(menuIsOpen));
        });
    }

    // Make the FAQ questions expand and collapse when clicked.
    document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            var answerPanel = trigger.nextElementSibling;
            var isExpanded = trigger.getAttribute("aria-expanded") === "true";

            // Update both the answer visibility and the accessibility state.
            trigger.setAttribute("aria-expanded", String(!isExpanded));
            answerPanel.hidden = isExpanded;
            trigger.querySelector("span").textContent = isExpanded ? "+" : "−";
        });
    });

    // Product data is stored in one place and displayed on the products page.
    var products = [
        {
            name: "Speed Pro Boots",
            description: "Lightweight boots designed for speed and quick movement.",
            price: 899,
            image: "images/speedboot.jpg",
            style: "speed"
        },
        {
            name: "Elite Control Boots",
            description: "A comfortable option for players who want better control.",
            price: 1199,
            image: "images/middlefielderboot.jpg",
            style: "control"
        },
        {
            name: "Pro Strike Boots",
            description: "Power and stability for attacking players.",
            price: 1499,
            image: "images/strikerboot.jpg",
            style: "power"
        },
        {
            name: "Defender Boots",
            description: "Supportive footwear for players who defend and tackle.",
            price: 999,
            image: "images/defenderboot.jpg",
            style: "defence"
        },
        {
            name: "Lightweight Boots",
            description: "A light design for movement across the pitch.",
            price: 1099,
            image: "images/lightweightboot.jpg",
            style: "speed"
        },
        {
            name: "Attacker Boots",
            description: "Designed for players who enjoy attacking play.",
            price: 1299,
            image: "images/attackingplayerboot.webp",
            style: "power"
        },
        {
            name: "Winger Boots",
            description: "A boot option for wide players and quick runs.",
            price: 1149,
            image: "images/wingerboot.jpg",
            style: "speed"
        },
        {
            name: "Midfielder Boots",
            description: "A versatile option for players across the midfield.",
            price: 1049,
            image: "images/middlefielderpro-boot.webp",
            style: "control"
        },
        {
            name: "Runner Boots",
            description: "A comfortable choice for active players.",
            price: 949,
            image: "images/runnerboot.jpg",
            style: "control"
        }
    ];
     var productList = document.getElementById("product-list");
    var searchInput = document.getElementById("product-search");
    var sortSelect = document.getElementById("product-sort");
    var productCount = document.getElementById("product-count");

    // Display products after applying the search and sorting choices.
    function displayProducts() {
        if (!productList) {
            return;
        }
