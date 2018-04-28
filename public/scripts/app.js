//create map and search box
// var map;
// function initMap(){
//   // Map options
// 	var center = {
// 	    zoom:7,
// 	    center:{lat: 47.751076, lng: -120.740135}
// 	}
//   // New map
// 	var map = new google.maps.Map(document.getElementById('map'),center);

// 	for(var i=0; i<foodBank.length;i++){
// 		var marker = new google.maps.Marker({
// 	      position: foodBank[i].coords,
// 	      map: map
// 	    });
// 	  	addContent(marker, foodBank[i].name);
// 	}
// 	//function outside of loop
// 	function addContent(marker, data) {
// 	  var infowindow = new google.maps.InfoWindow({
// 	    content: data
// 	  });
// 	//all event listeners
// 	  marker.addListener('click', function() {
// 	    infowindow.open(marker.get('map'), marker);
// 	    map.setZoom(8);
// 		map.setCenter(marker.getPosition());
// 	  });
// 	}
// }

//google maps API function
 function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 47.751076, lng: -120.740135},
    	zoom: 7,
      // mapTypeId: 'roadmap'
    });
    //loop through each marker and call addContent function
    for(var i=0; i<foodBank.length;i++){
		var marker = new google.maps.Marker({
	    	position: foodBank[i].coords,
	    	map: map
	    });
  		addContent(marker, foodBank[i].name);
	}
	function addContent(marker, data) {
		var infowindow = new google.maps.InfoWindow({
	    content: data
		});
	//all event listeners
		marker.addListener('click', function() {
			infowindow.open(marker.get('map'), marker);
		    map.setZoom(2);
			map.setCenter(marker.getPosition());
		});
	}
	// Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
    	searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
    	var places = searchBox.getPlaces();
    		if (places.length == 0) {
        	return;
      	}
	 	 // For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			if (!place.geometry) {
		      console.log("Wrong entry. Try something different.");
		      return;
		    }
		    if (place.geometry.viewport) {
		      // Only geocodes have viewport.
		    	bounds.union(place.geometry.viewport);
		    } 
		    else {
		    	bounds.extend(place.geometry.location);
		    }
		});
	    	map.fitBounds(bounds);
    });
}
/////////click checkboxes
$('.form-check-input').on('click', function(e) {
	console.log('clicked');
	console.log(e.target)
});

$(document).ready(function() {
	
	$('#add-food-posts').on('submit', function(e) {
		e.preventDefault();
		let foodItems = [];
		let postItems = $('#add-food-posts input[type=text]').val();
		$('#add-food-posts input[type=checkbox]').each(function() {
			console.log(this.value);
			if(this.checked) {
				foodItems.push(this.value)
			}
		})
		console.log(foodItems)
		console.log(postItems)
		let myData = {
			foodItems: foodItems,
			postItems: postItems
		}
		//control how we send the data to the backend
		$.ajax({
			method: 'POST',
			url: '/post',
			data: myData
		}).done(function(data) {
			window.location.href="/profile"
		});
	});


	$('#update-food-posts').on('submit', function(e) {
		e.preventDefault();
		let foodItems = [];
		let postItems = $('#update-food-posts input[type=text]').val();
		$('#update-food-posts input[type=checkbox]').each(function() {
			console.log(this.value);
			if(this.checked) {
				foodItems.push(this.value)
			}
		})
		console.log(foodItems)
		console.log(postItems)
		let myData = {
			foodItems: foodItems,
			postItems: postItems
		}
		//control how we send the data to the backend
		$.ajax({
			method: 'PUT',
			url: $(this).attr('action'),
			data: myData
		}).done(function(data) {
			window.location.href="/profile"
		});
	});
    //     $.ajax({
    //         method: 'DELETE',
    //         url: '/records/'+$(this).attr('action'),
    //         success: deleteServiceSuccess,
    //         error: deleteServiceError
    //     }).then(()=>{
    //         // console.log(this);
    //         $(this).parent().remove();
    //     });
    
    // function deleteServiceSuccess() {
    //     console.log("deleted service successfully!", $(this).attr('data-id'));
    // }
    // function deleteServiceError() {
    //     console.log("delete Service Error");
    // }

	$('.parallax').parallax();
    $(".button-collapse").sideNav();

});

$('#checkbox1').is(':checked')
$('#checkbox1').prop('checked', true).change() 

$('#checkbox2').is(':checked')
$('#checkbox2').prop('checked', true).change() 





