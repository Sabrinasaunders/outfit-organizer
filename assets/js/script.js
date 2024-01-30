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
    
	}
}

http.open("POST", url, true);
http.send(JSON.stringify(data));
console.log(http)
console.log(palette);

// Weather API
var id;
var weatherAPIKey = '88545649ed086e2c55e61d30884046e5';
const successCallback = (position) => {
  console.log(position);
  id = position;
};

const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + id['latitude'] +'&lon=' + id['longitude'] +'&appid='+weatherAPIKey)
.then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log(data);
});