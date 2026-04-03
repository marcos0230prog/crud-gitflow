let users = [];

// guardar datos
function saveData() {
  localStorage.setItem("users", JSON.stringify(users));
}

// renderizar tabla
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

// agregar usuario
function addUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (name.trim() === "" || email.trim() === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  users.push({ name, email });

  saveData();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  renderUsers();
}

// eliminar usuario
function deleteUser(index) {
  const confirmDelete = confirm("¿Seguro que quieres eliminar este usuario?");
  
  if (confirmDelete) {
    users.splice(index, 1);
    saveData();
    renderUsers();
  }
}

// editar usuario
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

// cargar datos al iniciar
window.onload = () => {
  const data = localStorage.getItem("users");
  if (data) {
    users = JSON.parse(data);
    renderUsers();
  }
};