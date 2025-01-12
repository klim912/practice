document.addEventListener("DOMContentLoaded", () => {
    startGame();
})

let player = null;
let enemy = null;
let gameInProgress = false;
let currentStep = 0;
const totalSteps = 40;
const encounterInterval = 7; // Кроки для появи мобів
const itemDropChance = 0.15; // Шанс знаходження предмета
let inventorySlots = [
    { item: null, quantity: 0 },
    { item: null, quantity: 0 },
    { item: null, quantity: 0 },
    { item: null, quantity: 0 },
    { item: null, quantity: 0 },
    { item: null, quantity: 0 }
];


const messages = [
    { text: "Ви рухаєтеся вперед по темному лісі.", background: "url('img/forest.jpg')" },
    { text: "Здолали кілька перешкод на шляху.", background: "url('img/obstacles.jpg')" },
    { text: "Пройшли через гірський перевал.", background: "url('img/mountains.jpg')" },
    { text: "Ви натрапили на древні руїни.", background: "url('img/ruins.jpg')" },
    { text: "Ваш шлях веде через темні печери.", background: "url('img/cave.jpg')" }
];

class Character {
    constructor(nickname, health, strength, defense, level, avatar, characterClass) {
        this.nickname = nickname;
        this.health = health;
        this.strength = strength;
        this.defense = defense;
        this.level = level;
        this.avatar = avatar;
        this.characterClass = characterClass;
    }

    attack(enemy) {
        const damage = Math.max(this.strength - enemy.defense, 1);
        enemy.health -= damage;
        if (enemy.health < 0) {
            enemy.health = 0; 
        }
        return damage;
    }

    levelUp() {
        this.level++;
        this.health += 20;
        this.strength += 5;
        this.defense += 5;
    }
}

function startGame() {
    const nickname = localStorage.getItem('nickname');

    if (!nickname) {
        window.location.href = 'create-character.html'; 
        return;
    }

    const avatar = localStorage.getItem('avatar');
    const characterClass = localStorage.getItem('class');

    let health = 100;
    let strength = 10;
    let defense = 10;

    if (characterClass === 'warrior') {
        strength += 5;
        defense += 5;
    } else if (characterClass === 'mage') {
        strength += 10;
        health -= 10;
    } else if (characterClass === 'archer') {
        strength += 7;
        defense += 3;
    }

    player = new Character(nickname, health, strength, defense, 1, avatar, characterClass);

    updatePlayerStats();
    document.getElementById('start-game').disabled = true;
    document.getElementById('start-game').style.display = 'none';
    gameInProgress = true;
    currentStep = 0;
    updateGameMessage("Гра почалася! Починайте рухатися.");
    document.getElementById('next-step').disabled = false;
}

function updatePlayerStats() {
    if (player) {
        document.getElementById('player-nickname').innerText = player.nickname;
        document.getElementById('player-class').innerText = player.characterClass;
        document.getElementById('player-health').innerText = player.health;
        document.getElementById('player-strength').innerText = player.strength;
        document.getElementById('player-defense').innerText = player.defense;
        document.getElementById('player-level').innerText = player.level;
        document.getElementById('player-avatar').src = player.avatar;
    }
}

function updateGameMessage(message) {
    document.getElementById('game-message').innerText = message;
}

function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('game-progress').style.width = progress + '%';
}

function updateGameBackground(background) {
    const gameContainer = document.querySelector('.container');
    gameContainer.style.transition = 'background-image 2s ease-in-out';
    gameContainer.style.backgroundImage = background;
}


function getRandomMessage() {
    const messageIndex = Math.floor(currentStep / 7) % messages.length;
    const selectedMessage = messages[messageIndex];
    updateGameMessage(selectedMessage.text);
    updateGameBackground(selectedMessage.background);
}

