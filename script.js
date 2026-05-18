const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

const reveals = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right",
);

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const skillFills = document.querySelectorAll(".skill-fill");

const animateSkills = () => {
  skillFills.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width + "%";
  });
};

window.addEventListener("scroll", animateSkills);

const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projects.forEach((project) => {
      if (filter === "all" || project.dataset.category === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("footerYear").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Hide old success message if visible
  successMsg.classList.remove("show");

  // Button loading state
  sendBtn.disabled = true;
  sendBtn.querySelector(".btn-text").textContent = "Sending...";

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // ✅ Show success message
      successMsg.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i>Your message has been sent! I'll get back to you shortly.`;
      successMsg.classList.add("show");

      // Reset form
      form.reset();

      // Auto hide after 5 seconds
      setTimeout(() => {
        successMsg.classList.remove("show");
      }, 5000);
    } else {
      // Show error message
      successMsg.innerHTML = `<i class="fa-solid fa-triangle-exclamation me-2"></i>Something went wrong. Please try again.`;
      successMsg.classList.add("show");
    }
  } catch (error) {
    successMsg.innerHTML = `<i class="fa-solid fa-wifi me-2"></i>Network error. Check your connection.`;
    successMsg.classList.add("show");
  }

  // Reset button
  sendBtn.disabled = false;
  sendBtn.querySelector(".btn-text").textContent = "Send Message";
});
