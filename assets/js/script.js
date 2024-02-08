// Colormind API
var url = "http://colormind.io/api/";
var data = {
	model : "default",
	input : ["N","N","N","N","N"]
}

function changeColor() {
  var http = new XMLHttpRequest();
  var palette = {};
  var paletteEl1 = document.getElementById('swatch1');
  var paletteEl2 = document.getElementById('swatch2');
  var paletteEl3 = document.getElementById('swatch3');
  var paletteEl4 = document.getElementById('swatch4');

  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      palette = JSON.parse(http.responseText).result;
      console.log(palette);
      paletteEl1.style.backgroundColor = 'rgb('+palette['0'][0]+','+palette['0'][1]+','+palette['0'][2]+')';
      paletteEl2.style.backgroundColor = 'rgb('+palette['1'][0]+','+palette['1'][1]+','+palette['1'][2]+')';
      paletteEl3.style.backgroundColor = 'rgb('+palette['2'][0]+','+palette['2'][1]+','+palette['2'][2]+')';
      paletteEl4.style.backgroundColor = 'rgb('+palette['3'][0]+','+palette['3'][1]+','+palette['3'][2]+')';
    }
  }

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
  console.log(http) 
}

// initial call
changeColor();

// event handler for random
var randButton = document.getElementById('palette-random');
randButton.addEventListener('click', changeColor);


// Weather API
var locationName = document.querySelector('.weather-location');
var locationTemp = document.querySelector('.weather-temperature');
var locationTempDescription = document.querySelector('.weather-description');
var locationIcon = document.querySelector('.weather-icon');

var id;
var weatherAPIKey = '88545649ed086e2c55e61d30884046e5';

const successCallback = (position) => {
  fetch('https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + position.coords.latitude +'&lon=' + position.coords.longitude +'&appid='+weatherAPIKey)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    locationName.textContent = data.name;
    console.log('temperature at current location: ', data.main.temp);
    locationTemp.textContent = Math.round(data.main.temp) + '';
    console.log('weather conditions: ', data.weather[0].description);
    locationTempDescription.textContent = data.weather[0].description;
    locationIcon.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
  });
};

const errorCallback = (error) => {
  console.log('access to location denied', error);
};

// gets current location of client and calls the weather API if client allows access
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// create an array for shirts, Tops, pants, and shoes
var hatImages = ['https://i.imgur.com/GNNYy5A.png','https://i.imgur.com/NvbevUb.png','https://i.imgur.com/nDrEUOk.png'];
var topImages = ['https://i.imgur.com/tZup5a7.png','https://i.imgur.com/YS53X6Z.png', 'https://i.imgur.com/Qkzgvnd.png'];
var bottomImages = ['https://i.imgur.com/KaLeqm8.png','https://i.imgur.com/OVBwjGu.png','https://i.imgur.com/KobQNY3.png'];
var shoeImages = ['https://i.imgur.com/nRywus8.png','https://i.imgur.com/LmivEAV.png','https://i.imgur.com/anJcbFN.png'];
var hatTitles = ['tan hat', 'black hat', 'white hat'];
var topTitles = ['leather jacket', 'yellow hoodie', 'tan jacket'];
var bottomTitles = ['blue pants', 'jeans', 'beige pants'];
var shoeTitles = ['knit sneakers', 'yellow docs', 'white sneakers'];
var hatCurrent=0;
var topCurrent=0;
var bottomCurrent=0;
var shoeCurrent=0;

var itemGallery = document.querySelector('#itemGallery');
var linkButton = document.querySelector('#linkBtn');

