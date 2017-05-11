// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;
var markers = [];
$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!

    initMap();


              $.ajax({
                method: "GET",
                url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
                dataType: 'json',
                success: onSuccess
              });
        function initMap() {
          var latLng = {lat: 30.2682, lng: -97.74295};
          map = new google.maps.Map(document.getElementById('map'), {
            center: latLng,
            zoom: 8
          });
          $('#map').append(map);
        }

$('#month').on('click', function (event){
  $('#quakes').empty();
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson',
    dataType: 'json',
    success: onSuccess
  });
});

$('#day').on('click', function (event){
  $('#quakes').empty();
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    dataType: 'json',
    success: onSuccess,
  });
});

function onSuccess(data){
    $('#map').empty();
    initMap();
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


      var title = data.features[i].properties.place;
      // var titleArray = title.split(' ').slice(3,title.length);
      var titleArray = title.split(' ');
      titleArray = titleArray.slice(3,titleArray.length);
      title = titleArray.join(" ");
      console.log(titleArray);

        var littleQuake = {
                    url: 'https://media.giphy.com/media/JQSlcR2Ivvr8I/giphy.gif',
                    scaledSize: new google.maps.Size(50, 50), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0,0) // size: new google.maps.Size(71, 71)
                        };
        var medQuake = {
                    url: 'https://media.giphy.com/media/mbG6891BV7QMo/giphy.gif',
                    scaledSize: new google.maps.Size(50, 50), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0,0)
          // size: new google.maps.Size(71, 71)
                        };
        var hugeQuake = {
                    url: 'https://media.giphy.com/media/YA6dmVW0gfIw8/giphy.gif', // url
                    scaledSize: new google.maps.Size(50, 50), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0,0)
                        };
    var magNumber = data.features[i].properties.mag;
    var className;
    var customMark;
          if (magNumber <= 4) {
            className = 'smallQuake';
            customMark = littleQuake;
          } else if (magNumber > 4 && magNumber <= 5) {
            className = 'mediumQuake';
            customMark = medQuake;
          } else {
            className = 'run';
            customMark = hugeQuake;
          }
          // $(customMark).addClass('marker');
    $('#quakes').append(`<p class=${className}>` + time + title + '</p>');
        var coords = data.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          optimized: false,
          animation: google.maps.Animation.DROP,
          icon: customMark
        });
        markers.push(marker);
      }
    }





//end of document ready
});
