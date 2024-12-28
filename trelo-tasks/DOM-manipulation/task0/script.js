document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("image-form");
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxDescription = document.getElementById("lightbox-description");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let images = JSON.parse(localStorage.getItem("gallery")) || [];
  let currentIndex = -1;

  renderGallery();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const url = document.getElementById("image-url").value;
    const desc = document.getElementById("image-desc").value;

    if (url && desc) {
      images.push({ url, desc });
      saveToLocalStorage();
      renderGallery();
      form.reset();
    }
  });

  function renderGallery() {
    gallery.innerHTML = "";
    images.forEach((image, index) => {
      const item = document.createElement("div");
      item.className = "gallery-item";

      const img = document.createElement("img");
      img.src = image.url;
      img.alt = image.desc;
      img.addEventListener("click", () => openLightbox(index));

      const description = document.createElement("p");
      description.textContent = image.desc;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.addEventListener("click", () => deleteImage(index));

      item.appendChild(img);
      item.appendChild(description);
      item.appendChild(deleteBtn);
      gallery.appendChild(item);
    });
  }

  function deleteImage(index) {
    images.splice(index, 1);
    saveToLocalStorage();
    renderGallery();
  }

  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    updateLightboxContent();
  }

  function updateLightboxContent() {
    if (images[currentIndex]) {
      lightboxImage.src = images[currentIndex].url;
      lightboxDescription.textContent = images[currentIndex].desc;
    }
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateLightboxContent();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateLightboxContent();
    }
  });

  function saveToLocalStorage() {
    localStorage.setItem("gallery", JSON.stringify(images));
  }
});
