const select = document.querySelector('select');
const themeButton = document.querySelector('.lng-theme-button');
const allLang = ['ua', 'en'];

const initState = () => {
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'light');
    }

    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'en');
    }

    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('language');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    select.value = savedLang;
    applyLanguage();
};

const applyLanguage = () => {
    const lang = localStorage.getItem('language');
    for (let key in langArr) {
        let element = document.querySelector('.lng-' + key);
        if (element) {
            element.innerHTML = langArr[key][lang];
        }
    }
};

select.addEventListener('change', () => {
    const lang = select.value;
    localStorage.setItem('language', lang);
    applyLanguage();
});

const toggleTheme = () => {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    document.body.classList.toggle('dark-theme', !isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
};

themeButton.addEventListener('click', toggleTheme);

window.addEventListener('storage', (event) => {
    if (event.key === 'language') {
        select.value = event.newValue;
        applyLanguage();
    } else if (event.key === 'theme') {
        const isDarkTheme = event.newValue === 'dark';
        document.body.classList.toggle('dark-theme', isDarkTheme);
    }
});

initState();
