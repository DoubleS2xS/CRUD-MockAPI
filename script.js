const API_URL = "https://6897825a250b078c20421f6f.mockapi.io/users";

const userForm = document.querySelector(".form");
const nameInput = document.querySelector(".username");
const emailInput = document.querySelector(".email");
const userList = document.querySelector(".users-list");

async function loadUsers(){
  const res = await fetch(API_URL);
  const users = await res.json();

  userList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `${user.name} (${user.email}) 
    <button onclick="deleteUser('${user.id}')">Delete</button>
    <button onclick="editUser('${user.id}', '${user.name}', '${user.email}')">Change</button>`;
    userList.appendChild(li);
  })
}

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;

  await fetch(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, email}),
  })

  userForm.reset();
  loadUsers();
});

async function deleteUser(id){
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadUsers();
}

function editUser(id, oldName, oldEmail) {
  const name = prompt("Новое имя:", oldName);
  const email = prompt("Новый email:", oldEmail);
  if (name && email) {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email })
    }).then(loadUsers);
  }
}

loadUsers();
