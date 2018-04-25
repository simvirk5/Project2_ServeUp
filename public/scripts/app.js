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

 function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 47.751076, lng: -120.740135},
          zoom: 7,
          // mapTypeId: 'roadmap'
        });

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
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
}

///////////////////////////////////////////////////////
var $postList;
var allPosts = [];

$(document).ready(function(){

  $postList = $('#foodDiv');
  $.ajax({
    method: 'GET',
    url: '/api/posts',
    success: handleSuccess,
    error: handleError
  });

  $('#newBookForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/books',
      data: $(this).serialize(),
      success: newBookSuccess,
      error: newBookError
    });
  });

  $postList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/books/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/books/'+$(this).attr('data-id'),
      success: deleteBookSuccess,
      error: deleteBookError
    });
  });

});

function getBookHtml(book) {
  return `<hr>
          <p>
            <b>${book.title}</b>
            by ${book.author}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${book._id}>Delete</button>
          </p>`;
}

function getAllBooksHtml(books) {
  return books.map(getBookHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $postList.empty();

  // pass `allBooks` into the template function
  var booksHtml = getAllBooksHtml(allBooks);

  // append html to the view
  $postList.append(booksHtml);
};

function handleSuccess(json) {
  allBooks = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#bookTarget').text('Failed to load books, is the server working?');
}

function newBookSuccess(json) {
  $('#newBookForm input').val('');
  allBooks.push(json);
  render();
}

function newBookError() {
  console.log('newbook error!');
}

function deleteBookSuccess(json) {
  var book = json;
  console.log(json);
  var bookId = book._id;
  console.log('delete book', bookId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allBooks.length; index++) {
    if(allBooks[index]._id === bookId) {
      allBooks.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteBookError() {
  console.log('deletebook error!');
}