function spawnEnemy() {
    const enemyTypes = [
        { name: 'Орк', baseHealth: 80, baseStrength: 15, baseDefense: 5, avatar: 'img/ork.jpg' },
        { name: 'Дракон', baseHealth: 120, baseStrength: 18, baseDefense: 10, avatar: 'img/dragon.jpg' },
        { name: 'Гоблін', baseHealth: 60, baseStrength: 10, baseDefense: 3, avatar: 'img/goblin.jpg' }
    ];

    const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

    const enemyHealth = randomEnemy.baseHealth + (player.level * 20);
    const enemyStrength = randomEnemy.baseStrength + (player.level * 4);
    const enemyDefense = randomEnemy.baseDefense + (player.level * 3);

    enemy = new Character(
        randomEnemy.name,
        enemyHealth,
        enemyStrength,
        enemyDefense,
        player.level,
        randomEnemy.avatar
    );

    updateEnemyStats();
    showEnemyInfo();
}

function showEnemyInfo() {
    document.querySelector('.enemy-info').style.display = 'block';
}

function hideEnemyInfo() {
    document.querySelector('.enemy-info').style.display = 'none';
}

function updateEnemyStats() {
    document.getElementById('game-message').innerText = `Зустріч з монстром: ${enemy.nickname}!`;
    document.getElementById('attack').disabled = false;
    showEnemyHealth();
    updateEnemyAvatar();
}

function updateEnemyHealth() {
    document.getElementById('enemy-health').innerText = enemy.health;
}

function updateEnemyAvatar() {
    const enemyAvatar = document.getElementById('enemy-avatar');
    enemyAvatar.innerHTML = `<img src="${enemy.avatar}" alt="${enemy.nickname}" class="avatar-img">`;
}

function playerAttack() {
    if (player.health <= 0 || enemy.health <= 0) {
        endBattle();
        return;
    }

    const damageToEnemy = player.attack(enemy);
    updateGameMessage(`${player.nickname} завдав ${damageToEnemy} пошкоджень ${enemy.nickname}!`);
    updateEnemyHealth();
    if (enemy.health <= 0) {
        endBattle(true);
    } else {
        enemyAttack();
    }
}

function enemyAttack() {
    const damageToPlayer = Math.max(enemy.strength - player.defense, 1);
    player.health -= damageToPlayer;
    if (player.health < 0) {
        player.health = 0;
    }
    updateGameMessage(`${enemy.nickname} завдав ${damageToPlayer} пошкоджень ${player.nickname}!`);
    updatePlayerStats();
    if (player.health <= 0) {
        endBattle(false);
    }
}

function endBattle(victory = false) {
    if (victory) {
        updateGameMessage(`${player.nickname} переміг ${enemy.nickname}!`);
        dropItem(enemy.nickname);
        player.levelUp();
        updatePlayerStats();
        document.getElementById('attack').disabled = true;
        document.getElementById('next-step').disabled = false;
        hideEnemyInfo();
    } else {
        updateGameMessage(`${enemy.nickname} переміг ${player.nickname}. Гра завершена.`);
        document.getElementById('attack').disabled = true;
        showRestartButton();
    }
    saveGameProgress();
}

function dropItem(enemyName) {
    let item;
    if (enemyName === 'Дракон') {
        item = { name: 'Серце дракона', effect: 'health', value: 50, description: 'Відновлює здоров\'я на 50 одиниць.', image: 'img/dragons_heart.jpg' };
    } else if (enemyName === 'Гоблін') {
        item = { name: 'Золота монета', effect: 'defense', value: 7, description: 'Збільшує оборону на 7.', image: 'img/gold_coin.jpg' };
    } else if (enemyName === 'Орк') {
        item = { name: 'Дубинка орка', effect: 'strength', value: 10, description: 'Збільшує силу на 10.', image: 'img/ork_club.jpg' };
    }
    if (item) {
        addItemToInventory(item);
        updateGameMessage(`Ви отримали ${item.name}!`);
        showItemPopup(item);
    }
}

function hideEnemyHealth() {
    const enemyHealthParagraph = document.querySelector('.enemy-info p');
    enemyHealthParagraph.style.display = 'none'; 
}

