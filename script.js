document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  const form = document.getElementById("commentForm");
  if (form) {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      const name = document.getElementById("visitorName").value.trim();
      const note = document.getElementById("formNote");
      const submitBtn = document.getElementById("submitBtn");

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
      if (note) {
        note.textContent = "";
      }

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          if (note) {
            note.style.color = "#0d9488";
            note.textContent = `Thank you, ${name}! Your comment has been sent.`;
          }
          form.reset();
        } else {
          const data = await response.json();
          if (note) {
            note.style.color = "#dc2626";
            note.textContent = data.errors
              ? data.errors.map(err => err.message).join(", ")
              : "Oops! Something went wrong. Please try again.";
          }
        }
      } catch (error) {
        if (note) {
          note.style.color = "#dc2626";
          note.textContent = "Network error. Please check your connection and try again.";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send comment ↗";
        }
      }
    });
  }

  // Photo Gallery Lightbox
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');

  if (galleryItems.length && lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
    let currentIndex = 0;

    function showPhoto(index) {
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[currentIndex];
      const img = item.querySelector('img');
      const caption = item.querySelector('figcaption');

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : img.alt;

      if (!lightbox.open) lightbox.showModal();
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => showPhoto(index));
    });

    closeBtn.addEventListener('click', () => lightbox.close());
    prevBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
    nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.open) return;
      if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
      if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
    });
  }
});