'use strict'
//////////////Global Variables////////////////////
var productOneEl = document.getElementById('product-one');
var productTwoEl = document.getElementById('product-two');
var productThreeEl = document.getElementById('product-three');
var productContainerEl = document.getElementById('product-container');
var ulEl = document.getElementById('results');
var allProducts = [];
var recentRandomNumbers = [];
var questionLimit = 0;
var globalNameBank = [];
var globalVotesBank = [];

//=============    Constructor      ==============
function Product(name) {
  this.name = name;
  this.filepath = `img/${name}`;
  this.votes = 0;
  this.views = 0;
  allProducts.push(this)
};


//////////// Instances ////////////////
function newProductInstance() {
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
};

//////////  Render Function   /////////////
function render(imgEl) {
  var randomIndex = getUniqueIndex();
  allProducts[randomIndex].views++;
  imgEl.src = allProducts[randomIndex].filepath;
  imgEl.alt = allProducts[randomIndex].name;
  imgEl.title = allProducts[randomIndex].name;
  // Question Counter
  console.log(questionLimit, "question limit counter")
};
//////////  helper function   ///////////////
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
};


function getUniqueIndex() {
  var randomIndex = randomNumber(0, (allProducts.length - 1));
  //while loop checks to make sure that the randomly generated number is not used twice.
  while (recentRandomNumbers.includes(randomIndex)) {
    randomIndex = randomNumber(0, allProducts.length - 1);
  }
  //compares the current value to 3 others. This clears the while loop's array by 3 places.
  if (recentRandomNumbers.length > 3) {
    //shift takes the number off of the beginning of the array- which is the number used longest ago.
    recentRandomNumbers.shift();
  };

  recentRandomNumbers.push(randomIndex);
  return randomIndex;
};

function handleClick() {
  console.log(`${questionLimit} question limit count`)
  if (questionLimit < 25) {
    var chosenImg = event.target.title;
    questionLimit++;
    saveToLocal();

    
    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].name === chosenImg) {
        allProducts[i].votes++;
      }
    }
    render(productOneEl);
  render(productTwoEl);
  render(productThreeEl)
  } else {
    productContainerEl.removeEventListener('click', handleClick);
    renderLocalData();
    fillArrays();
  };
}

function fillArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    globalNameBank.push(allProducts[i].name);
    globalVotesBank.push(allProducts[i].votes);
  }
  generatechart();
};

//////////////////////////////////

function generatechart() {
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
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(1, 1, 1, 0.5'
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

/// LOCAL STORAGE ///
function renderLocalData() {
  console.log(`i'm inside the render local function`);
  if (localStorage.length === 0) {
    console.log(`i'm here in render location if`);
    newProductInstance();
  } else {
    var storageList = localStorage.getItem('key');
    var parsedList = JSON.parse(storageList);
    allProducts = parsedList;
    console.log(`I am inside the renderlocaldata else statement`);
  }

  render(productOneEl);
  render(productTwoEl);
  render(productThreeEl)
}

function saveToLocal(){
  var stringBanana = JSON.stringify(allProducts);
  localStorage.setItem('key', stringBanana);
}
///////  EXECUTABLES  ////////////
productContainerEl.addEventListener('click', handleClick);
  renderLocalData();