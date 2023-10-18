import pets from './data.js'

const petsCopy = [...pets];

const htmlOnDOM = (divId, str) => {
  document.getElementById(divId).innerHTML = str;
};

document.querySelector('#app').innerHTML = `
<div id="pageContainer" class="container">
  <h1>Pet Adoption</h1>
  <div id="filterBtnsContainer" class="filter-btns-container d-flex justify-content-around"></div>
  <div id="addPetForm" class=""></div>
  <div id="petContainer" class="pet-container"></div>
</div>
`;

const filterDomStr = `
  <div>
    <p>Filter Pets by Type:</p>
    <div id="filterButtons" class="filter-buttons">
      <button id="filterBtnCats" type="button" class="btn btn-primary">Cats</button>
      <button id="filterBtnDogs" type="button" class="btn btn-success">Dogs</button>
      <button id="filterBtnDinos" type="button" class="btn btn-warning">Dinos</button>
      <button id="allPets" type="button" class="btn btn-secondary">All</button>
    </div>
  </div>
  <div>
    <p>Add a new Pet</p>
    <div id="" class="">
      <button id="showAddPetForm" type="button" class="btn btn-primary">Add a Pet</button>
    </div>
  </div>
`;

const formStr = `
<button type="button" id="backBtn" class="btn">← Go Back</button>
<form id='createPetForm'>
  <div class="mb-3">
    <label for="petName" class="form-label">Name:</label>
    <input type="text" class="form-control" id="petName" required>
  </div>
  <div class="mb-3">
    <label for="petColor" class="form-label">Color:</label>
    <input type="text" class="form-control" id="petColor" required>
  </div>
  <div class="mb-3">
    <label for="petSkill" class="form-label">Special Skill:</label>
    <input type="text" class="form-control" id="petSkill" required>
  </div>
  <div class="mb-3">
    <label for="petImage" class="form-label">Image URL:</label>
    <input type="text" class="form-control" id="petImage" required>
  </div>
  <select id='petType' class="form-select">
    <option selected>Open this select menu</option>
    <option value="cat">Cat</option>
    <option value="dog">Dog</option>
    <option value="dino">Dino</option>
  </select>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`;

const petsOnDom = (arr) => {
  let domString = '';
  arr.forEach((pet) => {
    domString += `
    <div class="card" style="width: 15rem;">
      <div class="card-header">${pet.name}</div>
      <img src="${pet.imageUrl}"  alt="image of a ${pet.type}">
      <div class="card-body">
        <p class="card-title">Color: ${pet.color}</p>
        <p class="card-text">${pet.specialSkill}</p>
      </div>
      <div>
        <button id="delete--${pet.id}" type="button" class="btn btn-danger">Delete</button>
      </div>
      <div class="card-footer ${pet.type}-color">${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</div>
    </div>
    `;
  });
  htmlOnDOM('petContainer', domString);
};

const filterPets = (e) => {
  if (e.target.id.includes('filterBtn')) {
    let filteredPetsArr = []
    if (e.target.id === 'filterBtnCats') {
      filteredPetsArr = petsCopy.filter(pet => pet.type === 'cat');
    };
    if (e.target.id === 'filterBtnDogs') {
      filteredPetsArr = petsCopy.filter(pet => pet.type === 'dog');
    }
    if (e.target.id === 'filterBtnDinos') {
      filteredPetsArr = petsCopy.filter(pet => pet.type === 'dino');
    }
    petsOnDom(filteredPetsArr)
  }
  if (e.target.id === 'allPets') {
    petsOnDom(petsCopy);
  }
};

const deletePet = (e) => {
  if (e.target.id.includes('delete')) {
    const [, petId] = e.target.id.split('--');
    const petIndex = petsCopy.findIndex(obj => obj.id === Number(petId));
    petsCopy.splice(petIndex, 1);
    petsOnDom(petsCopy);
  }
};

const createPet = (e) => {
  e.preventDefault();
  const lastIndex = petsCopy[petsCopy.length - 1].id;
  const newPet = {
    id: lastIndex + 1,
    name: document.querySelector('#petName').value,
    color: document.querySelector('#petColor').value,
    specialSkill: document.querySelector('#petSkill').value,
    type: document.querySelector('#petType').value,
    imageUrl: document.querySelector('#petImage').value
  }
  petsCopy.push(newPet);
  console.log(petsCopy);
  initializeApp();
}

const showPetForm = (e) => {
  if (e.target.id === 'showAddPetForm') {
    htmlOnDOM('filterBtnsContainer', '');
    htmlOnDOM('petContainer', '');
    htmlOnDOM('addPetForm', formStr)
  };
};

const goBack = (e) => {
  if (e.target.id === 'backBtn') initializeApp();
}

const initializeApp = () => {
  htmlOnDOM('addPetForm', '');
  petsOnDom(petsCopy);
  htmlOnDOM('filterBtnsContainer', filterDomStr)
};

initializeApp();


document.querySelector('#filterBtnsContainer').addEventListener('click', filterPets);
document.querySelector('#petContainer').addEventListener('click', deletePet);
document.querySelector('#filterBtnsContainer').addEventListener('click', showPetForm);
document.querySelector('#addPetForm').addEventListener('submit', createPet);
document.querySelector('#app').addEventListener('click', goBack);
