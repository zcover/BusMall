'use strict'

//create the constructor that will be used to generate pictures
//connect to DOM
//generate the photos into the 'product-container' id
//populate empty img divs on index
//randomize which 3 photos appear
//make sure that the 3 photos are unique per display
//create tracking for votes
//create tracking for "times seen"
//render page

//global Variables
var productOneEl = document.getElementById('product-one');
var productTwoEl = document.getElementById('product-two');
var productThreeEl = document.getElementById('product-three');
var productContainerEl = document.getElementById('product-container');
var allProducts = [];
var recentRandomNumbers = [];
var questionLimit = 0

//Constructor
function Product(name){
    this.name = name;
    this.filepath = `img/${name}`;
    this.votes=0;
    this.views=0;
    allProducts.push(this)
};
//all of the images by name
new Product('bag.jpg');
new Product('banana.jpg');
new Product('bathroom.jpg');
new Product('boots.jpg');
new Product('breakfast.jpg');
new Product('bubblegum.jpg');
new Product('chair.jpg');
new Product('cthulhu.jpg');
new Product('dog-duck.jpg');
new Product('dragon.jpg');
new Product('pen.jpg');
new Product('pet-sweep.jpg');
new Product('scissors.jpg');
new Product('shark.jpg');
new Product('sweep.png');
new Product('tauntaun.jpg');
new Product('unicorn.jpg');
new Product('usb.gif');
new Product('water-can.jpg');
new Product('wine-glass.jpg');
//render function
function render(){
    var randomIndex = getUniqueIndex();
    allProducts[randomIndex].views++;
    productOneEl.src = allProducts[randomIndex].filepath;
    productOneEl.alt = allProducts[randomIndex].name;
    productOneEl.title = allProducts[randomIndex].name;

    var randomIndex = getUniqueIndex();
    allProducts[randomIndex].views++;
    productTwoEl.src = allProducts[randomIndex].filepath;
    productTwoEl.alt = allProducts[randomIndex].name;
    productTwoEl.title = allProducts[randomIndex].name;

    var randomIndex = getUniqueIndex();
    allProducts[randomIndex].views++;
    productThreeEl.src = allProducts[randomIndex].filepath;
    productThreeEl.alt = allProducts[randomIndex].filepath;
    productThreeEl.title = allProducts[randomIndex].filepath;
    
    questionLimit++;
    console.log(questionLimit,' is the question limit counter');
    console.log(questionLimit, ' images voted on, ', 25 - questionLimit, ' images left.');
  };
//helper function
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};
function getUniqueIndex(){
    var randomIndex = randomNumber(0, (allProducts.length - 1));
    while(recentRandomNumbers.includes(randomIndex)){
      randomIndex = randomNumber(0, allProducts.length - 1);
    }
    if(recentRandomNumbers.length > 3){
      recentRandomNumbers.shift();
    }
    recentRandomNumbers.push(randomIndex);
    return randomIndex;
}
function handleClick(){
  if (questionLimit < 25) {
    var chosenImg = event.target.title;
    
    for(var i = 0; i < allProducts.length; i++){
      if(allProducts[i].name === chosenImg){
        allProducts[i].votes++;
      }
    }
    render();
  }
};
productContainerEl.addEventListener('click', handleClick);
render();