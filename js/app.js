'use strict';
let test = document.querySelector('section #images');
function Product(name, img, shown) {
  this.name = name;
  this.img = img;
  this.shown = shown;
  busmallCatalog.push(this);
}
let newarray = [];
let busmallCatalog = [];
new Product('bag', './img/assets/bag.jpg', 0);
new Product('banana', './img/assets/banana.jpg', 0);
new Product('bathroom', './img/assets/bathroom.jpg', 0);
new Product('boots', './img/assets/boots.jpg', 0);
new Product('breakfast', './img/assets/breakfast.jpg', 0);
new Product('bubblegum', './img/assets/bubblegum.jpg', 0);
new Product('chair', './img/assets/chair.jpg', 0);
new Product('cthulhu', './img/assets/cthulhu.jpg', 0);
new Product('dogDuck', './img/assets/dog-duck.jpg', 0);
new Product('dragon', './img/assets/dragon.jpg', 0);
new Product('pen', './img/assets/pen.jpg', 0);
new Product('petsweep', './img/assets/pet-sweep.jpg', 0);
new Product('scissors', './img/assets/scissors.jpg', 0);
new Product('shark', './img/assets/shark.jpg', 0);
new Product('sweep', './img/assets/sweep.png', 0);
new Product('tauntaun', './img/assets/tauntaun.jpg', 0);
new Product('unicorn', './img/assets/unicorn.jpg', 0);
new Product('watercan', './img/assets/water-can.jpg', 0);
new Product('wine-glass', './img/assets/wine-glass.jpg', 0);

Product.prototype.render = function () {
  let bagImg = document.createElement('img');
  bagImg.src = this.img;
  test.appendChild(bagImg);
};
for (let i = 0; i < busmallCatalog.length; i++) {
  busmallCatalog[i].render();
}
function getRandom() {
  // busmallCatalog.random();

  newarray.push(busmallCatalog.random());
}
getRandom();
