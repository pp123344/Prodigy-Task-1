document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
  
    createScrollTopButton();
    init();
  
    function init() {
      setupEventListeners();
      highlightNavOnScroll();
      setupScrollAnimations();
      setupContactForm();
  
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }
  
    function setupEventListeners() {
      if (menuToggle) {
        menuToggle.addEventListener("click", toggleMobileMenu);
      }
  
      navLinksItems.forEach((item) => {
        item.addEventListener("click", closeMobileMenu);
      });
  
      window.addEventListener("scroll", throttle(handleScroll, 100));
      window.addEventListener("resize", handleResize);
  
      const contactForm = document.querySelector(".contact-form");
      if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
      }
    }
  
    function toggleMobileMenu() {
      const isActive = menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
      menuToggle.setAttribute("aria-expanded", isActive);
    }
  
    function closeMobileMenu() {
      if (!menuToggle || !navLinks) return;
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("no-scroll");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  
    function handleScroll() {
      if (!navbar) return;
  
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
  
      highlightNavOnScroll();
      toggleScrollTopButton();
    }
  
    function handleResize() {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }
  
    function highlightNavOnScroll() {
      let scrollPosition = window.scrollY;
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinksItems.forEach((item) => item.classList.remove("active"));
          const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    }
  
    function createScrollTopButton() {
      let scrollTopButton = document.querySelector(".scroll-top");
      if (scrollTopButton) return; // Avoid duplicate buttons
  
      scrollTopButton = document.createElement("div");
      scrollTopButton.classList.add("scroll-top");
      scrollTopButton.setAttribute("aria-label", "Scroll to top");
      scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
      document.body.appendChild(scrollTopButton);
  
      scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    function toggleScrollTopButton() {
      const scrollTopButton = document.querySelector(".scroll-top");
      if (!scrollTopButton) return;
  
      if (window.scrollY > 500) {
        scrollTopButton.classList.add("show");
      } else {
        scrollTopButton.classList.remove("show");
      }
    }
  
    function setupScrollAnimations() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        { threshold: 0.1 }
      );
  
      const animateElements = document.querySelectorAll(
        ".service-card, .stat-item, .about-text p, .contact-item"
      );
  
      animateElements.forEach((el) => {
        observer.observe(el);
      });
    }
  
    function handleFormSubmit(e) {
      e.preventDefault();
  
      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const subject = document.getElementById("subject")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";
  
      if (!name || !email || !message) {
        showFormMessage("Please fill in all required fields", "error");
        return;
      }
  
      // You can add actual form submission code here (e.g., AJAX)
  
      console.log("Form submitted:", { name, email, subject, message });
      showFormMessage("Message sent successfully! We'll get back to you soon.", "success");
  
      e.target.reset();
    }
  
    function showFormMessage(message, type) {
      const existingMessage = document.querySelector(".form-message");
      if (existingMessage) existingMessage.remove();
  
      const messageElement = document.createElement("div");
      messageElement.classList.add("form-message", type);
      messageElement.textContent = message;
  
      const form = document.querySelector(".contact-form");
      if (!form) return;
  
      form.appendChild(messageElement);
  
      // Inline styles for quick demo - ideally move to CSS
      messageElement.style.padding = "1rem";
      messageElement.style.marginTop = "1rem";
      messageElement.style.borderRadius = "var(--border-radius, 4px)";
      messageElement.style.fontWeight = "500";
      messageElement.style.transition = "opacity 0.3s ease";
      messageElement.style.opacity = "1";
  
      if (type === "success") {
        messageElement.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
        messageElement.style.color = "#2ecc71";
      } else {
        messageElement.style.backgroundColor = "rgba(231, 76, 60, 0.2)";
        messageElement.style.color = "#e74c3c";
      }
  
      setTimeout(() => {
        messageElement.style.opacity = "0";
        setTimeout(() => messageElement.remove(), 300);
      }, 5000);
    }
  
    function setupContactForm() {
      const inputs = document.querySelectorAll(".form-group input, .form-group textarea");
      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          input.style.boxShadow = "0 0 0 2px rgba(244, 162, 97, 0.3)";
        });
  
        input.addEventListener("blur", () => {
          input.style.boxShadow = "none";
          if (input.value.trim() === "" && input.hasAttribute("required")) {
            input.style.borderLeft = "3px solid #e74c3c";
          } else {
            input.style.borderLeft = "3px solid #2ecc71";
          }
        });
      });
    }
  
    // Throttle function to limit frequency of function calls
    function throttle(fn, limit) {
      let lastCall = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
          lastCall = now;
          fn.apply(this, args);
        }
      };
    }
  });
  