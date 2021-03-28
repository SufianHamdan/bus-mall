'use strict';


const imageNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];


let leftInd;
let middleInd;
let rightInd;

let roundsOfVoting = 5;
let counter = 0;


function Product (name)
{
  this.name = name;
  this.path = `./images/${name}`;
  this.votes = 0;
  this.views = 0;
  Product.allProducts.push(this);
}
Product.allProducts = [];


for(let i = 0; i < imageNames.length; i++)
{
  new Product(imageNames[i]);
}

// console.log(Product.allProducts);




const leftImage = document.getElementById('left-image');
const middleImage = document.getElementById('middle-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('images-section');

displayImagesForVotes();


function displayImagesForVotes()
{
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
}


imagesSection.addEventListener('click', userInteraction);
function userInteraction(event)
{
  if(event.target.id !== 'images-section')
  {
    if(event.target.id === rightImage.id)
    {
      Product.allProducts[rightInd].votes++;
      displayImagesForVotes();
      counter++;
    }
    else if(event.target.id === middleImage.id)
    {
      Product.allProducts[middleInd].votes++;
      displayImagesForVotes();
      counter++;
    }
    else
    {
      Product.allProducts[rightInd].votes++;
      displayImagesForVotes();
      counter++;
    }
  }
  // console.table(Product.allProducts);
  if ( counter >= roundsOfVoting)
  {
    imagesSection.removeEventListener('click', userInteraction);

    const btn = document.createElement('button');
    imagesSection.appendChild(btn);
    btn.textContent = 'View Results';
    btn.addEventListener('click', votingResult);
  }


}

function votingResult()
{
  const listParent = document.createElement('ul');
  imagesSection.appendChild(listParent);

  for(let i = 0; i < Product.allProducts.length; i++)
  {
    const listItem = document.createElement('li');
    listParent.appendChild(listItem);
    let name = removeImageExt((String)(Product.allProducts[i].name));
    listItem.textContent = name +' had '+Product.allProducts[i].votes + ' votes, and was seen '+Product.allProducts[i].views+' times.';
  }
}

function removeImageExt(name){
  return name.substring(0, name.indexOf('.'));
}

function getUniqueNumb()
{
  let numbers = [];

  let min, max, r, n, p;

  min = 0;
  max = imageNames.length - 1;
  r = 3;

  for (let i = 0; i < r; i++) {
    do {
      n = Math.floor(Math.random() * (max - min + 1)) + min;
      p = numbers.includes(n);
      if(!p){
        numbers.push(Number(n));
      }
    }
    while(p);
  }
  for(let i = 0; i < numbers.length; i++)
  {
    leftInd = numbers.pop();
    middleInd = numbers.pop();
    rightInd = numbers.pop();
  }
}

