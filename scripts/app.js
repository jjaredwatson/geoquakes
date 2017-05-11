// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  function initMap() {
    var latLng = {lat: 30.2682, lng: -97.74295};
    map = new google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: 8
    });
    $('#map').append(map);
  }


  initMap();

$.ajax({
  method: "GET",

  url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',

  dataType: 'json',

  success: onSuccess
});

function onSuccess(data){
    for (var i = 0; i < data.features.length; i++) {
      var now = new Date();
      var then = data.features[i].properties.time;
      var timeSince = Math.floor((now - then)/(60*60*1000));
      if (timeSince === 1) {
        var timeHolder = ' hour ago ';
      } else if (timeSince === 0){
        timeSince = 'Happening Now';
        timeHolder = ' ';
      } else {
        timeHolder = ' hours ago ';
      }
      var time = timeSince + timeHolder;
      var title = data.features[i].properties.title;

    var magNumber = data.features[i].properties.mag;
    var className;
          if (magNumber <= 4) {
            className = 'smallQuake';
          } else if (magNumber > 4 && magNumber <= 5) {
            className = 'mediumQuake';
          } else {
            className = 'run';
          }
    $('#info').append(`<p class=${className}>` + time + title + '</p>');

        var coords = data.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: './images/earthquake.png'
        });
      }
    }




//end of document ready
});
