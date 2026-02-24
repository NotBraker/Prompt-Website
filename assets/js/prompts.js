const prompts = [
  {
    title: "Code Refactor Assistant",
    category: "development",
    text: "You are a senior software engineer. Refactor the following code for readability and maintainability without changing behavior. Explain each improvement and provide the updated code:\n\n[PASTE CODE HERE]"
  },
  {
    title: "Bug Investigation Plan",
    category: "development",
    text: "Act as a debugging specialist. Given this issue description and logs, propose a step-by-step investigation plan, likely root causes ranked by probability, and fast validation checks:\n\n[PASTE ISSUE + LOGS]"
  },
  {
    title: "Article Outline Generator",
    category: "writing",
    text: "You are an expert content strategist. Create a detailed article outline for this topic and audience, including title options, section goals, and key points per section:\n\nTopic: [TOPIC]\nAudience: [AUDIENCE]"
  },
  {
    title: "Tone Rewrite Prompt",
    category: "writing",
    text: "Rewrite the text below in a [TONE] tone while preserving core meaning. Keep it concise, remove repetition, and improve clarity:\n\n[PASTE TEXT]"
  },
  {
    title: "Dataset Insight Prompt",
    category: "analysis",
    text: "Act as a data analyst. Review this dataset summary and produce: key trends, anomalies, possible explanations, and 3 follow-up analyses that would increase confidence:\n\n[PASTE DATA SUMMARY]"
  },
  {
    title: "Decision Matrix Builder",
    category: "analysis",
    text: "Help me compare options using a decision matrix. Define evaluation criteria, assign weights, score each option, and provide a final recommendation with trade-offs:\n\nOptions: [LIST OPTIONS]"
  },
  {
    title: "Learn Fast Tutor Prompt",
    category: "learning",
    text: "Act as a personal tutor for [TOPIC]. Build a 7-day plan with daily objectives, short practice tasks, and quick self-tests. Keep lessons beginner-friendly and practical."
  },
  {
    title: "Explain Like I Build",
    category: "learning",
    text: "Explain [CONCEPT] using practical analogies and one real implementation example. Then give me 5 short questions to test understanding."
  }
];

const promptList = document.getElementById("prompt-list");
const chipButtons = document.querySelectorAll(".chip");

function createPromptCard(prompt) {
  const card = document.createElement("article");
  card.className = "prompt-card reveal visible";
  card.dataset.category = prompt.category;

  card.innerHTML = `
    <div class="prompt-meta">
      <h2 class="prompt-title">${prompt.title}</h2>
      <span class="prompt-tag">${prompt.category}</span>
    </div>
    <p class="prompt-text"></p>
    <button class="copy-btn" type="button">Copy Prompt</button>
  `;

  const textEl = card.querySelector(".prompt-text");
  if (textEl) {
    textEl.textContent = prompt.text;
  }

  const copyBtn = card.querySelector(".copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(prompt.text);
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("done");
        window.setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.classList.remove("done");
        }, 1200);
      } catch {
        copyBtn.textContent = "Clipboard blocked";
      }
    });
  }

  return card;
}

function renderPrompts(filter) {
  if (!promptList) return;
  promptList.innerHTML = "";
  const filtered = filter === "all" ? prompts : prompts.filter((item) => item.category === filter);
  filtered.forEach((item) => promptList.appendChild(createPromptCard(item)));
}

chipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderPrompts(button.dataset.filter || "all");
  });
});

renderPrompts("all");

