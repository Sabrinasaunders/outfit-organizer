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
  });
};

const errorCallback = (error) => {
  console.log('access to location denied', error);
};

// gets current location of client and calls the weather API if client allows access
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// create an array for shirts, jackets, pants, and shoes
var shirtsImages = [];
var jacketsImages = [];
var pantsImages = [];
var shoesImages = [];
var currentShirt=0;
var currentJacket=0;
var currentPants=0;
var currentShoes=0;

// TODO: get user input for an image link and copy it into the array

var linkButton = document.querySelector('#linkBtn');

function addImage() {
  var imageUrl = document.querySelector('#url-input');
  console.log('clicked');
  if(imageUrl == null) {
    return;
  }
  // use a radio to determine which category the link is for
  // push the link into the correct array
  var linkCategory = document.querySelector('input[name="answer"]:checked').value;
  console.log('linkCategory ' ,linkCategory)
  switch(linkCategory) {
    case 'shirts':
      console.log('shirts');
      shirtsImages.push(imageUrl);
      return;
    case 'jackets':
      console.log('jackets');
      jacketsImages.push(imageUrl);
      return;
    case 'pants':
      console.log('pants');
      pantsImages.push(imageUrl);
      return;
    case 'shoes':
      console.log('shoes');
      shoesImages.push(imageUrl);
      return;    
  }
}

// TODO: create event handler to take input for certain things and push it into the proper array

linkButton.addEventListener('click', addImage);