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
var ulEl = document.getElementById('results');
var allProducts = [];
var recentRandomNumbers = [];
var questionLimit = 0;
var globalNameBank = [];
var globalVotesBank =[];

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
    //while loop checks to make sure that the randomly generated number is not used twice.
    while(recentRandomNumbers.includes(randomIndex)){
      randomIndex = randomNumber(0, allProducts.length - 1);
    }
    //compares the current value to 3 others. This clears the while loop's array by 3 places.
    if(recentRandomNumbers.length > 3){
      //shift takes the number off of the beginning of the array- which is the number used longest ago.
      recentRandomNumbers.shift();
    }
    //
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
  else{
    productContainerEl.removeEventListener('click', handleClick);
    // generateList();
    fillArrays();
  };
}

productContainerEl.addEventListener('click', handleClick);
render();

Product.prototype.generateResults = function() {
  this.results=`${this.votes} votes for ${this.name}`;
  var liEl = document.createElement('li');
  liEl.textContent = this.results;
  ulEl.appendChild(liEl)
  
};

function generateList(){
  for(var i=0; i < allProducts.length; i++){
    allProducts[i].generateResults();
  }
};

function fillArrays(){
  for( var i = 0; i <allProducts.length; i++){
    globalNameBank.push(allProducts[i].name);
    globalVotesBank.push(allProducts[i].votes);
  }
  generatechart();
};






//Goal
//function that fills up the global votes, and global names






function generatechart(){
  var ctx = document.getElementById('my-canvas').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: globalNameBank,
        datasets: [{
            label: '# of Votes',
            data: globalVotesBank,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 20
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
};