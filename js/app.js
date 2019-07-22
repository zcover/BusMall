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
var productOne = document.getElementById('product-one');
var productTwo = document.getElementById('product-two');
var productThree = document.getElementById('product-three');

var allProducts = [];



//Constructor
function Product(name){
    this.name = name;
    this.filepath = `img/${name}.jpg`;
    this.votes=0;
    this.views=0;

    allProducts.push(this)
};

//all of the images by name
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');