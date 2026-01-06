// Smooth scrolling function
function scrollToPortfolio() {
  const portfolioSection = document.getElementById("portfolio");
  if (portfolioSection) {
    portfolioSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Generic scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    // If section doesn't exist, scroll to portfolio as fallback
    scrollToPortfolio();
  }
}

// Animated counter function
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60 FPS
  let current = start;

  element.classList.add("counting");

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(timer);
      element.classList.remove("counting");

      // Add suffix for specific stats
      const label = element.nextElementSibling.textContent;
      if (label.includes("Projects") || label.includes("Team")) {
        element.textContent = Math.floor(current) + "+";
      } else if (label.includes("Satisfaction")) {
        element.textContent = Math.floor(current) + "%";
      } else {
        element.textContent = Math.floor(current);
      }
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Stats animation trigger
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat, index) => {
    const target = parseInt(stat.dataset.target);
    // Stagger the animations
    setTimeout(() => {
      animateCounter(stat, target);
    }, index * 200);
  });
}

// Project interaction handlers

function closeModal() {
  if (window.currentModal) {
    window.currentModal.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(window.currentModal);
      window.currentModal = null;
    }, 300);
  }
}

function startProject() {
  // Create contact form modal
  const modal = document.createElement("div");
  modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

  const form = document.createElement("div");
  form.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border-radius: 30px;
                padding: 40px;
                max-width: 400px;
                width: 90%;
                text-align: center;
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;

  form.innerHTML = `
                <h3 style="margin-bottom: 20px; font-size: 1.5rem;">Let's Create Something Amazing</h3>
                <p style="margin-bottom: 30px; color: #aaa;">Ready to start your next project? Get in touch!</p>
                <div style="text-align: left; margin-bottom: 30px;">
                    <input type="text" placeholder="Your Name" style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 15px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);">
                    <input type="email" placeholder="Email Address" style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 15px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);">
                    <textarea placeholder="Tell us about your project..." style="width: 100%; padding: 12px; height: 80px; border: none; border-radius: 15px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); resize: vertical;"></textarea>
                </div>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="submitForm()" style="
                        background: linear-gradient(135deg, #ff4757, #ff8c42);
                        border: none;
                        color: white;
                        padding: 12px 25px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Send Message</button>
                    <button onclick="closeModal()" style="
                        background: transparent;
                        border: 2px solid #ff4757;
                        color: #ff4757;
                        padding: 12px 25px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Cancel</button>
                </div>
            `;

  modal.appendChild(form);
  document.body.appendChild(modal);

  setTimeout(() => (modal.style.opacity = "1"), 10);
  window.currentModal = modal;
}

function submitForm() {
  alert("🚀 Message sent! We'll get back to you within 24 hours.");
  closeModal();
}

// Parallax scrolling effect
window.addEventListener("scroll", () => {
  if (window.innerWidth > 768) {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-shape");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.2;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";

      // Trigger stats animation when stats section is visible
      if (entry.target.classList.contains("stats-section")) {
        animateStats();
        // Unobserve after animation to prevent re-triggering
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".portfolio-item, .stats-section").forEach((item) => {
    observer.observe(item);
  });
});

// Add dynamic background color shifting
if (window.innerWidth > 768) {
  setInterval(() => {
    const heroBg = document.querySelector(".hero-bg");
    const time = Date.now() / 5000;
    const hue = Math.sin(time) * 30;
    heroBg.style.filter = `hue-rotate(${hue}deg)`;
  }, 100);
}

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && window.currentModal) {
    closeModal();
  }
});

// Close modal on backdrop click
document.addEventListener("click", (e) => {
  if (e.target === window.currentModal) {
    closeModal();
  }
});
