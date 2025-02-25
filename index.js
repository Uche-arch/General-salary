function update() {
  let username = document.getElementById("name").value.trim();
  let usersalary = document.getElementById("salary").value;
  let date = new Date().toLocaleDateString(`en-CA`);

  if (username == "" || usersalary == "") {
    let error = document.getElementById("error");
    error.innerHTML = "Input complete entry data before adding";
    error.style.color = "red";
    setTimeout(()=>{error.style.display = "none"}, 3000);
    return false;
  } else {
    usersalary = Number(usersalary).toLocaleString();
    let tr = document.createElement("tr");
    let tbody = document.getElementById("table-body");
    tr.innerHTML = `<td>${username}</td><td>₦${usersalary}</td><td>${date}</td>`;
    tbody.appendChild(tr);

    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";
  }
}
let amount = 2500000;
document.getElementById("ceo-amount").innerHTML = `₦${amount.toLocaleString()}`;
