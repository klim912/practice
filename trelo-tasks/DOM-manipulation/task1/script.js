document.addEventListener("DOMContentLoaded", () => {
  function saveEvents(events) {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }

  function loadEvents() {
    return JSON.parse(localStorage.getItem("calendarEvents")) || {};
  }

  const events = loadEvents();
  let selectedDate = new Date().toISOString().split("T")[0];

  const calendarContainer = document.createElement("div");
  calendarContainer.id = "calendar-container";
  document.body.appendChild(calendarContainer);

  const header = document.createElement("h1");
  header.textContent = "Календар подій";
  calendarContainer.appendChild(header);

  const datePickerContainer = document.createElement("div");
  datePickerContainer.className = "date-picker-container";
  calendarContainer.appendChild(datePickerContainer);

  const datePickerLabel = document.createElement("label");
  datePickerLabel.textContent = "Оберіть дату: ";
  datePickerContainer.appendChild(datePickerLabel);

  const datePicker = document.createElement("input");
  datePicker.type = "date";
  datePicker.value = selectedDate;
  datePickerContainer.appendChild(datePicker);

  const eventsListContainer = document.createElement("div");
  eventsListContainer.className = "events-list-container";
  calendarContainer.appendChild(eventsListContainer);

  const eventsListTitle = document.createElement("h2");
  eventsListTitle.textContent = "Події на обрану дату";
  eventsListContainer.appendChild(eventsListTitle);

  const eventsList = document.createElement("ul");
  eventsList.id = "events-list";
  eventsListContainer.appendChild(eventsList);

  const daysWithEventsContainer = document.createElement("div");
  daysWithEventsContainer.className = "days-with-events-container";
  calendarContainer.appendChild(daysWithEventsContainer);

  const daysWithEventsTitle = document.createElement("h2");
  daysWithEventsTitle.textContent = "Дні з подіями";
  daysWithEventsContainer.appendChild(daysWithEventsTitle);

  const daysWithEventsList = document.createElement("ul");
  daysWithEventsList.id = "days-with-events-list";
  daysWithEventsContainer.appendChild(daysWithEventsList);

  const addEventContainer = document.createElement("div");
  addEventContainer.className = "add-event-container";
  calendarContainer.appendChild(addEventContainer);

  const eventInput = document.createElement("input");
  eventInput.type = "text";
  eventInput.placeholder = "Додати подію";
  eventInput.className = "event-input";
  addEventContainer.appendChild(eventInput);

  const addEventButton = document.createElement("button");
  addEventButton.textContent = "Додати";
  addEventButton.className = "add-event-button";
  addEventContainer.appendChild(addEventButton);

  function renderEvents() {
    eventsList.innerHTML = "";
    const dateEvents = events[selectedDate] || [];

    dateEvents.forEach((event, index) => {
      const eventItem = document.createElement("li");
      eventItem.className = "event-item";

      const eventText = document.createElement("span");
      eventText.textContent = event.text;
      eventText.className = "event-text";
      eventItem.appendChild(eventText);

      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeCheckbox.className = "event-complete-checkbox";
      completeCheckbox.checked = event.completed || false;
      completeCheckbox.addEventListener("change", () => {
        event.completed = completeCheckbox.checked;
        saveEvents(events);
      });
      eventItem.appendChild(completeCheckbox);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-event-button";
      deleteButton.addEventListener("click", () => {
        dateEvents.splice(index, 1);
        if (dateEvents.length === 0) {
          delete events[selectedDate];
        }
        saveEvents(events);
        renderEvents();
        renderDaysWithEvents();
      });

      eventItem.appendChild(deleteButton);
      eventsList.appendChild(eventItem);
    });
  }

  function renderDaysWithEvents() {
    daysWithEventsList.innerHTML = "";
    Object.keys(events).forEach((date) => {
      const dayItem = document.createElement("li");
      dayItem.className = "day-item";
      dayItem.textContent = date;
      dayItem.addEventListener("click", () => {
        selectedDate = date;
        datePicker.value = selectedDate;
        renderEvents();
      });
      daysWithEventsList.appendChild(dayItem);
    });
  }

  datePicker.addEventListener("change", (e) => {
    selectedDate = e.target.value;
    renderEvents();
  });

  addEventButton.addEventListener("click", () => {
    const newEvent = eventInput.value.trim();
    if (newEvent) {
      if (!events[selectedDate]) {
        events[selectedDate] = [];
      }
      events[selectedDate].push({ text: newEvent, completed: false });
      saveEvents(events);
      renderEvents();
      renderDaysWithEvents();
      eventInput.value = "";
    }
  });

  renderEvents();
  renderDaysWithEvents();
});
