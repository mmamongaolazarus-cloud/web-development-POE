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

         var searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
        var selectedSort = sortSelect ? sortSelect.value : "default";

        // Filter by product name, description or playing style.
        var matchingProducts = products.filter(function (product) {
            var searchableText = (product.name + " " + product.description + " " + product.style).toLowerCase();
            return searchableText.includes(searchText);
        });

        // Sort the filtered products using the selected option.
        if (selectedSort === "low-high") {
            matchingProducts.sort(function (a, b) { return a.price - b.price; });
        } else if (selectedSort === "high-low") {
            matchingProducts.sort(function (a, b) { return b.price - a.price; });
        } else if (selectedSort === "name") {
            matchingProducts.sort(function (a, b) { return a.name.localeCompare(b.name); });
        }

        // Clear the old product cards before adding the new results.
        productList.innerHTML = "";

        if (productCount) {
            productCount.textContent = "Showing " + matchingProducts.length + " of " + products.length + " products";
        }

        // Give the user a helpful message when the search has no matches.
        if (matchingProducts.length === 0) {
            productList.innerHTML = '<p class="no-results">No products match your search. Try another name or style.</p>';
            return;
        }

        // Create one product card for every matching item.
        matchingProducts.forEach(function (product) {
            var card = document.createElement("article");
            card.className = "product-card";

            var image = document.createElement("img");
            image.className = "product-photo";
            image.src = product.image;
            image.alt = product.name + " soccer boots";
            image.loading = "lazy";
            image.setAttribute("data-gallery-image", "true");
            image.setAttribute("data-caption", product.name);

            var heading = document.createElement("h2");
            heading.textContent = product.name;

            var description = document.createElement("p");
            description.textContent = product.description;

            var price = document.createElement("p");
            price.className = "price";
            price.textContent = "R" + product.price.toLocaleString("en-ZA");

            var enquiryLink = document.createElement("a");
            enquiryLink.className = "button";
            // Pass the selected product to the enquiry form through the URL.
            enquiryLink.href = "enquiry.html?product=" + encodeURIComponent(product.name);
            enquiryLink.textContent = "Enquire about this boot";

            card.appendChild(image);
            card.appendChild(heading);
            card.appendChild(description);
            card.appendChild(price);
            card.appendChild(enquiryLink);
            productList.appendChild(card);
        });

        // Reconnect the lightbox click events to the newly displayed images.
        attachGalleryEvents();
    }

    // Search and sort controls update the product list immediately.
    if (productList) {
        displayProducts();
        if (searchInput) {
            searchInput.addEventListener("input", displayProducts);
        }
        if (sortSelect) {
            sortSelect.addEventListener("change", displayProducts);
        }
    }

    // Gallery lightbox: show a larger version of an image when it is clicked.
    var lightbox = document.getElementById("image-lightbox");
    var lightboxImage = document.getElementById("lightbox-image");
    var lightboxCaption = document.getElementById("lightbox-caption");
    var galleryImages = [];
    var activeImageIndex = 0;

    function openLightbox(index) {
        if (!lightbox || galleryImages.length === 0) {
            return;
        }

        activeImageIndex = index;
        var selectedImage = galleryImages[activeImageIndex];
        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;
        lightboxCaption.textContent = selectedImage.getAttribute("data-caption") || selectedImage.alt;
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
        lightbox.querySelector(".lightbox-close").focus();
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.hidden = true;
            lightboxImage.src = "";
            document.body.style.overflow = "";
        }
    }

    function showNextImage(direction) {
        if (galleryImages.length === 0) {
            return;
        }
        activeImageIndex = (activeImageIndex + direction + galleryImages.length) % galleryImages.length;
        openLightbox(activeImageIndex);
    }

    // Attach click events to the gallery images currently on the page.
    function attachGalleryEvents() {
        galleryImages = Array.prototype.slice.call(document.querySelectorAll("[data-gallery-image]"));
        galleryImages.forEach(function (image, index) {
            image.addEventListener("click", function () {
                openLightbox(index);
            });
        });
    }

    attachGalleryEvents();

    if (lightbox) {
        lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
        lightbox.querySelector(".lightbox-prev").addEventListener("click", function () {
            showNextImage(-1);
        });
        lightbox.querySelector(".lightbox-next").addEventListener("click", function () {
            showNextImage(1);
        });

        // Close the image preview with Escape and allow arrow-key navigation.
        document.addEventListener("keydown", function (event) {
            if (lightbox.hidden) {
                return;
            }
            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowRight") {
                showNextImage(1);
            } else if (event.key === "ArrowLeft") {
                showNextImage(-1);
            }
        });

        // Clicking the dark background also closes the image preview.
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Product prices are used to calculate an estimate on the enquiry page.
    var productPrices = {
        "Speed Pro Boots": 899,
        "Elite Control Boots": 1199,
        "Pro Strike Boots": 1499
    };
    var enquiryProduct = document.getElementById("enquiry-product");
    var enquiryQuantity = document.getElementById("enquiry-quantity");
    var estimateTotal = document.getElementById("estimate-total");

    // Preselect the product when the customer arrived from a product card.
    if (enquiryProduct) {
        var requestedProduct = new URLSearchParams(window.location.search).get("product");
        if (requestedProduct && productPrices[requestedProduct]) {
            enquiryProduct.value = requestedProduct;
        }
    }

    function updateEstimate() {
        if (!enquiryProduct || !enquiryQuantity || !estimateTotal) {
            return;
        }

        var chosenProduct = enquiryProduct.value;
        var quantity = Number(enquiryQuantity.value);

        // Only calculate when a product and a valid quantity have been selected.
        if (productPrices[chosenProduct] && Number.isInteger(quantity) && quantity > 0 && quantity <= 20) {
            var total = productPrices[chosenProduct] * quantity;
            estimateTotal.textContent = "R" + total.toLocaleString("en-ZA");
        } else {
            estimateTotal.textContent = "Select a product";
        }
    }

    if (enquiryProduct && enquiryQuantity) {
        enquiryProduct.addEventListener("change", updateEstimate);
        enquiryQuantity.addEventListener("input", updateEstimate);
        updateEstimate();
    }

    // Check a phone number using the same pattern as the form's HTML attribute.
    function isValidPhone(phoneNumber) {
        return /^[0-9+() -]{7,20}$/.test(phoneNumber);
    }

    // Show a message beside the form so the user knows what needs attention.
    function showFormMessage(element, message, type) {
        if (!element) {
            return;
        }
        element.textContent = message;
        element.className = "form-feedback " + type;
    }

    // Enquiry form validation and email preparation.
    var enquiryForm = document.getElementById("enquiry-form");
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var name = document.getElementById("enquiry-name").value.trim();
            var email = document.getElementById("enquiry-email").value.trim();
            var phone = document.getElementById("enquiry-phone").value.trim();
            var product = enquiryProduct.value;
            var quantity = Number(enquiryQuantity.value);
            var feedback = document.getElementById("enquiry-feedback");

            // Use browser validity checks and an extra phone-number check.
            if (!enquiryForm.checkValidity() || !isValidPhone(phone) || !productPrices[product] ||
                !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
                enquiryForm.reportValidity();
                showFormMessage(feedback, "Please check the highlighted fields and enter valid details.", "error");
                return;
            }

            var total = productPrices[product] * quantity;
            var requestedDate = document.getElementById("enquiry-date").value || "Not specified";
            var extraMessage = document.getElementById("enquiry-message").value.trim();

            // Build an email containing all validated enquiry information.
            var emailSubject = encodeURIComponent("Soccer-Zone product enquiry - " + product);
            var emailBody = encodeURIComponent(
                "Product enquiry for Soccer-Zone\n\n" +
                "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone +
                "\nProduct: " + product + "\nQuantity: " + quantity +
                "\nEstimated total: R" + total + "\nDate needed: " + requestedDate +
                "\nAdditional information: " + (extraMessage || "None") +
                "\n\nPlease confirm final price and availability."
            );

            showFormMessage(feedback, "Your enquiry has been checked. Your email application will open so you can review and send it.", "success");
            window.location.href = "mailto:info@soccerzone.co.za?subject=" + emailSubject + "&body=" + emailBody;
        });
    }

    // Contact form: validate a general message and prepare an email for the store.
    var contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var name = document.getElementById("contact-name").value.trim();
            var email = document.getElementById("contact-email").value.trim();
            var messageType = document.getElementById("contact-type").value;
            var message = document.getElementById("contact-message").value.trim();
            var feedback = document.getElementById("contact-feedback");

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                showFormMessage(feedback, "Please complete all required fields correctly. Your message must contain at least 10 characters.", "error");
                return;
            }

            // Put the sender's details and full message into the email body.
            var subject = encodeURIComponent("Soccer-Zone - " + messageType);
            var body = encodeURIComponent(
                "General message for Soccer-Zone\n\n" +
                "Name: " + name + "\nEmail: " + email +
                "\nMessage type: " + messageType + "\n\nMessage:\n" + message
            );

            showFormMessage(feedback, "Your message is ready. Your email application will open so you can review and send it.", "success");
            window.location.href = "mailto:info@soccerzone.co.za?subject=" + subject + "&body=" + body;
        });
    }

    // Do not allow a date in the past on the optional enquiry date field.
    var dateInput = document.getElementById("enquiry-date");
    if (dateInput) {
        var today = new Date();
        var localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
            .toISOString().split("T")[0];
        dateInput.min = localToday;
    }
});