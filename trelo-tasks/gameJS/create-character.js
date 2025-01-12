const avatars = {
    warrior: [
        'img/warrior-avatar1.jpg',
        'img/warrior-avatar2.jpg',
        'img/warrior-avatar3.jpg'
    ],
    mage: [
        'img/mage-avatar1.jpg',
        'img/mage-avatar2.jpg',
        'img/mage-avatar3.jpg'
    ],
    archer: [
        'img/archer-avatar1.jpg',
        'img/archer-avatar2.jpg',
        'img/archer-avatar3.jpg'
    ]
};

function updateAvatars(classType) {
    const avatarsContainer = document.getElementById('avatars');
    avatarsContainer.innerHTML = ''; 
    const selectedAvatars = avatars[classType];

    selectedAvatars.forEach(avatar => {
        const avatarLabel = document.createElement('label');
        const avatarInput = document.createElement('input');
        avatarInput.type = 'radio';
        avatarInput.name = 'avatar';
        avatarInput.value = avatar;
        
        const avatarImage = document.createElement('img');
        avatarImage.src = avatar;
        avatarImage.alt = 'Аватар';
        avatarImage.classList.add('avatar-img');

        avatarLabel.appendChild(avatarInput);
        avatarLabel.appendChild(avatarImage);
        avatarsContainer.appendChild(avatarLabel);
    });
}

function createCharacter() {
    const nickname = document.getElementById('nickname').value;
    const avatar = document.querySelector('input[name="avatar"]:checked')?.value;
    const characterClass = document.querySelector('input[name="class"]:checked')?.value;

    if (nickname && avatar && characterClass) {
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('avatar', avatar);
        localStorage.setItem('class', characterClass);
        window.location.href = 'game.html'; 
    } else {
        alert("Будь ласка, заповніть всі поля!");
    }
}