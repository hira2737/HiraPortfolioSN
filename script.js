
// =====================================================
// HIRA NANDHANI - PERSONAL PORTFOLIO
// EXTERNAL JAVASCRIPT
// =====================================================

"use strict";


// 1. SELECT HTML ELEMENTS

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const profileImage = document.getElementById("profileImage");


// 2. DISPLAY CURRENT YEAR

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 3. MOBILE NAVIGATION MENU

function closeMenu() {

    if (!menuToggle || !navLinks) {
        return;
    }

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" :
                     "Open navigation menu"
        );

    });


    // Close menu when a navigation link is clicked.

    navItems.forEach(function (link) {

        link.addEventListener("click", closeMenu);

    });


    // Close menu when clicking outside.

    document.addEventListener("click", function (event) {

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            closeMenu();

        }

    });


    // Close menu using Escape key.

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

}


// 4. ACTIVE NAVIGATION LINK

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navItems.forEach(function (link) {

                        const isActive =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle(
                            "active",
                            isActive
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );


    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });

}


// 5. BACK TO TOP BUTTON

window.addEventListener("scroll", function () {

    if (backToTop) {

        if (window.scrollY > 400) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    }

});


// 6. SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".timeline-item, " +
    ".experience-card, " +
    ".project-card, " +
    ".skill-card, " +
    ".certification-card, " +
    ".contact-container"
);

revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("show");

    });

}


// 7. PROFILE IMAGE ERROR HANDLING

if (profileImage) {

    profileImage.addEventListener("error", function () {

        profileImage.style.display = "none";

        console.warn(
            "Profile image could not be loaded. Check profile.jpg."
        );

    });

}


// 8. CONTACT FORM VALIDATION AND EMAIL

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById(
            "contactName"
        ).value.trim();

        const email = document.getElementById(
            "contactEmail"
        ).value.trim();

        const subject = document.getElementById(
            "contactSubject"
        ).value.trim();

        const message = document.getElementById(
            "contactMessage"
        ).value.trim();


        // Validate empty fields.

        if (!name || !email || !subject || !message) {

            formMessage.textContent =
                "Please complete all the fields.";

            return;

        }


        // Validate email using regular expression.

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            return;

        }


        // Prepare email content.

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );


        // Open the user's default email application.

        const mailtoLink =
            "mailto:hira270307@gmail.com" +
            "?subject=" + emailSubject +
            "&body=" + emailBody;


        window.location.href = mailtoLink;


        formMessage.textContent =
            "Your email application is opening. " +
            "Please send the prepared message there.";

    });

}


// 9. RESPONSIVE WINDOW HANDLING

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        closeMenu();

    }

});


// 10. PAGE LOAD MESSAGE

window.addEventListener("load", function () {

    console.log(
        "Welcome to Hira Nandhani's Portfolio!"
    );

    console.log(
        "Portfolio loaded successfully."
    );

});
