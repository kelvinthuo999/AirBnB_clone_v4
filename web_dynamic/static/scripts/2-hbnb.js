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
});
