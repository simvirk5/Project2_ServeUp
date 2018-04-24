var map;
function initMap(){
  // Map options
	var center = {
	    zoom:7,
	    center:{lat: 47.751076, lng: -120.740135}
	}
  // New map
	var map = new google.maps.Map(document.getElementById('map'),center);

	for(var i=0; i<foodBank.length;i++){
		console.log(foodBank[i])
		var marker = new google.maps.Marker({
	      position: foodBank[i].coords,
	      map: map
	    });

	  	attachSecretMessage(marker, foodBank[i].content);


	}

	function attachSecretMessage(marker, secretMessage) {
	  var infowindow = new google.maps.InfoWindow({
	    content: secretMessage
	  });

	  marker.addListener('click', function() {
	    infowindow.open(marker.get('map'), marker);
	    map.setZoom(8);
		    map.setCenter(marker.getPosition());
	  });
	}
}





