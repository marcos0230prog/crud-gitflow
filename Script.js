let users = [];

function saveData() {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderUsers() {
  const table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach((user, index) => {
    table.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="editUser(${index})">Editar</button>
          <button onclick="deleteUser(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function addUser() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  const name = nameInput.value;
  const email = emailInput.value;

  if (name.trim() === "" || email.trim() === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  users.push({ name, email });

  saveData();
  renderUsers();

  nameInput.value = "";
  emailInput.value = "";
}

function deleteUser(index) {
  const confirmDelete = confirm("¿Seguro que quieres eliminar este usuario?");
  
  if (confirmDelete) {
    users.splice(index, 1);
    saveData();
    renderUsers();
  }
}

function editUser(index) {
  const newName = prompt("Nuevo nombre:", users[index].name);
  const newEmail = prompt("Nuevo email:", users[index].email);

  if (!newName || !newEmail) {
    alert("No puedes dejar campos vacíos");
    return;
  }

  users[index] = { name: newName, email: newEmail };
  saveData();
  renderUsers();
}

window.onload = () => {
  const data = localStorage.getItem("users");
  if (data) {
    users = JSON.parse(data);
    renderUsers();
  }
};