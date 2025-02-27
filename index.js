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
    usersalary = Number(usersalary).toLocaleString();
    let tr = document.createElement("tr");
    tr.innerHTML = `<td contenteditable="true">${username}</td><td contenteditable="true">₦${usersalary}</td><td contenteditable="true">${date}</td><button onclick="del(this)"><i class="fas fa-trash-alt"></i></button>`;
    tbody.appendChild(tr);

    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";
  }
}

let amount = 2500000;
document.getElementById("ceo-amount").innerHTML = `₦${amount.toLocaleString()}`;
let tbody = document.getElementById("table-body");
function del(button){
  let tr = button.closest("tr");
  tr.remove();
}

