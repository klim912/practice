if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker зареєстровано'))
    .catch(err => console.error('Помилка реєстрації Service Worker:', err));
}

let serverData = [];

document.querySelector('#data-form').addEventListener('submit', event => {
  event.preventDefault();

  const input = document.querySelector('#data-input');
  const newData = { text: input.value, timestamp: Date.now() };

  if (navigator.onLine) {
    serverData.push(newData);
    showMessage('Дані відправлено на сервер', 'success');
  } else {
    const offlineData = JSON.parse(localStorage.getItem('offlineData')) || [];
    offlineData.push(newData);
    localStorage.setItem('offlineData', JSON.stringify(offlineData));
    showMessage('Дані збережено офлайн', 'info');
  }

  input.value = '';
  updateDataList();
});

window.addEventListener('online', () => {
  const offlineData = JSON.parse(localStorage.getItem('offlineData')) || [];
  if (offlineData.length > 0) {
    serverData = serverData.concat(offlineData);
    localStorage.removeItem('offlineData');
    showMessage('Офлайн-дані синхронізовано з сервером', 'success');
    updateDataList();
  }
});

function showMessage(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.style.color = type === 'success' ? 'green' : 'blue';
  setTimeout(() => (statusDiv.textContent = ''), 3000);
}

function deleteData(index, isOnline) {
  if (isOnline) {
    serverData.splice(index, 1);
  } else {
    const offlineData = JSON.parse(localStorage.getItem('offlineData')) || [];
    offlineData.splice(index, 1);
    localStorage.setItem('offlineData', JSON.stringify(offlineData));
  }
  updateDataList();
}

function updateDataList() {
  const dataList = document.getElementById('data-list');
  dataList.innerHTML = '';

  if (navigator.onLine) {
    serverData.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.text} 
        <button onclick="deleteData(${index}, true)">Delete</button>
      `;
      dataList.appendChild(li);
    });
  }

  const offlineData = JSON.parse(localStorage.getItem('offlineData')) || [];
  offlineData.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.text} 
      <button onclick="deleteData(${index}, false)">Delete</button>
    `;
    dataList.appendChild(li);
  });
}

updateDataList();
