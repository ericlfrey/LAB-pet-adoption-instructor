import pets from './data.js'

const petsCopy = [...pets];

const htmlOnDOM = (divId, str) => {
  document.getElementById(divId).innerHTML = str;
};

document.querySelector('#app').innerHTML = `
<div id="pageContainer" class="container">
  <h1>Pet Adoption</h1>
  <div id="filterBtnsContainer" class="filter-btns-container d-flex justify-content-around">
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
  </div>
  <div id="petContainer" class="pet-container"></div>
</div>
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

petsOnDom(petsCopy);

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
    const petIndex = petsCopy.findIndex(obj => obj.id === Number(petId))
    petsCopy.splice(petIndex, 1);
    petsOnDom(petsCopy);
  }
};

document.querySelector('#filterButtons').addEventListener('click', filterPets);
document.querySelector('#petContainer').addEventListener('click', deletePet);
