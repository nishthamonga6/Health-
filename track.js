const form = document.getElementById("trackerForm");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearHistoryBtn");

// Format date as YYYY-MM-DD
function formatDate(dateObj) {
  return dateObj.toISOString().split('T')[0];
}

// Save a history entry
function saveHistory(startDate, cycleLength, nextDate) {
  const history = JSON.parse(localStorage.getItem("cycleHistory") || "[]");

  const entry = {
    id: Date.now(), // unique id
    start: startDate,
    length: cycleLength,
    predicted: nextDate,
    createdAt: new Date().toISOString()
  };

  history.unshift(entry);
  localStorage.setItem("cycleHistory", JSON.stringify(history));
  renderHistory();
}

// Delete a specific entry
function deleteEntry(id) {
  let history = JSON.parse(localStorage.getItem("cycleHistory") || "[]");
  history = history.filter(entry => entry.id !== id);
  localStorage.setItem("cycleHistory", JSON.stringify(history));
  renderHistory();
}

// Clear all history
clearBtn?.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all history?")) {
    localStorage.removeItem("cycleHistory");
    renderHistory();
  }
});

// Display all history
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("cycleHistory") || "[]");
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = `<li class="text-gray-500">No tracking history yet.</li>`;
    return;
  }

  history.forEach(entry => {
    const item = document.createElement("li");
    item.className = "bg-white rounded-xl p-4 shadow-sm border-l-4 border-[#5e8aa7] relative";

    item.innerHTML = `
      <button title="Delete" class="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm font-bold" onclick="deleteEntry(${entry.id})">✖</button>
      <div class="font-semibold text-[#4a7a90] mb-1">📅 Start Date: ${entry.start}</div>
      <div class="text-sm">Cycle Length: ${entry.length} days</div>
      <div class="text-sm">Predicted Next Period: <span class="font-medium">${entry.predicted}</span></div>
      <div class="text-xs text-gray-400 mt-1">Saved on: ${new Date(entry.createdAt).toLocaleString()}</div>
    `;

    historyList.appendChild(item);
  });
}

// Form submit handler
form.addEventListener("submit", e => {
  e.preventDefault();

  const startInput = document.getElementById("startDate").value;
  const cycleInput = parseInt(document.getElementById("cycleLength").value);

  if (!startInput || isNaN(cycleInput)) {
    alert("Please enter both a valid start date and cycle length.");
    return;
  }

  const startDate = new Date(startInput);
  const nextDate = new Date(startDate);
  nextDate.setDate(startDate.getDate() + cycleInput);
  const formattedNext = formatDate(nextDate);

  result.innerHTML = `
    <div class="bg-[#e0f4f2] p-4 rounded-xl mt-4 text-[#4a7a90] font-medium shadow">
      ✅ Your next period is likely around <strong>${formattedNext}</strong>.
    </div>
  `;

  saveHistory(formatDate(startDate), cycleInput, formattedNext);
});

// Accordion toggle
document.querySelectorAll(".accordion").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("accordion-open");
    const content = item.querySelector(".accordion-content");
    if (item.classList.contains("accordion-open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});

// Load history on page load
renderHistory();
const problems = [
    {
      title: "💢 Cramps",
      short: "Painful contractions in the lower abdomen during your period.",
      full: "Period cramps are caused by uterine contractions. You can relieve them using heat packs, pain relievers like ibuprofen, light stretching, and staying hydrated. Severe cramps may indicate endometriosis or other conditions—consult a doctor if they worsen."
    },
    {
      title: "😔 Mood Swings",
      short: "Emotional ups and downs before or during your period.",
      full: "Hormonal changes can cause irritability, sadness, or anxiety. Improve mood with exercise, sleep, balanced diet, and stress-relief practices like journaling or meditation. Talk to a doctor if symptoms persist or interfere with daily life."
    },
    {
      title: "🥴 Bloating",
      short: "Feeling swollen or puffy, especially in the abdomen.",
      full: "Reduce bloating by drinking water, avoiding salty foods, and eating light, nutritious meals. Peppermint or ginger tea can also help. If bloating continues long-term, consult your healthcare provider."
    },
    {
      title: "🔁 Irregular Periods",
      short: "Unpredictable cycle lengths or skipped months.",
      full: "This could be due to stress, diet, PCOS, thyroid issues, or medication. Keep a cycle diary and seek medical guidance if the irregularity continues over several months."
    },
    {
      title: "😴 Fatigue",
      short: "Extreme tiredness around your menstrual days.",
      full: "Period fatigue is often linked to hormonal shifts and blood loss. Get good sleep, eat iron-rich foods, and stay active with light workouts. Iron supplements may be needed if you're anemic."
    },
    {
      title: "😵 Headaches",
      short: "Hormonal headaches or migraines during menstruation.",
      full: "Estrogen drops during periods can trigger headaches. Manage with hydration, rest, OTC meds, and reducing screen time. Persistent migraines? See a gynecologist or neurologist."
    }
  ];

  const problemCards = document.getElementById("problemCards");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");

  problems.forEach((problem, index) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition";

    card.innerHTML = `
      <h3 class="text-xl font-bold text-[#4a7a90] mb-2">${problem.title}</h3>
      <p class="text-sm text-gray-600 mb-4">${problem.short}</p>
      <button data-index="${index}" class="bg-[#d6f0ef] text-[#4a7a90] hover:bg-[#c4e7e5] px-4 py-2 rounded-full text-sm font-medium transition view-btn">
        View Full Info
      </button>
    `;
    problemCards.appendChild(card);
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-btn")) {
      const idx = e.target.dataset.index;
      modalTitle.textContent = problems[idx].title;
      modalContent.textContent = problems[idx].full;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
    if (e.target.id === "closeModal") {
      modal.classList.add("hidden");
    }
  });