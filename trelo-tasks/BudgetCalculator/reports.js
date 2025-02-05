let reports = JSON.parse(localStorage.getItem("reports")) || [];

function displayReports() {
  let reportsDiv = document.getElementById("reports-list");
  reportsDiv.innerHTML = "";

  reports.forEach((report, index) => {
    let div = document.createElement("div");
    div.className = "report-item";
    div.innerHTML = `<span>${report.name}</span> 
                         <button onclick="viewReport(${index})">👁️</button>
                         <button onclick="deleteReport(${index})">🗑️</button>`;
    reportsDiv.appendChild(div);
  });
}

function viewReport(index) {
  let report = reports[index];
  let detailsDiv = document.getElementById("report-details");
  detailsDiv.innerHTML = "";

  report.entries.forEach((entry) => {
    let div = document.createElement("div");
    div.className = `entry ${entry.type}`;
    div.innerHTML = `<span>${entry.date}</span> 
                         <span>${entry.category}</span> 
                         <span class="${entry.type}">${entry.amount} грн</span>`;
    detailsDiv.appendChild(div);
  });

  document.getElementById("total-amount").textContent = report.total + " грн";
  document.getElementById("report-popup").style.display = "block";
}

function deleteReport(index) {
  reports.splice(index, 1);
  localStorage.setItem("reports", JSON.stringify(reports));
  displayReports();
}

function closePopup() {
  document.getElementById("report-popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  displayReports();

  document.getElementById("report-popup").style.display = "style";
});
