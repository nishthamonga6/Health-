 // Function to get user's current location
 function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchPharmacies);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // Function to fetch nearby pharmacies using Google Places API
  function fetchPharmacies(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Replace 'YOUR_GOOGLE_API_KEY' with your actual Google Places API key
    const apiKey = 'YOUR_GOOGLE_API_KEY';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=pharmacy&key=${apiKey}`;

    // Make an API call to fetch nearby pharmacies
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayPharmacies(data.results);
      })
      .catch(error => {
        console.error('Error fetching pharmacies:', error);
        document.getElementById('pharmacies').innerHTML = '<p class="text-red-500">Failed to load pharmacies. Please try again.</p>';
      });
  }

  // Function to display pharmacies on the page
  function displayPharmacies(pharmacies) {
    const pharmaciesContainer = document.getElementById('pharmacies');

    // Clear previous pharmacies
    pharmaciesContainer.innerHTML = '';

    // Check if we have pharmacies in the results
    if (pharmacies.length === 0) {
      pharmaciesContainer.innerHTML = '<p class="text-red-500">No pharmacies found nearby.</p>';
      return;
    }

    // Loop through the pharmacies and create a div for each one
    pharmacies.forEach(pharmacy => {
      const pharmacyDiv = document.createElement('div');
      pharmacyDiv.classList.add('bg-white', 'p-6', 'rounded-xl', 'shadow-lg');

      pharmacyDiv.innerHTML = `
        <h2 class="text-xl font-semibold text-[#5e8aa7]">${pharmacy.name}</h2>
        <p class="text-gray-700 mt-2">Address: ${pharmacy.vicinity}</p>
        <p class="text-gray-700 mt-2">Rating: ${pharmacy.rating || 'N/A'}</p>
        <p class="text-gray-700 mt-2">Phone: <a href="tel:${pharmacy.formatted_phone_number || ''}" class="text-[#5e8aa7]">${pharmacy.formatted_phone_number || 'N/A'}</a></p>
        <a href="https://www.google.com/maps/search/?q=${pharmacy.name}" target="_blank" class="text-[#5e8aa7] mt-2 block">View on Google Maps</a>
      `;

      pharmaciesContainer.appendChild(pharmacyDiv);
    });
  }

  // On page load, get the user's location and fetch pharmacies
  window.onload = getUserLocation;