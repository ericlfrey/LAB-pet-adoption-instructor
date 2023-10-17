import pets from './data.js'

const htmlOnDOM = (divId, str) => {
  document.getElementById(divId).innerHTML = str;
};

document.querySelector('#app').innerHTML = `
<div id="pageContainer" class="container">
  <h1>Pet Adoption</h1>
  <div id="filterBtnsContainer" class="filter-btns-container">
    <p>Filter Pets by Type:</p>
    <div id="filterBtns" class="filter-buttons">
      <button id="filterCats" type="button" class="btn btn-primary">Cats</button>
      <button id="filterDogs" type="button" class="btn btn-success">Dogs</button>
      <button id="filterDinos" type="button" class="btn btn-warning">Dinos</button>
      <button id="allPets" type="button" class="btn btn-secondary">All</button>
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
      <div class="card-footer ${pet.type}-color">${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</div>
    </div>
    `;
  });
  htmlOnDOM('petContainer', domString);
};

petsOnDom(pets);

const filterPets = (e) => {
  let filteredPetsArr = []
  if (e.target.id === 'filterCats') {
    filteredPetsArr = [...pets].filter(pet => pet.type === 'cat');
  };
  if (e.target.id === 'filterDogs') {
    filteredPetsArr = [...pets].filter(pet => pet.type === 'dog');
  }
  if (e.target.id === 'filterDinos') {
    filteredPetsArr = [...pets].filter(pet => pet.type === 'dino');
  }

  petsOnDom(filteredPetsArr)

  if (e.target.id === 'allPets') {
    petsOnDom(pets);
  }
}

document.querySelector('#filterBtns').addEventListener('click', filterPets)
