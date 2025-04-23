
  function submitLocation() {
    const manual = document.getElementById("manualLocation").value;
    const details = document.getElementById("additionalDetails").value;

    const locationData = {
      manualLocation: manual,
      additionalDetails: details,
      latitude: userLat,
      longitude: userLng
    };

    fetch("http://localhost:5000/api/location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(locationData)
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("submittedOutput").innerText = "✅ Location saved successfully!";
      console.log(data);
    })
    .catch(err => {
      document.getElementById("submittedOutput").innerText = "❌ Failed to save location.";
      console.error(err);
    });
  }

  function loadNearbyServices() {
    fetch('/nearby-services')
      .then(res => res.json())
      .then(data => {
        alert("📍 Nearby services:\n" + data.nearby.join("\n"));
      });
  }
  