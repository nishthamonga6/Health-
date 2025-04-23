lucide.createIcons();

function toggleAddressInput() {
  const box = document.getElementById("addressBox");
  box.classList.toggle("hidden");
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

// Click outside to close delivery address
document.addEventListener("click", function (e) {
  const box = document.getElementById("addressBox");
  const pinBtn = document.querySelector('[onclick="toggleAddressInput()"]');
  if (!box.contains(e.target) && !pinBtn.contains(e.target)) {
    box.classList.add("hidden");
  }
});
function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
  }

  // function submitAddress() {
  //   const address = document.getElementById('addressInput').value.trim();
  //   if (address !== '') {
  //     // Redirect to next page and pass address as query param
  //     window.location.href = `location.html?address=${encodeURIComponent(address)}`;
  //   } else {
  //     alert('Please enter your address.');
  //   }
  // }

  lucide.createIcons();
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  const form = document.getElementById('cycleForm');
  const result = document.getElementById('predictionResult');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const startDate = new Date(document.getElementById('startDate').value);
    const cycleLength = parseInt(document.getElementById('cycleLength').value);

    if (isNaN(startDate) || isNaN(cycleLength)) return;

    const nextPeriod = new Date(startDate);
    nextPeriod.setDate(startDate.getDate() + cycleLength);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const readableDate = nextPeriod.toLocaleDateString(undefined, options);

    result.innerText = `🌼 Your next period is likely to start around: ${readableDate}`;
    result.classList.remove('hidden');

    // Save to localStorage
    localStorage.setItem('cycleStartDate', startDate.toISOString());
    localStorage.setItem('cycleLength', cycleLength);
    localStorage.setItem('nextPeriodDate', nextPeriod.toISOString());
  });

  // Optional: Auto-fill if data exists
  window.addEventListener('DOMContentLoaded', () => {
    const savedDate = localStorage.getItem('cycleStartDate');
    const savedLength = localStorage.getItem('cycleLength');

    if (savedDate) document.getElementById('startDate').value = savedDate.split("T")[0];
    if (savedLength) document.getElementById('cycleLength').value = savedLength;
  });
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.read-more').forEach(button => {
      button.addEventListener('click', () => {
        const extra = button.nextElementSibling;
        extra.classList.toggle('hidden');
        button.textContent = extra.classList.contains('hidden') ? "Read More" : "Show Less";
      });
    });
  });
   document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
  });