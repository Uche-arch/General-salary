let totalSalary = 0; // Initialize a variable to hold the total salary
let totalSalaryElement = document.getElementById("total-salary");
let tbody = document.getElementById("table-body");
let saveButton = document.getElementById("save-button"); // Reference to the Save button

// Initially, disable the Save button
saveButton.disabled = true;
saveButton.style.backgroundColor = "#ccc"; // Disable button styling

function update() {
  let username = document.getElementById("name").value.trim();
  let usersalary = document.getElementById("salary").value;
  let date = new Date().toLocaleDateString(`en-CA`);

  if (username == "" || usersalary == "") {
    let error = document.getElementById("error");
    error.innerHTML = "Input complete entry data before adding";
    error.style.color = "red";
    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
    return false;
  } else {
    usersalary = Number(usersalary);
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${username}</td><td>₦${usersalary.toLocaleString()}</td><td>${date}</td>
    <button onclick="edit(this)"><i class="fas fa-sync-alt"></i></button><button onclick="del(this)"><i class="fas fa-trash-alt"></i></button>`;
    tbody.appendChild(tr);

    totalSalary += usersalary; // Add the salary to the total
    updateTotalSalaryDisplay(); // Update the displayed total salary

    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";
  }
}

function del(button) {
  let tr = button.closest("tr");
  let salaryCell = tr.querySelectorAll("td")[1]; // Get the salary cell
  let salary = parseFloat(
    salaryCell.innerText.replace("₦", "").replace(/,/g, "")
  );

  // Remove the row
  tr.remove();

  // Update total salary
  totalSalary -= salary; // Subtract the deleted salary
  updateTotalSalaryDisplay(); // Update the displayed total salary
}

function edit(button) {
  let tr = button.closest("tr");
  let tds = tr.querySelectorAll("td");

  // Make the cells editable
  tds.forEach((td) => {
    td.contentEditable = "true";
    td.style.border = "2px solid #000"; // Add border when editable
  });

  // Focus on the salary cell
  let salaryCell = tds[1];
  salaryCell.focus(); // Focus on the salary cell so the user can start typing right away

  // Disable further updates by hiding the "Update" button
  button.style.display = "none";

  // Enable the Save button after editing
  saveButton.disabled = false;
  saveButton.style.backgroundColor = "#4CAF50"; // Enable button styling (green)
}

function save() {
  let rows = document.querySelectorAll("#table-body tr");
  totalSalary = 0; // Reset total salary before recalculating

  // Iterate through each row and calculate the updated total salary
  rows.forEach((row) => {
    let tds = row.querySelectorAll("td");
    let updatedSalary = parseFloat(
      tds[1].innerText.replace("₦", "").replace(/,/g, "")
    );

    // Reformat salary with the ₦ symbol and commas
    let formattedSalary = `₦${updatedSalary.toLocaleString()}`;
    tds[1].innerText = formattedSalary; // Update the salary cell with formatted value

    totalSalary += updatedSalary; // Sum the updated salary values

    // Make the cells non-editable and remove the border
    tds.forEach((td) => {
      td.contentEditable = "false";
      td.style.border = ""; // Remove border when not editable
    });

    // Show the "Update" button again
    let updateButton = row.querySelector("button[onclick='edit(this)']");
    updateButton.style.display = "inline-block";
  });

  updateTotalSalaryDisplay(); // Update the displayed total salary

  // After saving, disable the Save button again
  saveButton.disabled = true;
  saveButton.style.backgroundColor = "#ccc"; // Disable button styling (gray)
}

function updateTotalSalaryDisplay() {
  totalSalaryElement.innerHTML = `Total Salary: ₦${totalSalary.toLocaleString()}`;
}
