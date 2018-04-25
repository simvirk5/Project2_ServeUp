console.log("Sanity Check: JS is working!");
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
		var marker = new google.maps.Marker({
	      position: foodBank[i].coords,
	      map: map
	    });
	  	addContent(marker, foodBank[i].name);
	}
	//function outside of loop
	function addContent(marker, data) {
	  var infowindow = new google.maps.InfoWindow({
	    content: data
	  });
	//all event listeners
	  marker.addListener('click', function() {
	    infowindow.open(marker.get('map'), marker);
	    map.setZoom(8);
		map.setCenter(marker.getPosition());
	  });
	}
}





