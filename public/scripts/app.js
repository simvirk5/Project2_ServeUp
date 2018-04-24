//put Map markers on google map API
	// var googleMapApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAY9bd197w-iJYqHbIF0A42Q4KT9aPbGyc&callback=initMap"

// var foodBank = [
// 	{
// 		name: 'Pike Market Food Bank',
// 		coordinateX: '122.3419° W',
// 		coordinateY: '47.6089° N'
// 	}
// ];

// $(document).ready(function(){
//   // Create and Initialize Map
//   const map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 8,
//     center: [47.751076, -120.740135];
//   });
//   // Add food bank markers to map
//   let markers = [];
//   foodBank.forEach(function(data){
//     let title = data.name;
//     let position = {
//       lat: data.coordinateX,
//       lng: data.coordinateY,
//     };
//     var pin = new google.maps.Marker({ position, map, title  });
//     markers.push(pin)
//   });
// });
var map;
function initMap(){
  // Map options
  var options = {
    zoom:7,
    center:{lat: 47.751076, lng: -120.740135}
  }
  // New map
  var map = new google.maps.Map(document.getElementById('map'),options);
  // Array of markers
  var markers = [
    {
      coords:{lat:47.6089,lng:-122.3419},
      content:'<h1>Pike Market Food Bank</h1>'
    },{
      coords:{lat:47.6086,lng:-123.34},
      content:'<h1>Pike Market Food Bank</h1>'
    }
  ];
  for(var i=0; i<markers.length;i++){
	var marker = new google.maps.Marker({
      position: markers[i].coords,
      map: map
    });
  }
}
// // Add Marker Function
// function addMarker(data){
// 	var marker = new google.maps.Marker({
// 	  position:data.coords,
// 	  map:map
// 	});
// Check content
// if(data.content){
//   var infoWindow = new google.maps.InfoWindow({
//     content:data.content
//   });

//   marker.addListener('click', function(){
//     infoWindow.open(map, marker);
//   });
// }

// var locations = [
//       ['Bondi Beach', -33.890542, 151.274856, 4],
//       ['Coogee Beach', -33.923036, 151.259052, 5],
//       ['Cronulla Beach', -34.028249, 151.157507, 3],
//       ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//       ['Maroubra Beach', -33.950198, 151.259302, 1]
//     ];

//     // var map = new google.maps.Map(document.getElementById('map'), {
//     //   zoom: 10,
//     //   center: new google.maps.LatLng(-33.92, 151.25),
//     //   mapTypeId: google.maps.MapTypeId.ROADMAP
//     // });

//     // var infowindow = new google.maps.InfoWindow();

//     var marker, i;

//     for (i = 0; i < locations.length; i++) { 
//       marker = new google.maps.Marker({
//         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//         map: map
//       });

//       google.maps.event.addListener(marker, 'click', (function(marker, i) {
//         return function() {
//           infowindow.setContent(locations[i][0]);
//           infowindow.open(map, marker);
//         }
//       })(marker, i));
//     }