function populateImages() {
  var cardEl1;
  var cardEl2;
  var cardEl3;
  // populate hats
  cardEl1 = document.getElementById('hat1');
  cardEl2 = document.getElementById('hat2');
  cardEl3 = document.getElementById('hat3');
  if(hatImages.length > 2) { // if the list is 3 items or larger
    if(hatCurrent == 0) {
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = hatTitles[hatTitles.length-1];
      cardEl1.children[1].children[0].src = hatImages[hatImages.length-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = hatTitles[hatCurrent+1];
      cardEl3.children[1].children[0].src = hatImages[hatCurrent+1];
    } else if(hatCurrent == hatImages.length-1) { // if the current item is the end of the list
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = hatTitles[hatCurrent-1];
      cardEl1.children[1].children[0].src = hatImages[hatCurrent-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = hatTitles[0];
      cardEl3.children[1].children[0].src = hatImages[0];
    } else { // if there's no edge cases to handle
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = hatTitles[hatCurrent-1];
      cardEl1.children[1].children[0].src = hatImages[hatCurrent-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = hatTitles[hatCurrent+1];
      cardEl3.children[1].children[0].src = hatImages[hatCurrent+1];
    }
  } else if(hatImages.length == 2) { // if the list is 2 items
    if(hatCurrent == 1) {
      cardEl3.classList.add('is-invisible');
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = hatTitles[hatCurrent-1];
      cardEl1.children[1].children[0].src = hatImages[hatCurrent-1];
    } else {
      cardEl1.classList.add('is-invisible');
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = hatTitles[hatCurrent+1];
      cardEl3.children[1].children[0].src = hatImages[hatCurrent+1];
    }
  } else { // if the list only has the starting item
    cardEl1.classList.add('is-invisible');
    cardEl3.classList.add('is-invisible');
  }
  cardEl2.children[0].textContent = hatTitles[hatCurrent];
  cardEl2.children[1].children[0].src = hatImages[hatCurrent];
    
  // populate tops
  cardEl1 = document.getElementById('top1');
  cardEl2 = document.getElementById('top2');
  cardEl3 = document.getElementById('top3');
  if(topImages.length > 2) { // if the list is 3 items or larger
    if(topCurrent == 0) {
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = topTitles[topTitles.length-1];
      cardEl1.children[1].children[0].src = topImages[topImages.length-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = topTitles[topCurrent+1];
      cardEl3.children[1].children[0].src = topImages[topCurrent+1];
    } else if(topCurrent == topImages.length-1) { // if the current item is the end of the list
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = topTitles[topCurrent-1];
      cardEl1.children[1].children[0].src = topImages[topCurrent-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = topTitles[0];
      cardEl3.children[1].children[0].src = topImages[0];
    } else { // if there's no edge cases to handle
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = topTitles[topCurrent-1];
      cardEl1.children[1].children[0].src = topImages[topCurrent-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = topTitles[topCurrent+1];
      cardEl3.children[1].children[0].src = topImages[topCurrent+1];
    }
  } else if(topImages.length == 2) { // if the list is 2 items
    if(topCurrent == 1) {
      cardEl3.classList.add('is-invisible');
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = topTitles[topCurrent-1];
      cardEl1.children[1].children[0].src = topImages[topCurrent-1];
    } else {
      cardEl1.classList.add('is-invisible');
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = topTitles[topCurrent+1];
      cardEl3.children[1].children[0].src = topImages[topCurrent+1];
    }
  } else { // if the list only has the starting item
    cardEl1.classList.add('is-invisible');
    cardEl3.classList.add('is-invisible');
  }
  cardEl2.children[0].textContent = topTitles[topCurrent];
  cardEl2.children[1].children[0].src = topImages[topCurrent];

  // populate bottoms
  cardEl1 = document.getElementById('bottom1');
  cardEl2 = document.getElementById('bottom2');
  cardEl3 = document.getElementById('bottom3');
  if(bottomImages.length > 2) { // if the list is 3 items or larger
    if(bottomCurrent == 0) {
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = bottomTitles[bottomTitles.length-1];
      cardEl1.children[1].children[0].src = bottomImages[bottomImages.length-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = bottomTitles[bottomCurrent+1];
      cardEl3.children[1].children[0].src = bottomImages[bottomCurrent+1];
    } else if(bottomCurrent == bottomImages.length-1) { // if the current item is the end of the list
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = bottomTitles[bottomCurrent-1];
      cardEl1.children[1].children[0].src = bottomImages[bottomCurrent-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = bottomTitles[0];
      cardEl3.children[1].children[0].src = bottomImages[0];
    } else { // if there's no edge cases to handle
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = bottomTitles[bottomCurrent-1];
      cardEl1.children[1].children[0].src = bottomImages[bottomCurrent-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = bottomTitles[bottomCurrent+1];
      cardEl3.children[1].children[0].src = bottomImages[bottomCurrent+1];
    }
  } else if(bottomImages.length == 2) { // if the list is 2 items
    if(bottomCurrent == 1) {
      cardEl3.classList.add('is-invisible');
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = bottomTitles[bottomCurrent-1];
      cardEl1.children[1].children[0].src = bottomImages[bottomCurrent-1];
    } else {
      cardEl1.classList.add('is-invisible');
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = bottomTitles[bottomCurrent+1];
      cardEl3.children[1].children[0].src = bottomImages[bottomCurrent+1];
    }
  } else { // if the list only has the starting item
    cardEl1.classList.add('is-invisible');
    cardEl3.classList.add('is-invisible');
  }
  cardEl2.children[0].textContent = bottomTitles[bottomCurrent];
  cardEl2.children[1].children[0].src = bottomImages[bottomCurrent];

  // populate shoes
  cardEl1 = document.getElementById('shoe1');
  cardEl2 = document.getElementById('shoe2');
  cardEl3 = document.getElementById('shoe3');
  if(shoeImages.length > 2) { // if the list is 3 items or larger
    if(shoeCurrent == 0) {
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = shoeTitles[shoeTitles.length-1];
      cardEl1.children[1].children[0].src = shoeImages[shoeImages.length-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = shoeTitles[shoeCurrent+1];
      cardEl3.children[1].children[0].src = shoeImages[shoeCurrent+1];
    } else if(shoeCurrent == shoeImages.length-1) { // if the current item is the end of the list
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = shoeTitles[shoeCurrent-1];
      cardEl1.children[1].children[0].src = shoeImages[shoeCurrent-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = shoeTitles[0];
      cardEl3.children[1].children[0].src = shoeImages[0];
    } else { // if there's no edge cases to handle
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = shoeTitles[shoeCurrent-1];
      cardEl1.children[1].children[0].src = shoeImages[shoeCurrent-1];
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = shoeTitles[shoeCurrent+1];
      cardEl3.children[1].children[0].src = shoeImages[shoeCurrent+1];
    }
  } else if(shoeImages.length == 2) { // if the list is 2 items
    if(shoeCurrent == 1) {
      cardEl3.classList.add('is-invisible');
      cardEl1.classList.remove('is-invisible');
      cardEl1.children[0].textContent = shoeTitles[shoeCurrent-1];
      cardEl1.children[1].children[0].src = shoeImages[shoeCurrent-1];
    } else {
      cardEl1.classList.add('is-invisible');
      cardEl3.classList.remove('is-invisible');
      cardEl3.children[0].textContent = shoeTitles[shoeCurrent+1];
      cardEl3.children[1].children[0].src = shoeImages[shoeCurrent+1];
    }
  } else { // if the list only has the starting item
    cardEl1.classList.add('is-invisible');
    cardEl3.classList.add('is-invisible');
  }
  cardEl2.children[0].textContent = shoeTitles[shoeCurrent];
  cardEl2.children[1].children[0].src = shoeImages[shoeCurrent];
}

function addImage() {
  var imageUrl = document.querySelector('#url-input').value;
  var imageTitle = document.querySelector('#title-input').value;
  if(imageUrl.trim() == '') {
    return;
  }
  // pushes the url into the correct array and clears the input
  if(document.getElementById('hats').checked) {
    hatImages.push(imageUrl.trim());
    hatTitles.push(imageTitle);
    document.getElementById('url-input').value = '';
    hatCurrent++;
    console.log('hats', hatImages);
  } else if(document.getElementById('tops').checked) {
    topImages.push(imageUrl.trim());
    topTitles.push(imageTitle);
    document.getElementById('url-input').value = '';
    topCurrent++;
    console.log('tops', topImages);
  } else if(document.getElementById('bottoms').checked) {
    bottomImages.push(imageUrl.trim());
    bottomTitles.push(imageTitle);
    document.getElementById('url-input').value = '';
    bottomCurrent++;
    console.log('bottoms', bottomImages);
  } else if(document.getElementById('shoes').checked) {
    shoeImages.push(imageUrl.trim());
    shoesTitles.push(imageTitle);
    document.getElementById('url-input').value = '';
    shoeCurrent++;
    console.log('shoes', shoeImages);
  }
  populateImages();
}

itemGallery.addEventListener('click', function(event) {
  var element = event.target;
  if(element.matches('.button')) {
    console.log(element.id);
    switch(element.id) {
      case 'hatRight':
        if(hatCurrent == 0) {
          hatCurrent = hatImages.length-1;
        } else {
          hatCurrent--;
        }
        break;
      case 'hatLeft':
        if(hatCurrent == hatImages.length-1) {
          hatCurrent = 0;
        } else {
          hatCurrent++;
        }
        break;
      case 'topRight':
        if(topCurrent == 0) {
          topCurrent = topImages.length-1;
        } else {
          topCurrent--;
        }
        break;
      case 'topLeft':
        if(topCurrent == topImages.length-1) {
          topCurrent = 0;
        } else {
          topCurrent++;
        }
        break;
      case 'botRight':
        if(bottomCurrent == 0) {
          bottomCurrent = bottomImages.length-1;
        } else {
          bottomCurrent--;
        }
        break;
      case 'botLeft':
        if(bottomCurrent == bottomImages.length-1) {
          bottomCurrent = 0;
        } else {
          bottomCurrent++;
        }
        break;
      case 'shoeRight':
        if(shoeCurrent == 0) {
          shoeCurrent = shoeImages.length-1;
        } else {
          shoeCurrent--;
        }
        break;
      case 'shoeLeft':
        if(shoeCurrent == shoeImages.length-1) {
          shoeCurrent = 0;
        } else {
          shoeCurrent++;
        }
        break;
    }
    populateImages();
  }
});

populateImages();
linkButton.addEventListener('click', addImage);

// Bulma Modal
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });
});