  const pcosDetails = {
    title: "🌸 PCOS (Polycystic Ovary Syndrome): What You Need to Know",
    intro: "PCOS is a hormonal condition that affects many young women and teens. It’s common and treatable with lifestyle, awareness, and, if needed, medical help.",
    sections: [
      {
        heading: "✅ What You Should Do",
        points: [
          "Maintain a regular and balanced diet – focus on whole foods, fruits, and vegetables.",
          "Exercise regularly – even light movement like walking or yoga can help.",
          "Track your periods to understand cycle changes.",
          "Keep stress low – mindfulness, journaling, or talking to a friend can help.",
          "Sleep 7-9 hours every night for hormonal balance."
        ]
      },
      {
        heading: "🚫 What You Should Avoid",
        points: [
          "Avoid processed foods and high sugar intake – it can worsen insulin resistance.",
          "Don’t skip meals – it can cause hormonal imbalances.",
          "Avoid comparing your body to others – PCOS affects everyone differently.",
          "Don’t self-medicate without a doctor’s advice.",
          "Avoid extreme workouts or diets unless professionally guided."
        ]
      },
      {
        heading: "🏠 Home Tips & Lifestyle Changes",
        points: [
          "Drink herbal teas like spearmint or cinnamon tea.",
          "Add flax seeds, cinnamon, and omega-3s to your diet.",
          "Do 20–30 minutes of movement daily – even dancing counts!",
          "Keep a mood and symptom journal to detect patterns.",
          "Use heat pads for cramps or discomfort."
        ]
      },
      {
        heading: "💊 Medical Support (When to See a Doctor)",
        points: [
          "Irregular or missing periods for several months.",
          "Excessive acne, facial hair, or hair loss.",
          "Difficulty managing weight despite efforts.",
          "Feeling constantly tired, moody, or anxious.",
          "If you’re trying for pregnancy and struggling.",
          "Doctors might recommend blood tests, ultrasounds, or hormonal treatments."
        ]
      },
      {
        heading: "🧘 What to Embrace",
        points: [
          "Your body is unique – PCOS does not define your worth.",
          "Build a support system – talk to friends, family, or support groups.",
          "Focus on progress, not perfection.",
          "Celebrate small wins: regular cycles, better moods, consistent workouts.",
          "Be kind to yourself – healing is a journey."
        ]
      }
    ]
  };

  function renderPCOSDetails(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="bg-white p-6 rounded-xl shadow-md text-gray-700 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-[#6a5acd] mb-4">${pcosDetails.title}</h2>
        <p class="mb-6">${pcosDetails.intro}</p>
        ${pcosDetails.sections.map(section => `
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-[#4a3e9c] mb-2">${section.heading}</h3>
            <ul class="list-disc pl-5 space-y-1">
              ${section.points.map(point => `<li>${point}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Example usage on page load
  document.addEventListener("DOMContentLoaded", () => {
    renderPCOSDetails("pcosContainer");
  });
