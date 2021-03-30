'use strict';


const imageNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

const imageNamesForChart = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];


let leftInd;
let middleInd;
let rightInd;

let roundsOfVoting = 5;
let counter = 0;

let votesArr = [];
let viewsArr = [];
let numbers = [];
//let previousItrUsedImageIds = [];



const leftImage = document.getElementById('left-image');
const middleImage = document.getElementById('middle-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('images-section');

function Product(name) {
  this.name = name;
  this.path = `./images/${name}`;
  this.votes = 0;
  this.views = 0;
  Product.allProducts.push(this);
}
Product.allProducts = [];
let productsAlreadyInitialized = false;
getProducts();


if (!productsAlreadyInitialized){
  for (let i = 0; i < imageNames.length; i++) {
    new Product(imageNames[i]);
  }
}

function setProducts(){
  localStorage.getItem('AllProducts');
  let data = JSON.stringify(Product.allProducts);
  localStorage.setItem('AllProducts', data);
}


function getProducts(){
  let objString = localStorage.getItem('AllProducts');
  if (objString !== null){
    productsAlreadyInitialized = true;
    let normalObj = JSON.parse(objString);
    Product.allProducts = normalObj;
  }
}


displayImagesForVotes();


function displayImagesForVotes() {


  getUniqueNumb();

  leftImage.src = Product.allProducts[leftInd].path;
  leftImage.alt = Product.allProducts[leftInd].name;
  leftImage.title = Product.allProducts[leftInd].name;

  middleImage.src = Product.allProducts[middleInd].path;
  middleImage.alt = Product.allProducts[middleInd].name;
  middleImage.title = Product.allProducts[middleInd].name;

  rightImage.src = Product.allProducts[rightInd].path;
  rightImage.alt = Product.allProducts[rightInd].name;
  rightImage.title = Product.allProducts[rightInd].name;

  Product.allProducts[leftInd].views++;
  Product.allProducts[middleInd].views++;
  Product.allProducts[rightInd].views++;

  setProducts();

}


imagesSection.addEventListener('click', userInteraction);
function userInteraction(event) {
  if (event.target.id !== 'images-section') {
    if (event.target.id === rightImage.id) {

      Product.allProducts[rightInd].votes++;
    }
    else if (event.target.id === middleImage.id) {
      Product.allProducts[middleInd].votes++;
    }
    else {
      Product.allProducts[rightInd].votes++;
    }
    setProducts();
    displayImagesForVotes();
    counter++;
  }
  // console.table(Product.allProducts);
  if (counter >= roundsOfVoting) {
    imagesSection.removeEventListener('click', userInteraction);

    const btn = document.createElement('button');
    imagesSection.appendChild(btn);
    btn.textContent = 'View Results';
    btn.addEventListener('click', votingResult);
  }


}

function votingResult() {
  const listParent = document.createElement('ul');
  imagesSection.appendChild(listParent);

  for (let i = 0; i < Product.allProducts.length; i++) {
    const listItem = document.createElement('li');
    listParent.appendChild(listItem);
    let name = removeImageExt((String)(Product.allProducts[i].name));
    listItem.textContent = name + ' had ' + Product.allProducts[i].votes + ' votes, and was seen ' + Product.allProducts[i].views + ' times.';

    votesArr.push(Product.allProducts[i].votes);
    viewsArr.push(Product.allProducts[i].views);
  }
  chartDrow();
}

function removeImageExt(name) {
  return name.substring(0, name.indexOf('.'));
}

function getUniqueNumb() {
  let min, max, r, n, exist;

  min = 0;
  max = imageNames.length - 1;
  r = 3;

  for (let i = 0; i < r; i++) {
    do {
      n = Math.floor(Math.random() * (max - min + 1)) + min;
      exist = numbers.includes(n);
      if (!exist) {
        if (i === 0 ){
          leftInd = n;
        }else if (i === 1 ){
          middleInd = n;
        }else {
          rightInd = n;
        }
        numbers.push(n);
      }
    }
    while (exist);
  }

  numbers = [];

  numbers[0] = leftInd;
  numbers[1] = middleInd;
  numbers[2] = rightInd;

}




function chartDrow() {
  console.log(votesArr);
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: imageNamesForChart,
      datasets: [{
        label: 'Votes',
        backgroundColor: '#041412',
        borderColor: 'rgb(255, 99, 10)',
        data: votesArr
      },
      {
        label: 'Views',
        backgroundColor: '#066F71',
        borderColor: 'rgb(255, 99, 132)',
        data: viewsArr
      }]
    },

    // Configuration options go here
    options: {}
  });
}
