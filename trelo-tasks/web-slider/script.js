document.addEventListener("DOMContentLoaded", async () => {
    const slider = document.querySelector(".slider");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    let index = 0;
    let interval;
    let startX = 0;
    let endX = 0;

    //Тип контенту: api, local або text
    const contentType = "local"; 

    const localSlides = [
        { src: "https://cdn.pixabay.com/photo/2025/02/09/17/58/cycling-9394894_1280.jpg", alt: "Вечірня прогулянка" },
        { src: "https://cdn.pixabay.com/photo/2024/01/14/16/08/mountains-8508182_1280.jpg", alt: "Ліс та гори" },
        { src: "https://cdn.pixabay.com/photo/2025/01/13/07/05/zebra-9329810_1280.jpg", alt: "Зебри" },
        { src: "https://cdn.pixabay.com/photo/2025/01/22/15/57/hills-9352436_1280.jpg", alt: "Захід сонця" },
        { src: "https://cdn.pixabay.com/photo/2019/11/14/02/40/red-plum-4625194_1280.jpg", alt: "Сакура" }
    ];

    const textSlides = [
        { text: "Життя – це те, що з тобою відбувається, поки ти будуєш плани.", author: "Джон Леннон" },
        { text: "Ніколи не здавайся, навіть якщо все здається неможливим.", author: "Неізвестний автор" },
        { text: "Єдиний спосіб досягти успіху – діяти!", author: "Томас Едісон" },
        { text: "Щасливий той, хто задоволений своїм життям.", author: "Конфуцій" },
        { text: "Кожен новий день – це нова можливість.", author: "Опра Вінфрі" }
    ];

    let slides = localSlides; 

  
    async function fetchSlides() {
        if (contentType !== "api") return;

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=5");
            const data = await response.json();
            slides = data.map(item => ({ src: item.url, alt: item.title }));
            console.log("Слайди завантажені з API");
        } catch (error) {
            console.error("Помилка завантаження API, використовую локальні слайди", error);
            slides = localSlides; 
        }
    }

    function renderSlides() {
        slider.innerHTML = "";
        dotsContainer.innerHTML = "";

        slides.forEach((slide, i) => {
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("slide");

            if (contentType === "text") {
                slideDiv.innerHTML = `
                    <div class="text-slide">
                        <p class="quote">"${slide.text}"</p>
                        <p class="author">— ${slide.author}</p>
                    </div>
                `;
            } else {
                slideDiv.innerHTML = `
                    <img src="${slide.src}" alt="${slide.alt}">
                    <p class="caption">${slide.alt}</p>
                `;
            }

            slider.appendChild(slideDiv);

            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        updateDots();
        startAutoSlide();
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
    }

    function updateDots() {
        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    function goToSlide(n) {
        index = (n + slides.length) % slides.length;
        updateSlider();
        resetInterval();
    }

    function nextSlide() {
        goToSlide(index + 1);
    }

    function prevSlide() {
        goToSlide(index - 1);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 3000);
    }

    function resetInterval() {
        clearInterval(interval);
        startAutoSlide();
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    slider.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
    slider.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextSlide();
        if (endX - startX > 50) prevSlide();
    });

    if (contentType === "api") {
        await fetchSlides();
    } else if (contentType === "text") {
        slides = textSlides;
    } else {
        slides = localSlides;
    }

    renderSlides();
});
