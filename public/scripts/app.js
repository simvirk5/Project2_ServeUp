//google maps API function
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 47.751076, lng: -120.740135},
    	zoom: 7,
      mapTypeId: 'roadmap'
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
		    map.setZoom(10);
			map.setCenter(marker.getPosition());
		});
		//click event on button id(Add to Favorites btn)
		google.maps.event.addListener(infowindow, 'domready', function() {
			$('.my-food-bank').on('click', function(e) {
				e.preventDefault();
				//'this' grabs button and moves to previous element(in this case it's the <p> and its value)
				var locationClicked = $(this).prev().text()
				//replaces the disables with the new input value
				$('#foodBankLoc').val(locationClicked)
			})
		})
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
		let foodBankLoc = $('#foodBankLoc').val();
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
			postItems: postItems,
			foodBankLoc: foodBankLoc
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
		let foodBankLoc = $('#foodBankLoc').val();
		$('#update-food-posts input[type=checkbox]').each(function() {
			console.log(this.value);
			if(this.checked) {
				foodItems.push(this.value)
			}
		})
		console.log(foodItems)
		console.log(postItems)
		console.log(foodBankLoc)
		let myData = {
			foodItems: foodItems,
			postItems: postItems,
			foodBankLoc: foodBankLoc

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

	$('.deleteButton').on('click', function(e) {
		e.preventDefault();
        $.ajax({
            method: 'DELETE',
            url: $(this).attr('href'),
        }).then(()=>{
        	window.location.reload()          
        });
     });

    $(".button-collapse").sideNav();

});







