class Entry {
  constructor(amount, category, date, type) {
    this.amount = parseFloat(amount);
    this.category = category;
    this.date = date;
    this.type = type;
  }
}

let entries = JSON.parse(localStorage.getItem("entries")) || [];
let reports = JSON.parse(localStorage.getItem("reports")) || [];
let balance = 0;

function addEntry() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;
  let date = document.getElementById("date").value;
  let type = document.getElementById("type").value;

  if (!amount || !category || !date) {
    alert("Заповніть всі поля!");
    return;
  }

  let entry = new Entry(amount, category, date, type);
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
  updateUI();
}

function updateUI() {
  balance = 0;
  let entriesDiv = document.getElementById("entries");
  entriesDiv.innerHTML = "";

  entries.forEach((entry, index) => {
    let div = document.createElement("div");
    div.className = `entry ${entry.type}`;
    div.innerHTML = `<span>${entry.date}</span> 
                         <span>${entry.category}</span> 
                         <span class="${entry.type}">${entry.amount} грн</span>
                         <button class="delete-btn" onclick="deleteEntry(${index})">🗑️</button>`;
    entriesDiv.appendChild(div);

    balance += entry.type === "income" ? entry.amount : -entry.amount;
  });

  document.getElementById("balance").textContent = balance + " грн";
  document.getElementById("remainingBalance").textContent = balance + " грн";
}

function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  updateUI();
}

function saveReport() {
  let reportName = document.getElementById("reportName").value;
  let reportType = document.getElementById("reportType").value;

  if (!reportName) {
    alert("Введіть назву звіту!");
    return;
  }

  let filteredEntries;
  let reportMonth = null;
  if (reportType === "month") {
    let inputMonth = prompt(
      "Введіть номер місяця (1-12), за який потрібно створити звіт:"
    );

    if (!inputMonth || isNaN(inputMonth) || inputMonth < 1 || inputMonth > 12) {
      alert(
        "Некоректний номер місяця! Введіть число від 1(січень) до 12(грудень)."
      );
      return;
    }

    reportMonth = parseInt(inputMonth);

    filteredEntries = entries.filter(
      (entry) => new Date(entry.date).getMonth() + 1 === reportMonth
    );
  } else {
    let category = prompt("Введіть категорію для звіту:").trim().toLowerCase();

    let categoryExists = entries.some(
      (entry) => entry.category.toLowerCase() === category
    );
    if (!categoryExists) {
      alert("Такої категорії не існує серед ваших доходів або витрат!");
      return;
    }
    filteredEntries = entries.filter(
      (entry) => entry.category.toLowerCase() === category
    );
  }

  let totalAmount = filteredEntries.reduce((sum, entry) => {
    return entry.type === "income" ? sum + entry.amount : sum - entry.amount;
  }, 0);

  let report = {
    name: reportName,
    entries: filteredEntries,
    total: totalAmount,
  };
  reports.push(report);
  localStorage.setItem("reports", JSON.stringify(reports));

  alert("Звіт збережено!");
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("date").value = new Date()
    .toISOString()
    .split("T")[0];

  let options = { year: "numeric", month: "long", day: "numeric" };
  document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString("uk-UA", options);

  updateUI();
});
