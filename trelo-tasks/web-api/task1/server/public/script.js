const loginForm = document.getElementById('loginForm');
const registrationForm = document.getElementById('registrationForm');
const chatContainer = document.getElementById('chatContainer');
const logoutButton = document.getElementById('logoutButton');
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');
const userList = document.getElementById('userList');
const goToLoginButton = document.getElementById('goToLogin');
const goToRegisterButton = document.getElementById('goToRegister');
let socket;
const port = 3000;

function checkSession() {
    const username = sessionStorage.getItem('username');
    if (username) {
        showChat();
        startChat(username);
    } else {
        showLogin();
    }
}

function showLogin() {
    registrationForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    chatContainer.classList.add('hidden');
    logoutButton.classList.add('hidden');
}

function showChat() {
    registrationForm.classList.add('hidden');
    loginForm.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    logoutButton.classList.remove('hidden');
}

registerButton.addEventListener('click', async () => {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        alert('Реєстрація успішна! Увійдіть.');
        showLogin();
    } else {
        alert(await response.text());
    }
});

loginButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        sessionStorage.setItem('username', username);
        showChat();
        startChat(username);
    } else {
        alert(await response.text());
    }
});

goToRegisterButton.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registrationForm.classList.remove('hidden');
});

goToLoginButton.addEventListener('click', () => {
    registrationForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

logoutButton.addEventListener('click', async () => {
    await fetch('/logout', { method: 'POST' });
    socket.close();
    sessionStorage.removeItem('username');
    showLogin();
});

function startChat(username) {
    socket = new WebSocket(`ws://localhost:${port}`);
    socket.onopen = () => socket.send(JSON.stringify({ type: 'login', username }));
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
            const time = new Date(data.data.timestamp).toLocaleTimeString();
            messages.innerHTML += `<div><b>${data.data.username}</b>: ${data.data.message} <span class="message-time">${time}</span></div>`;
        } else if (data.type === 'users') {
            userList.innerHTML = data.data.map(user => `
                <div class="user ${user.online ? 'online' : 'offline'}">
                    <b>${user.username}</b>: ${user.online ? 'Онлайн' : 'Останній вхід: ' + new Date(user.lastSeen).toLocaleTimeString()}
                </div>
            `).join('');
        } else if (data.type === 'history') {
            messages.innerHTML = data.data.map(msg => {
                const time = new Date(msg.timestamp).toLocaleTimeString();
                return `<div><b>${msg.username}:</b> ${msg.message} <span class="message-time">${time}</span></div>`;
            }).join('');
        }
    };
}

sendButton.addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'message', message }));
        messageInput.value = '';
    } else {
        alert('Не вдалося надіслати повідомлення. Перевірте підключення.');
    }
});

checkSession();