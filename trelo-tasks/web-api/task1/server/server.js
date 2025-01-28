const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

const users = [];
const messages = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).send('Користувач із таким ім\'ям вже існує');
    }
    users.push({ username, password, online: false, lastSeen: null });
    res.status(201).send('Реєстрація успішна');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
        return res.status(401).send('Невірне ім\'я користувача або пароль');
    }

    res.cookie('username', username, { httpOnly: true });
    res.status(200).send('Авторизація успішна');
});

app.post('/logout', (req, res) => {
    const username = req.cookies.username;
    const user = users.find(u => u.username === username);
    if (user) {
        user.online = false;
        user.lastSeen = new Date();
        broadcastUsers();
    }
    res.clearCookie('username');
    res.status(200).send('Вихід успішний');
});

wss.on('connection', (ws, req) => {
    const username = req.headers.cookie?.split('=')[1];
    const currentUser = users.find(u => u.username === username);

    if (!currentUser) {
        ws.close();
        return;
    }

    currentUser.online = true;
    broadcastUsers();

    ws.send(JSON.stringify({ type: 'history', data: messages }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'message' && data.message.trim()) {
                const chatMessage = {
                    username: currentUser.username,
                    message: data.message,
                    timestamp: new Date(),
                };
                messages.push(chatMessage);

                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'message', data: chatMessage }));
                    }
                });
            }
        } catch (error) {
            console.error('Помилка обробки повідомлення:', error.message);
        }
    });

    ws.on('close', () => {
        currentUser.online = false;
        currentUser.lastSeen = new Date();
        broadcastUsers();
    });
});

function broadcastUsers() {
    const userList = users.map(user => ({
        username: user.username,
        online: user.online,
        lastSeen: user.lastSeen,
    }));

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'users', data: userList }));
        }
    });
}

server.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
