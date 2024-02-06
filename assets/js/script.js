// Colormind API
var url = "http://colormind.io/api/";
var data = {
	model : "default",
	input : [[44,43,44],[90,83,82],"N","N","N"]
}
var http = new XMLHttpRequest();
var palette = {};

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		palette = JSON.parse(http.responseText).result;
    console.log(palette);
	}
}

http.open("POST", url, true);
http.send(JSON.stringify(data));
console.log(http)

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
var hatImages = ['https://placehold.co/600x500'];
var topImages = ['https://placehold.co/600x500'];
var bottomImages = ['https://placehold.co/600x500'];
var shoeImages = ['https://placehold.co/600x500'];
var hatTitles = ['placeholder image'];
var topTitles = ['placeholder image'];
var bottomTitles = ['placeholder image'];
var shoeTitles = ['placeholder image'];
var hatCurrent=0;
var topCurrent=0;
var bottomCurrent=0;
var shoeCurrent=0;

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

  // populate bottoms

  // populate shoes

}

function addImage() {
  var imageUrl = document.querySelector('#url-input').value;
  if(imageUrl.trim() == '') {
    return;
  }
  // pushes the url into the correct array and clears the input
  if(document.getElementById('hats').checked) {
    hatImages.push(imageUrl.trim());
    document.getElementById('url-input').value = '';
    hatCurrent++;
    console.log('hats', hatImages);
  } else if(document.getElementById('tops').checked) {
    topImages.push(imageUrl.trim());
    document.getElementById('url-input').value = '';
    topCurrent++;
    console.log('tops', topImages);
  } else if(document.getElementById('bottoms').checked) {
    bottomImages.push(imageUrl.trim());
    document.getElementById('url-input').value = '';
    bottomCurrent++;
    console.log('bottoms', bottomImages);
  } else if(document.getElementById('shoes').checked) {
    shoeImages.push(imageUrl.trim());
    document.getElementById('url-input').value = '';
    shoeCurrent++;
    console.log('shoes', shoeImages);
  }
  populateImages();
}

populateImages();
linkButton.addEventListener('click', addImage);