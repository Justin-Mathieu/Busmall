'use strict';
// global variables
const maxVotes = 25; // number of attempts
const LOCAL_STORAGE_KEY = 'anything'; // key that results get stored under

const busmallCatalog = []; // array all products
const catalogQueue = []; // queue of products to show

// dom connection
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

// clicks made
let votesMade = 0;

//constructor
function Product(name, img) {
  this.name = name;
  this.img = img;
  this.shown = 0;
  this.votes = 0;
  busmallCatalog.push(this);
}
new Product('bag', './img/assets/bag.jpg');
new Product('banana', './img/assets/banana.jpg');
new Product('bathroom', './img/assets/bathroom.jpg');
new Product('boots', './img/assets/boots.jpg');
new Product('breakfast', './img/assets/breakfast.jpg');
new Product('bubblegum', './img/assets/bubblegum.jpg');
new Product('chair', './img/assets/chair.jpg');
new Product('cthulhu', './img/assets/cthulhu.jpg');
new Product('dog-duck', './img/assets/dog-duck.jpg');
new Product('dragon', './img/assets/dragon.jpg');
new Product('pen', './img/assets/pen.jpg');
new Product('pet-sweep', './img/assets/pet-sweep.jpg');
new Product('scissors', './img/assets/scissors.jpg');
new Product('shark', './img/assets/shark.jpg');
new Product('sweep', './img/assets/sweep.png');
new Product('tauntaun', './img/assets/tauntaun.jpg');
new Product('unicorn', './img/assets/unicorn.jpg');
new Product('water-can', './img/assets/water-can.jpg');
new Product('wine-glass', './img/assets/wine-glass.jpg');

//functions
// randon number function for mdn
function getRandomIndexFromCatalog() {
  return Math.floor(Math.random() * busmallCatalog.length);
}

function fillCatalogQueue() {
  while (catalogQueue.length < 6) {
    let num = getRandomIndexFromCatalog();
    while (catalogQueue.includes(num)) {
      num = getRandomIndexFromCatalog();
    }
    catalogQueue.push(num);
  }
}

function renderImages() {
  fillCatalogQueue();

  console.log(catalogQueue);
  image1.src = busmallCatalog[catalogQueue[0]].img;
  image1.alt = busmallCatalog[catalogQueue[0]].name;
  busmallCatalog[catalogQueue[0]].shown++;

  image2.src = busmallCatalog[catalogQueue[1]].img;
  image2.alt = busmallCatalog[catalogQueue[1]].name;
  busmallCatalog[catalogQueue[1]].shown++;

  image3.src = busmallCatalog[catalogQueue[2]].img;
  image3.alt = busmallCatalog[catalogQueue[2]].name;
  busmallCatalog[catalogQueue[2]].shown++;
  catalogQueue.shift();
  catalogQueue.shift();
  catalogQueue.shift();
}

function handleMaxAttempts() {
  let views = [];
  let votes = [];
  let names = [];

  for (let i = 0; i < busmallCatalog.length; i++) {
    let product = busmallCatalog[i];
    views.push(product.shown);
    names.push(product.name);
    votes.push(product.votes);
  }
  putResultsinLocalStorage(views, votes, names);

  renderChart(views, votes, names);
}

//event handler
function imageClickHandler(event) {
  votesMade++;
  let imageClick = event.target.alt;
  // console.log(busmallCatalog);

  for (let i = 0; i < busmallCatalog.length; i++) {
    if (busmallCatalog[i].name === imageClick) {
      busmallCatalog[i].votes++;
    }
  }

  renderImages();
  //if max attempts reached render chart
  if (votesMade === maxVotes) {
    image1.removeEventListener('click', imageClickHandler);
    image2.removeEventListener('click', imageClickHandler);
    image3.removeEventListener('click', imageClickHandler);
    handleMaxAttempts();
  }
}

function putResultsinLocalStorage(views, votes, names) {
  //stringify views votes names
  const stuffAsObject = {
    views: views,
    votes: votes,
    names: names,
  };
  const stringifiedStuff = JSON.stringify(stuffAsObject);
  localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedStuff);
}

function getResultsFromLocalStorage() {
  // check local storage for the results
  let results = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (results === null) {
    return false;
  }
  //get results back to js object
  const parsedResults = JSON.parse(results);
  return parsedResults;
}

function renderChart(views, votes, names) {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [
        {
          label: 'Views',
          data: views,
          backgroundColor: ['rgba(0, 0, 0, 0.5)'],
          borderColor: ['rgba(75, 192, 192, 0.5)'],
          borderWidth: 5,
        },
        {
          label: 'Votes',
          data: votes,
          backgroundColor: ['rgba(0, 0, 0, 0.25)'],
          borderColor: ['rgba(75, 192, 192, 0.5)'],
          borderWidth: 5,
        },
      ],
    },

    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// start of main logic

renderImages(); // initial render of images

const resultsFromLocalStorage = getResultsFromLocalStorage();
// if results from local storage, render chart with them
if (resultsFromLocalStorage) {
  const views = resultsFromLocalStorage.views;
  const votes = resultsFromLocalStorage.votes;
  const names = resultsFromLocalStorage.names;
  renderChart(views, votes, names);
} else {
  // if no results from local storage,
  // attach image click handlers, enabling the quiz
  image1.addEventListener('click', imageClickHandler);
  image2.addEventListener('click', imageClickHandler);
  image3.addEventListener('click', imageClickHandler);
}
