const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = gynos.filter(g =>
      g.name.toLowerCase().includes(term) ||
      g.bio.toLowerCase().includes(term) ||
      g.experience.toLowerCase().includes(term)
    );
    renderFiltered(filtered);
  });

  function applyFilter(keyword) {
    const filtered = gynos.filter(g => {
      if (keyword === 'online') return g.status === true;
      return g.bio.toLowerCase().includes(keyword.toLowerCase()) || g.experience.includes(keyword);
    });
    renderFiltered(filtered);
  }

  function clearFilter() {
    searchInput.value = "";
    renderGynos();
  }

  function renderFiltered(filteredGynos) {
    gynoList.innerHTML = "";
    filteredGynos.forEach(gyno => {
      const card = document.createElement("div");
      card.className = "bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all";
      card.innerHTML = `
        <h3 class="text-xl font-semibold text-[#5a4bcf] mb-2">${gyno.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${gyno.bio}</p>
        <p class="text-sm text-gray-800 mb-1"><strong>Experience:</strong> ${gyno.experience}</p>
        <p class="text-sm text-gray-800 mb-1"><strong>Phone:</strong> <a href="tel:${gyno.number}" class="text-[#5a4bcf] underline">${gyno.number}</a></p>
        <p class="mt-2 text-sm font-medium ${gyno.status ? 'text-green-600' : 'text-red-500'}">
          ${gyno.status ? '🟢 Online Now' : '🔴 Offline'}
        </p>
      `;
      gynoList.appendChild(card);
    });
  }
const gynos = [
    { name: "Dr. Aditi Sharma", number: "+91 9876543210", experience: "10+ years", status: true, bio: "Specializes in adolescent gynecology and PCOS treatment." },
    { name: "Dr. Meera Desai", number: "+91 9834567890", experience: "8 years", status: false, bio: "Loves guiding teens through their first period experience." },
    { name: "Dr. Nidhi Kapoor", number: "+91 9123456780", experience: "12 years", status: true, bio: "Known for gentle counseling and school period wellness sessions." },
    { name: "Dr. Riya Chauhan", number: "+91 9012345678", experience: "7 years", status: false, bio: "Focus on menstrual irregularities and teen health awareness." },
    { name: "Dr. Anjali Verma", number: "+91 9098765432", experience: "15 years", status: true, bio: "Experienced with PMS treatment and safe health practices." }
  ];

  const gynoList = document.getElementById("gynoList");
  const questionInput = document.getElementById("questionInput");
  const recentQuestions = document.getElementById("recentQuestions");

  function renderGynos() {
    gynoList.innerHTML = "";
    gynos.forEach(gyno => {
      const card = document.createElement("div");
      card.className = "bg-white border border-purple-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition";
      card.innerHTML = `
        <h3 class="text-xl font-bold text-[#6a5acd] mb-1">${gyno.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${gyno.bio}</p>
        <p class="text-sm"><strong>Experience:</strong> ${gyno.experience}</p>
        <p class="text-sm"><strong>Phone:</strong> <a href="tel:${gyno.number}" class="text-[#7b68ee] underline">${gyno.number}</a></p>
        <p class="mt-2 text-sm font-medium ${gyno.status ? 'text-green-600' : 'text-red-500'}">
          ${gyno.status ? '🟢 Online Now' : '🔴 Offline'}
        </p>
      `;
      gynoList.appendChild(card);
    });
  }

  function submitQuestion() {
    const question = questionInput.value.trim();
    if (!question) return;
    const questions = JSON.parse(localStorage.getItem("userQuestions") || "[]");
    questions.push({ id: Date.now(), text: question, answers: [] });
    localStorage.setItem("userQuestions", JSON.stringify(questions));
    questionInput.value = "";
    loadQuestions();
  }

  function loadQuestions() {
    recentQuestions.innerHTML = "";
    const questions = JSON.parse(localStorage.getItem("userQuestions") || "[]").reverse();

    questions.forEach(q => {
      const li = document.createElement("li");
      li.className = "bg-[#f4f2fc] p-4 rounded-xl border border-purple-200";

      const answersHTML = q.answers.length > 0 
        ? q.answers.map((a, i) => `<li class="text-sm mb-1 pl-2 border-l-4 border-[#7b68ee] italic">👩‍⚕️ ${a}</li>`).join('')
        : '<li class="text-sm text-gray-400 italic">No answers yet.</li>';

      li.innerHTML = `
        <div class="mb-2"><strong>Q:</strong> ${q.text}</div>
        <ul class="ml-3 mb-3" id="ans-${q.id}">${answersHTML}</ul>

        <div class="flex gap-2 mt-2">
          <button onclick="addAnswer(${q.id})" class="text-xs text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">Add Answer</button>
          <button onclick="deleteQuestion(${q.id})" class="text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Delete</button>
        </div>
      `;
      recentQuestions.appendChild(li);
    });
  }

  function addAnswer(id) {
    const answer = prompt("Type Gyno's answer:");
    if (answer) {
      const questions = JSON.parse(localStorage.getItem("userQuestions") || "[]");
      const question = questions.find(q => q.id === id);
      if (question) {
        question.answers.push(answer);
        localStorage.setItem("userQuestions", JSON.stringify(questions));
        loadQuestions();
      }
    }
  }

  function deleteQuestion(id) {
    let questions = JSON.parse(localStorage.getItem("userQuestions") || "[]");
    questions = questions.filter(q => q.id !== id);
    localStorage.setItem("userQuestions", JSON.stringify(questions));
    loadQuestions();
  }

  renderGynos();
  loadQuestions();
  const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");

