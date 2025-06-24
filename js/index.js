let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
  renderForm();
  loadMonsters(currentPage);
  setupPagination();
});

// 1. Load monsters from API
function loadMonsters(page) {
  const container = document.getElementById('monster-container');
  container.innerHTML = ''; // Clear previous list

  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(monsters => {
      monsters.forEach(monster => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h2>${monster.name}</h2>
          <h4>Age: ${monster.age}</h4>
          <p>${monster.description}</p>
        `;
        container.appendChild(div);
      });
    });
}

// 2. Create the monster form
function renderForm() {
  const formDiv = document.getElementById('create-monster');
  const form = document.createElement('form');

  form.innerHTML = `
    <input id="name" placeholder="name..." />
    <input id="age" type="number" placeholder="age..." />
    <input id="description" placeholder="description..." />
    <button type="submit">Create Monster</button>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createMonster();
  });

  formDiv.appendChild(form);
}

// 3. Create monster (POST request)
function createMonster() {
  const name = document.getElementById('name').value;
  const age = parseFloat(document.getElementById('age').value);
  const description = document.getElementById('description').value;

  const monster = { name, age, description };

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(monster)
  })
    .then(res => res.json())
    .then(data => {
      alert('Monster created!');
      document.querySelector('form').reset();
    });
}

// 4. Setup pagination buttons
function setupPagination() {
  const backBtn = document.getElementById('back');
  const forwardBtn = document.getElementById('forward');

  backBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      loadMonsters(currentPage);
    } else {
      alert("You're already on the first page!");
    }
  });

  forwardBtn.addEventListener('click', () => {
    currentPage++;
    loadMonsters(currentPage);
  });
}