function showEnemyHealth() {
    const enemyHealthParagraph = document.querySelector('.enemy-info p');
    enemyHealthParagraph.style.display = 'block'; 
}

function nextStep() {
    currentStep++;
    updateProgressBar();

    if (currentStep % encounterInterval === 0) {
        spawnEnemy();
        document.getElementById('next-step').disabled = true;
    } else {
        findItem();
        getRandomMessage();
    }

    if (currentStep >= totalSteps) {
        updateGameMessage("Вітаємо! Ви завершили гру.");
        document.getElementById('next-step').disabled = true;
        showRestartButton();
    }

    saveGameProgress();

}

function findItem() {
    if (Math.random() <= itemDropChance) {
        const items = [
            { name: 'Зілля здоров\'я', description: 'Відновлює 25 одиниць здоров\'я.', effect: 'health', value: 25, image: 'img/potion.jpg' },
            { name: 'Щит', description: 'Збільшує захист на 10.', effect: 'defense', value: 10, image: 'img/shield.jpg' },
            { name: 'Зілля сили', description: 'Збільшує силу на 10.', effect: 'strength', value: 10, image: 'img/strength_potion.jpg' },
        ];
        
        const randomItem = items[Math.floor(Math.random() * items.length)];
        addItemToInventory(randomItem);
        updateGameMessage(`Ви знайшли предмет: ${randomItem.name}`);
        showItemPopup(randomItem);
    }
}

function addItemToInventory(item) {
    const slotIndex = inventorySlots.findIndex(slot => slot.item === item.name || slot.item === null);
    if (slotIndex !== -1) {
        if (inventorySlots[slotIndex].item === null) {
            inventorySlots[slotIndex].item = item.name;
            inventorySlots[slotIndex].quantity = 1;
            updateSlotDisplay(slotIndex, item.image, 1);
        } else {
            inventorySlots[slotIndex].quantity += 1;
            updateSlotDisplay(slotIndex, item.image, inventorySlots[slotIndex].quantity);
        }
    }
}

function updateSlotDisplay(slotIndex, image, quantity) {
    const slot = document.querySelectorAll('.inventory-slot')[slotIndex];
    slot.querySelector('.item-icon').src = image;
    slot.querySelector('.item-icon').style.display = 'block';
    slot.querySelector('.item-quantity').innerText = quantity;
}

function useItemFromSlot(slotIndex) {
    const slot = inventorySlots[slotIndex];  
    const item = {
        'Зілля здоров\'я': { effect: 'health', value: 25, name: 'Зілля здоров\'я', image: 'img/potion.jpg' },
        'Щит': { effect: 'defense', value: 10, name: 'Щит', image: 'img/shield.jpg' },
        'Зілля сили': { effect: 'strength', value: 10, name: 'Зілля сили', image: 'img/strength_potion.jpg' },
        'Серце дракона': { effect: 'dragon_health', value: 50, name: 'Серце дракона', image: 'img/dragons_heart.jpg' },
        'Золота монета': { effect: 'defense', value: 7, name: 'Золота монета', image: 'img/gold_coin.jpg' },
        'Дубинка орка': { effect: 'strength', value: 10, name: 'Дубинка орка', image: 'img/ork_club.jpg' }
    }[slot.item];
    
    if (item) {
        applyItemEffect(item);
        slot.quantity -= 1;
        updateSlotDisplay(slotIndex, item.image, slot.quantity);
    
        if (slot.quantity === 0) {
            slot.item = null;
            document.querySelectorAll('.inventory-slot')[slotIndex].querySelector('.item-icon').style.display = 'none';
        }
    
        updatePlayerStats();
        updateGameMessage(`Ви використали ${item.name}!`);
    }
    saveGameProgress();
}

