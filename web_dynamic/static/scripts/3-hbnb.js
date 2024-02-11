$(document).ready(function () {
  const selectedAmenities = [];

  // Function to update the list of selected amenities
  function updateAmenities() {
    $('#amenities h4').text(selectedAmenities.join(', '));
  }

  // Event listener for checkbox changes
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities.push(amenityId);
    } else {
      const index = selectedAmenities.indexOf(amenityId);
      if (index !== -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    // Update the list of selected amenities
    updateAmenities();
  });

  // Function to check API status
  function checkApiStatus() {
    $.get("http://0.0.0.0:5001/api/v1/status", function(data, status) {
      if (data.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    });
  }

  // Check API status initially
  checkApiStatus();

  // Check API status every 5 seconds
  setInterval(checkApiStatus, 5000);

  // Function to load places from the backend
  function loadPlaces() {
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: function(data) {
        displayPlaces(data);
      }
    });
  }

  // Function to display places in the frontend
  function displayPlaces(places) {
    const sectionPlaces = $("#places");
    sectionPlaces.empty(); // Clear previous places

    for (const place of places) {
      const article = $("<article></article>");
      const name = $("<div class='title'></div>").text(place.name);
      const price = $("<div class='price_by_night'></div>").text("$" + place.price_by_night);
      const info = $("<div class='information'></div>").append(name, price);
      const desc = $("<div class='description'></div>").text(place.description);
      const guest = $("<div class='max_guest'></div>").text(place.max_guest + " Guest(s)");
      const rooms = $("<div class='number_rooms'></div>").text(place.number_rooms + " Bedroom(s)");
      const baths = $("<div class='number_bathrooms'></div>").text(place.number_bathrooms + " Bathroom(s)");
      const user = $("<div class='user'></div>").text("Owner: " + place.user_id);
      const features = $("<div class='amenities'></div>").text("Amenities: " + place.amenities.map(a => a.name).join(", "));

      article.append(info, desc, guest, rooms, baths, user, features);
      sectionPlaces.append(article);
    }
  }

  // Load places initially
  loadPlaces();
});
