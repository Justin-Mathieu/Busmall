'use strict';
// global variables
// number of attempts
let attempts = 25;
// clicks made
let clicks = 0;
// array all products
let busmallCatalog = [];
// dom connection
let images = document.getElementById('images');
let dispalyButton = document.getElementById('results');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
// button
let button = document.getElementById('show-results');
let results = document.getElementById('display-results');
//section

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
function getRandomInt() {
  return Math.floor(Math.random() * busmallCatalog.length);
}
function render() {
  let newArray = [];
  while (newArray.length < 3) {
    let num = getRandomInt();
    while (newArray.includes(num)) {
      num = getRandomInt();
    }
    newArray.push(num);
  }
  // console.log(newArray);
  image1.src = busmallCatalog[newArray[0]].img;
  image1.alt = busmallCatalog[newArray[0]].name;
  busmallCatalog[newArray[0]].shown++;

  image2.src = busmallCatalog[newArray[1]].img;
  image2.alt = busmallCatalog[newArray[1]].name;
  busmallCatalog[newArray[1]].shown++;

  image3.src = busmallCatalog[newArray[2]].img;
  image3.alt = busmallCatalog[newArray[2]].name;
  busmallCatalog[newArray[2]].shown++;
}
//event handler
function imageHandler(event) {
  clicks++;
  let imageClick = event.target.alt;
  console.log(imageClick);

  for (let i = 0; i < busmallCatalog.length; i++) {
    if (busmallCatalog[i].name === imageClick) {
      busmallCatalog[i].votes++;
    }
  }
  render();
  if (clicks === attempts) {
    image1.removeEventListener('click', imageHandler);
    image2.removeEventListener('click', imageHandler);
    image3.removeEventListener('click', imageHandler);
  }
}
function resultsHandler(event) {
  if (clicks === attempts) {
    for (let i = 0; i < busmallCatalog.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${busmallCatalog[i].name} had ${busmallCatalog[i].votes} votes, and was seen ${busmallCatalog[i].shown} times.`;
      results.appendChild(li);
    }
  }
}
// console.log(busmallCatalog);
//executable code
render();

// event listener for clicks
image1.addEventListener('click', imageHandler);
image2.addEventListener('click', imageHandler);
image3.addEventListener('click', imageHandler);
console.log(busmallCatalog);
// event listener for results
button.addEventListener('click', resultsHandler);
console.log(results);
