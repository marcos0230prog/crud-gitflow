let users = [];

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
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Completa todos los campos");
    return;
  }

  users.push({ name, email });

  // limpiar inputs
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  renderUsers();
}

function deleteUser(index) {
  const confirmDelete = confirm("¿Seguro que quieres eliminar este usuario?");
  
  if (confirmDelete) {
    users.splice(index, 1);
    renderUsers();
  }
}

function editUser(index) {
  const newName = prompt("Nuevo nombre:", users[index].name);
  const newEmail = prompt("Nuevo email:", users[index].email);

  if (newName && newEmail) {
    users[index] = { name: newName, email: newEmail };
    renderUsers();
  }
}