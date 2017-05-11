// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
$.ajax({
  method: "GET",

  url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',

  dataType: 'json',

  success: onSuccess
});

function onSuccess(data){
  for (var i = 0; i < data.features.length; i++) {
    $('#info').append(`<p>${data.features[i].properties.title}</p>`);
  }
};

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2682, lng: -97.74295},
    zoom: 8
  });
  $('#map').append(map);
}
initMap();


//end of document ready
});
