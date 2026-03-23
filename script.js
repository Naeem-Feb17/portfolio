document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", currentTheme);

  // Update toggle icon based on theme
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("i");
    if (theme === "light") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  }

  updateThemeIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);

    // Add a subtle animation to the theme change
    body.style.transition = "all 0.3s ease";
    setTimeout(() => {
      body.style.transition = "";
    }, 300);
  });

  // Hamburger menu functionality
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  // Typing animation functionality
  const typingElement = document.getElementById("typing");
  const words = ["Frontend Developer | React & Node.js"];
  let wordIndex = 0;
  let letterIndex = 0;
  let currentWord = "";
  let currentLetters = "";

  function type() {
    currentLetters = currentWord.substring(0, letterIndex + 1);
    letterIndex++;

    typingElement.innerHTML = currentLetters;

    if (letterIndex === currentWord.length) {
      // Typing done — remove blinking cursor
      typingElement.style.borderRight = "none";
      typingElement.style.paddingRight = "0";
      return;
    }

    setTimeout(type, 80);
  }

  currentWord = words[wordIndex];
  type();

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Active navigation highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  
  // Scroll event listener for active nav
  window.addEventListener("scroll", updateActiveNav);

  // Animate progress bars when skills section comes into view
  function animateProgressBars() {
    const skillsSection = document.querySelector("#skills");
    const progressBars = document.querySelectorAll(".progress");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            const width = bar.style.width;
            bar.style.width = "0%";
            setTimeout(() => {
              bar.style.width = width;
            }, 500);
          });
          observer.unobserve(entry.target);
        }
      });
    });

    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }

  animateProgressBars();

  // Add scroll-to-top functionality
  function createScrollToTop() {
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = "↑";
    scrollBtn.className = "scroll-to-top";
    scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #b74b4b;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;

    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.style.opacity = "1";
        scrollBtn.style.visibility = "visible";
      } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.visibility = "hidden";
      }
    });
  }

  createScrollToTop();

  // Add loading animation
  function hideLoader() {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }

  // Hide loader after page loads
  window.addEventListener("load", hideLoader);

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(300px);
            transition: all 0.3s ease;
            max-width: 300px;
        `;

    if (type === "success") {
      notification.style.background = "#4CAF50";
    } else if (type === "error") {
      notification.style.background = "#f44336";
    } else {
      notification.style.background = "#2196F3";
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(300px)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Rich scroll-reveal animation system
  function addScrollAnimations() {
    // Map selectors → animation type (and optional stagger)
    const animationMap = [
      { selector: ".home-img", cls: "reveal-left" },
      { selector: ".home-content", cls: "reveal-right" },
      { selector: ".heading", cls: "reveal" },
      { selector: ".additional-skills-heading", cls: "reveal" },
      { selector: ".project-card", cls: "reveal", stagger: true },
      { selector: ".skill-card", cls: "reveal-scale", stagger: true },
      { selector: ".education-item", cls: "reveal-left", stagger: true },
      { selector: ".experience-item:nth-child(odd)", cls: "reveal-left" },
      { selector: ".experience-item:nth-child(even)", cls: "reveal-right" },
      { selector: ".contact-info", cls: "reveal-left" },
      { selector: ".contact-form-container", cls: "reveal-right" },
      { selector: ".contact-item", cls: "reveal", stagger: true },
      { selector: ".contact-text", cls: "reveal" },
      { selector: ".social-link", cls: "reveal-scale", stagger: true },
      { selector: ".certificate-divider", cls: "reveal-scale" },
      { selector: "footer", cls: "reveal" },
    ];

    const allAnimated = [];

    animationMap.forEach(({ selector, cls, stagger }) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        // Don't double-assign
        if (
          !el.classList.contains("reveal") &&
          !el.classList.contains("reveal-left") &&
          !el.classList.contains("reveal-right") &&
          !el.classList.contains("reveal-scale")
        ) {
          el.classList.add(cls);
          if (stagger) {
            el.style.transitionDelay = `${i * 0.1}s`;
          }
          allAnimated.push(el);
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    allAnimated.forEach((el) => observer.observe(el));
  }

  addScrollAnimations();

  // Hire me button email functionality
  const hireBtn = document.getElementById("hire-btn");
  if (hireBtn) {
    hireBtn.addEventListener("click", (e) => {
      // Let the mailto link work naturally, but also ensure it opens
      const email = "mdnaeem824.mn@gmail.com";
      const subject = "Hiring Inquiry";
      const body =
        "Hi Naeem,\n\nI'm interested in discussing a potential opportunity with you.\n\nBest regards";

      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      // Try to open with window.location
      try {
        window.location.href = mailtoLink;
      } catch (error) {
        // Fallback: show notification with email info
        showNotification(`Please email me at: ${email}`, "info");
      }
    });
  }

  // Certificate Carousel functionality
  let currentCertificateIndex = 0;
  const certificateSlides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");

  window.openCertificateCarousel = function () {
    document.getElementById("certificateModal").style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  window.closeCertificateCarousel = function () {
    document.getElementById("certificateModal").style.display = "none";
    document.body.style.overflow = "auto";
  };

  window.nextCertificate = function () {
    currentCertificateIndex =
      (currentCertificateIndex + 1) % certificateSlides.length;
    updateCertificateCarousel();
  };

  window.previousCertificate = function () {
    currentCertificateIndex =
      (currentCertificateIndex - 1 + certificateSlides.length) %
      certificateSlides.length;
    updateCertificateCarousel();
  };

  window.goToCertificate = function (index) {
    currentCertificateIndex = index;
    updateCertificateCarousel();
  };

  function updateCertificateCarousel() {
    certificateSlides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentCertificateIndex);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentCertificateIndex);
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("certificateModal");
    if (event.target === modal) {
      closeCertificateCarousel();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    const modal = document.getElementById("certificateModal");
    if (modal && modal.style.display === "flex") {
      if (event.key === "ArrowLeft") previousCertificate();
      if (event.key === "ArrowRight") nextCertificate();
      if (event.key === "Escape") closeCertificateCarousel();
    }
  });
});