function updateInventoryDisplay() {
    inventorySlots.forEach((slot, index) => {
        if (slot.item) {
            updateSlotDisplay(index, `img/${slot.item.toLowerCase().replace(/ /g, '_')}.jpg`, slot.quantity);
        } else {
            document.querySelectorAll('.inventory-slot')[index].querySelector('.item-icon').style.display = 'none';
            document.querySelectorAll('.inventory-slot')[index].querySelector('.item-quantity').innerText = '';
        }
    });
}

function applyItemEffect(item) {
    if (item.effect === 'health') {
        player.health += item.value;
    } else if (item.effect === 'strength') {
        player.strength += item.value;
    } else if (item.effect === 'defense') {
        player.defense += item.value;
    } else if (item.effect === 'dragon_health') {
        player.health += item.value;
    }
}

function showItemPopup(item) {
    const popup = document.getElementById('item-popup');
    popup.style.display = 'block';
    popup.innerHTML = `
        <h4>${item.name}</h4>
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <p>${item.description}</p>
        <button onclick="closeItemPopup()">Закрити</button>
    `;
}

function closeItemPopup() {
    document.getElementById('item-popup').style.display = 'none';
}

function showRestartButton() {
    const restartButton = document.getElementById('restart-game');
    restartButton.style.display = 'inline';
}

function restartGame() {
    localStorage.clear();

    document.getElementById('restart-game').style.display = 'none';
    document.getElementById('start-game').style.display = 'inline';
    document.getElementById('start-game').disabled = false;
    document.getElementById('game-message').innerText = "Вітаємо в грі! Натисніть 'Старт' для початку.";
    document.getElementById('next-step').disabled = true;
    document.getElementById('attack').disabled = true;
    
    hideEnemyInfo();

    inventorySlots = [
        { item: null, quantity: 0 },
        { item: null, quantity: 0 },
        { item: null, quantity: 0 },
        { item: null, quantity: 0 },
        { item: null, quantity: 0 },
        { item: null, quantity: 0 }
    ];

    updateInventoryDisplay();

    currentStep = 0;
    updateProgressBar();

    enemy = null;
    document.getElementById('enemy-avatar').innerHTML = '';
    document.getElementById('enemy-health').innerText = '-';

    player = null;

    window.location.href = 'create-character.html';
}

function saveGameProgress() {
    const gameState = {
        player: {
            nickname: player.nickname,
            health: player.health,
            strength: player.strength,
            defense: player.defense,
            level: player.level,
            avatar: player.avatar,
            characterClass: player.characterClass
        },
        currentStep: currentStep,
        inventory: inventorySlots,
        gameInProgress: gameInProgress,
        enemy: enemy ? {
            nickname: enemy.nickname,
            health: enemy.health,
            strength: enemy.strength,
            defense: enemy.defense,
            avatar: enemy.avatar
        } : null,
        background: document.querySelector('.container').style.backgroundImage
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameProgress() {
    const savedGameState = localStorage.getItem('gameState');
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        
        player = new Character(
            gameState.player.nickname,
            gameState.player.health,
            gameState.player.strength,
            gameState.player.defense,
            gameState.player.level,
            gameState.player.avatar,
            gameState.player.characterClass
        );
        
        currentStep = gameState.currentStep;
        inventorySlots = gameState.inventory;
        gameInProgress = gameState.gameInProgress;

        if (gameState.enemy) {
            enemy = new Character(
                gameState.enemy.nickname,
                gameState.enemy.health,
                gameState.enemy.strength,
                gameState.enemy.defense,
                player.level,
                gameState.enemy.avatar
            );
            updateEnemyStats();
            showEnemyInfo();
        }

        updatePlayerStats();
        updateProgressBar();
        updateGameMessage(`Вітаємо, ${player.nickname}!`);
        document.getElementById('next-step').disabled = false;

        if (gameState.background) {
            document.querySelector('.container').style.backgroundImage = gameState.background;
        }

        if (gameInProgress) {
            document.getElementById('next-step').disabled = false;
            document.getElementById('attack').disabled = enemy ? false : true;
        }
    }
}


window.addEventListener('load', function () {
    loadGameProgress();
});