chatToggle.addEventListener("click", toggleChat);

function toggleChat() {
  chatBox.classList.toggle("hidden");
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (message === "") return;

  appendUserMessage(message);
  chatInput.value = "";

  setTimeout(() => {
    generateBotResponse(message);
  }, 800); // Simulated delay
}

function sendQuickReply(text) {
  appendUserMessage(text);
  setTimeout(() => {
    generateBotResponse(text);
  }, 800);
}

function appendUserMessage(msg) {
  const div = document.createElement("div");
  div.className = "text-right bg-[#e9e7fd] text-gray-800 rounded-lg p-2 ml-auto max-w-[80%]";
  div.textContent = msg;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMsg) {
  let reply = "🤔 I'm still learning. Please contact a real doctor for detailed help.";
  
  if (userMsg.toLowerCase().includes("pms")) {
    reply = "🩺 PMS symptoms include mood swings, cramps, fatigue, and bloating. A warm compress and hydration can help!";
  } else if (userMsg.toLowerCase().includes("irregular")) {
    reply = "🧬 Irregular periods can happen due to stress, PCOS, or hormonal imbalance. Tracking can help you identify patterns.";
  } else if (userMsg.toLowerCase().includes("pain")) {
    reply = "🌿 You can try hot water bottles, light stretching, or over-the-counter meds like ibuprofen. If pain is severe, consult a doctor.";
  } else if (userMsg.toLowerCase().includes("hygiene")) {
    reply = "🧼 Change pads every 4-6 hours, clean with warm water, and avoid scented products to stay healthy and fresh.";
  }
  else if (userMsg.toLowerCase().includes("delay")) {
    reply = "🕒 Natural ways to delay periods include lemon water or vinegar, but it's not guaranteed. Talk to a gyno for safer options.";
  } else if (userMsg.toLowerCase().includes("pregnancy")) {
    reply = "👶 Early pregnancy signs may include missed period, nausea, sore breasts, and fatigue. A test is the best way to confirm.";
  } else if (userMsg.toLowerCase().includes("stress")) {
    reply = "😟 Yes! Stress can delay or disturb your cycle. Try journaling, sleep, or light exercise to manage it.";
  } else if (userMsg.toLowerCase().includes("discharge")) {
    reply = "🩸 White or clear discharge is usually normal and helps clean the vagina. But if it smells bad or is itchy, see a doctor.";
  } else if (userMsg.toLowerCase().includes("cup")) {
    reply = "🧪 Wash your hands, fold the cup (C-fold or punch-down), insert it, and rotate slightly. Change every 6–8 hours.";
  } else if (userMsg.toLowerCase().includes("acne")) {
    reply = "😩 Hormonal changes before your period can cause acne. Use gentle cleansers and avoid oily food during this time.";
  } else if (userMsg.toLowerCase().includes("swim") || userMsg.toLowerCase().includes("exercise")) {
    reply = "🏊 Yes! You can totally swim or exercise. Use a tampon or menstrual cup while swimming.";
  } else if (userMsg.toLowerCase().includes("painkiller")) {
    reply = "💊 Ibuprofen or mefenamic acid is safe for period pain if used correctly. Always read labels or ask a doctor.";
  } else if (userMsg.toLowerCase().includes("when should i see") || userMsg.toLowerCase().includes("see a gyno")) {
    reply = "📅 If you have extreme pain, heavy bleeding, missed periods, or unusual discharge—it's time to see a gyno.";
  }
  
  const div = document.createElement("div");
  div.className = "text-left bg-purple-100 rounded-lg p-2 max-w-[80%]";
  div.innerHTML = reply;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function activateAnonymousMode() {
    const isAnon = document.getElementById('anonToggle').checked;
    const anonOverlay = document.getElementById('anonymousOverlay');
    const normalAsk = document.getElementById('normalAskBar');

    if (isAnon) {
      anonOverlay.classList.remove('hidden');
      normalAsk.classList.add('hidden');
    } else {
      anonOverlay.classList.add('hidden');
      normalAsk.classList.remove('hidden');
    }
  }

  function submitAnonymousQuestion() {
    const question = document.getElementById('anonQuestionInput').value;
    if (!question.trim()) {
      alert("Enter something!");
      return;
    }

    // Add to question list
    const questionList = document.getElementById("recentQuestions");
    const newItem = document.createElement("li");
    newItem.className = "bg-purple-50 border border-purple-100 p-4 rounded-xl shadow-sm";
    newItem.innerHTML = `
      <p class="font-semibold mb-1">Anonymous 👤:</p>
      <p class="text-sm text-gray-800">${question}</p>
      <div class="mt-3 space-y-2" id="answers-${Date.now()}">
        <input type="text" class="w-full border border-purple-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b68ee]"
               placeholder="Reply as Gyno...">
        <button class="mt-1 px-4 py-1 bg-[#7b68ee] text-white rounded hover:bg-[#6a5acd]" onclick="addReply(this)">Reply</button>
      </div>
    `;
    questionList.prepend(newItem);

    // Reset + close overlay
    document.getElementById('anonQuestionInput').value = "";
    document.getElementById('anonymousOverlay').classList.add('hidden');
    document.getElementById('anonToggle').checked = false;
  }

  function submitQuestion() {
    const question = document.getElementById('questionInput').value;
    if (!question.trim()) {
      alert("Type something first!");
      return;
    }

    const questionList = document.getElementById("recentQuestions");
    const newItem = document.createElement("li");
    newItem.className = "bg-purple-50 border border-purple-100 p-4 rounded-xl shadow-sm";
    newItem.innerHTML = `
      <p class="font-semibold mb-1">You:</p>
      <p class="text-sm text-gray-800">${question}</p>
      <div class="mt-3 space-y-2" id="answers-${Date.now()}">
        <input type="text" class="w-full border border-purple-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b68ee]"
               placeholder="Reply as Gyno...">
        <button class="mt-1 px-4 py-1 bg-[#7b68ee] text-white rounded hover:bg-[#6a5acd]" onclick="addReply(this)">Reply</button>
      </div>
    `;
    questionList.prepend(newItem);

    document.getElementById('questionInput').value = "";
  }

  function addReply(button) {
    const input = button.previousElementSibling;
    const text = input.value;
    if (!text.trim()) return;

    const container = button.parentElement;
    const reply = document.createElement("p");
    reply.className = "text-sm text-purple-700 font-medium bg-purple-100 px-3 py-2 rounded-lg";
    reply.innerText = `👩‍⚕️ Gyno: ${text}`;

    container.appendChild(reply);
    input.value = "";
  }
  