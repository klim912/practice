document.addEventListener("DOMContentLoaded", () => {
  const root = document.body;

  const container = document.createElement("div");
  container.style.cssText = `
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        font-family: Arial, sans-serif;
    `;

  const header = document.createElement("h1");
  header.textContent = "Телефонна книга";
  header.style.textAlign = "center";
  header.style.color = "#333";
  container.appendChild(header);

  const form = document.createElement("form");
  form.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    `;

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "І'мя";
  nameInput.required = true;
  nameInput.style.cssText = `
        flex: 1;
        padding: 10px; 
        border: 1px solid #ccc; 
        border-radius: 6px;
    `;

  const phoneInput = document.createElement("input");
  phoneInput.type = "tel";
  phoneInput.placeholder = "Номер телефону";
  phoneInput.required = true;
  phoneInput.style.cssText = `
        flex: 1; 
        padding: 10px; 
        border: 1px solid #ccc; 
        border-radius: 6px;
    `;

  const phoneError = document.createElement("span");
  phoneError.textContent = "";
  phoneError.style.cssText = `
        color: red; 
        font-size: 12px; 
        display: none;
    `;
  container.appendChild(phoneError);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Додати контакт";
  submitButton.type = "submit";
  submitButton.style.cssText = `
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    `;

  submitButton.addEventListener("mouseover", () => {
    submitButton.style.backgroundColor = "#218838";
  });
  submitButton.addEventListener("mouseout", () => {
    submitButton.style.backgroundColor = "#28a745";
  });

  form.appendChild(nameInput);
  form.appendChild(phoneInput);
  form.appendChild(submitButton);
  container.appendChild(form);

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Пошук за ім'ям або номером телефону";
  searchInput.style.cssText = `
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 16px;
    `;
  container.appendChild(searchInput);

  const contactList = document.createElement("ul");
  contactList.style.cssText = `
        list-style: none;
        padding: 0;
        margin: 0;
    `;
  container.appendChild(contactList);

  root.appendChild(container);

  const loadContacts = () => JSON.parse(localStorage.getItem("contacts")) || [];
  const saveContacts = (contacts) =>
    localStorage.setItem("contacts", JSON.stringify(contacts));

  const renderContacts = (contacts) => {
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
      const li = document.createElement("li");
      li.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 6px;
                margin-bottom: 10px;
                background-color: #f9f9f9;
            `;

      const contactInfo = document.createElement("span");
      contactInfo.textContent = `${contact.name} - ${contact.phone}`;
      li.appendChild(contactInfo);

      const buttons = document.createElement("div");

      const editButton = document.createElement("button");
      editButton.textContent = "Редагувати";
      editButton.style.cssText = `
                padding: 5px 10px;
                margin-right: 5px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;
      editButton.addEventListener("mouseover", () => {
        editButton.style.backgroundColor = "#0056b3";
      });
      editButton.addEventListener("mouseout", () => {
        editButton.style.backgroundColor = "#007bff";
      });
      editButton.addEventListener("click", () => editContact(index));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Видалити";
      deleteButton.style.cssText = `
                padding: 5px 10px;
                background-color: #dc3545;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;
      deleteButton.addEventListener("mouseover", () => {
        deleteButton.style.backgroundColor = "#c82333";
      });
      deleteButton.addEventListener("mouseout", () => {
        deleteButton.style.backgroundColor = "#dc3545";
      });
      deleteButton.addEventListener("click", () => deleteContact(index));

      buttons.appendChild(editButton);
      buttons.appendChild(deleteButton);
      li.appendChild(buttons);
      contactList.appendChild(li);
    });
  };

  const addContact = (name, phone) => {
    const contacts = loadContacts();
    contacts.push({ name, phone });
    saveContacts(contacts);
    renderContacts(contacts);
  };

  const editContact = (index) => {
    const contacts = loadContacts();
    const contact = contacts[index];
    const newName = prompt("Нове ім'я:", contact.name);
    const newPhone = prompt("Новий номер телефону:", contact.phone);
    if (newName && newPhone && validatePhone(newPhone)) {
      contacts[index] = { name: newName, phone: newPhone };
      saveContacts(contacts);
      renderContacts(contacts);
    }
  };

  const deleteContact = (index) => {
    const contacts = loadContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderContacts(contacts);
  };

  const searchContacts = (query) => {
    const contacts = loadContacts();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.phone.includes(query)
    );
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      phoneError.textContent =
        "Некоректний номер телефону. Використовуйте формат: +1234567890.";
      phoneError.style.display = "block";
      return false;
    }
    phoneError.style.display = "none";
    return true;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    if (name && phone && validatePhone(phone)) {
      addContact(name, phone);
      form.reset();
    }
  });

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    const filteredContacts = searchContacts(query);
    renderContacts(filteredContacts);
  });

  renderContacts(loadContacts());
});
