const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

const modal = document.getElementById("bookingModal");
const planTabs = Array.from(document.querySelectorAll(".plan-option[role='tab']"));
const planDetails = document.getElementById("plan-details");

function selectPlan(tab) {
  planTabs.forEach(option => {
    const selected = option === tab;
    option.classList.toggle("selected", selected);
    option.setAttribute("aria-selected", String(selected));
    option.tabIndex = selected ? 0 : -1;
  });

  const planTitle = planDetails?.querySelector("[data-plan-title]");
  const planPrice = planDetails?.querySelector("[data-plan-price]");
  if (planTitle) planTitle.textContent = tab.dataset.planName;
  if (planPrice) planPrice.textContent = tab.dataset.planPrice;
  planDetails?.setAttribute("aria-labelledby", tab.id);
}

planTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectPlan(tab));
  tab.addEventListener("keydown", event => {
    const key = event.key;
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (key === "Home") nextIndex = 0;
    else if (key === "End") nextIndex = planTabs.length - 1;
    else if (key === "ArrowDown" || key === "ArrowRight") nextIndex = (index + 1) % planTabs.length;
    else nextIndex = (index - 1 + planTabs.length) % planTabs.length;

    const nextTab = planTabs[nextIndex];
    nextTab.focus();
    selectPlan(nextTab);
  });
});

document.querySelectorAll(".hero button").forEach(button => {
  button.addEventListener("click", () => {
    if (modal) {
      modal.classList.add("open");
      const date = document.getElementById("sessionDate");
      if (date) date.valueAsDate = new Date();
    }
  });
});

document.getElementById("browseAll")?.addEventListener("click", () => {
  document.querySelectorAll(".filter-tab").forEach(item => item.classList.remove("active"));
  const allTab = document.querySelector('.filter-tab[data-filter="all"]');
  allTab?.classList.add("active");
  document.querySelectorAll(".catalog-card").forEach(card => card.style.display = "");
  showToast("Showing all courses");
});

document.querySelectorAll(".modal-close").forEach(button => {
  button.addEventListener("click", () => modal?.classList.remove("open"));
});

modal?.addEventListener("click", event => {
  if (event.target === modal) modal.classList.remove("open");
});

document.getElementById("confirmBooking")?.addEventListener("click", () => {
  modal?.classList.remove("open");
  showToast("Session booked successfully");
});

document.querySelectorAll(".continue-btn").forEach(button => {
  button.addEventListener("click", () => {
    window.location.href = "learning.html?v=20261124-10";
  });
});

document.querySelectorAll(".filter-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;
    document.querySelectorAll(".catalog-card").forEach(card => {
      card.style.display = filter === "all" || card.dataset.status === filter ? "" : "none";
    });
  });
});

document.querySelectorAll(".view-course").forEach(button => {
  button.addEventListener("click", () => window.location.href = "learning.html?v=20261124-10");
});

const searchInputs = document.querySelectorAll(".search input");
searchInputs.forEach(input => {
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".catalog-card, .course-card, .quiz-item, .resource-row");
    cards.forEach(item => {
      item.style.display = !query || item.textContent.toLowerCase().includes(query) ? "" : "none";
    });
  });
});

document.querySelectorAll(".download-btn").forEach(button => {
  button.addEventListener("click", () => {
    const fileName = button.dataset.file || "The-Good-Boss-Resource.pdf";
    const content = `The Good Boss\n\nResource: ${fileName}\n\nThis is a sample course resource document.`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(`${fileName} downloaded`);
  });
});

const courseVideo = document.getElementById("courseVideo");
const playLesson = document.getElementById("playLesson");

if (courseVideo && playLesson) {
  const progressTimeline = document.getElementById("videoTimeline");
  const videoProgress = document.getElementById("videoProgress");
  const volumeButton = document.getElementById("videoVolume");
  const fullscreenButton = document.getElementById("videoFullscreen");
  const updatePlaybackState = () => {
    const paused = courseVideo.paused || courseVideo.ended;
    playLesson.textContent = paused ? "▶" : "❚❚";
    playLesson.setAttribute("aria-label", paused ? "Play lesson" : "Pause lesson");
  };
  const updateProgress = () => {
    if (!progressTimeline || !videoProgress || !Number.isFinite(courseVideo.duration) || courseVideo.duration <= 0) return;
    const percentage = Math.round(courseVideo.currentTime / courseVideo.duration * 100);
    videoProgress.style.width = `${percentage}%`;
    progressTimeline.setAttribute("aria-valuenow", String(percentage));
  };

  playLesson.addEventListener("click", async () => {
    try {
      if (courseVideo.paused || courseVideo.ended) {
        await courseVideo.play();
        showToast("Lesson preview playing");
      } else {
        courseVideo.pause();
        showToast("Lesson preview paused");
      }
    } catch {
      showToast("The lesson preview could not be played.");
    }
  });

  courseVideo.addEventListener("play", updatePlaybackState);
  courseVideo.addEventListener("pause", updatePlaybackState);
  courseVideo.addEventListener("ended", updatePlaybackState);
  courseVideo.addEventListener("timeupdate", updateProgress);
  courseVideo.addEventListener("loadedmetadata", updateProgress);
  courseVideo.addEventListener("error", () => showToast("The lesson preview could not be loaded."));

  progressTimeline?.addEventListener("click", event => {
    if (!Number.isFinite(courseVideo.duration) || courseVideo.duration <= 0) return;
    const bounds = progressTimeline.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    courseVideo.currentTime = ratio * courseVideo.duration;
  });

  progressTimeline?.addEventListener("keydown", event => {
    if (!Number.isFinite(courseVideo.duration) || courseVideo.duration <= 0) return;
    const delta = event.key === "ArrowRight" ? 5 : event.key === "ArrowLeft" ? -5 : 0;
    if (!delta) return;
    event.preventDefault();
    courseVideo.currentTime = Math.max(0, Math.min(courseVideo.duration, courseVideo.currentTime + delta));
  });

  volumeButton?.addEventListener("click", () => {
    courseVideo.muted = !courseVideo.muted;
    volumeButton.setAttribute("aria-label", courseVideo.muted ? "Unmute video" : "Mute video");
  });

  fullscreenButton?.addEventListener("click", async () => {
    const player = courseVideo.closest(".detail-player");
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (player?.requestFullscreen) {
        await player.requestFullscreen();
      } else {
        showToast("Fullscreen is unavailable in this browser.");
      }
    } catch {
      showToast("Fullscreen is unavailable in this browser.");
    }
  });
}

document.querySelectorAll(".lesson-row").forEach(row => {
  row.addEventListener("click", () => {
    document.querySelectorAll(".lesson-row").forEach(item => item.classList.remove("active"));
    row.classList.add("active");
  });
});

document.getElementById("markComplete")?.addEventListener("click", () => {
  showToast("Lesson marked as complete");
});

document.getElementById("profileForm")?.addEventListener("submit", event => {
  event.preventDefault();
  showToast("Profile changes saved");
});

document.querySelectorAll(".icon-button").forEach(button => {
  button.addEventListener("click", () => {
    showToast(button.getAttribute("aria-label") || "No new notifications");
  });
});

document.querySelectorAll(".settings-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const target = document.getElementById(tab.dataset.target);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".account-row button, .payment-method button, .add-payment, .settings-avatar button").forEach(button => {
  button.addEventListener("click", () => showToast(button.textContent.trim() + " updated"));
});

document.getElementById("cancelSubscription")?.addEventListener("click", () => {
  showToast("Contact support to cancel your subscription. No changes were made.");
});

document.querySelector(".logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("goodBossSession");
  window.location.href = "login.html?v=20261124-5";
});

document.getElementById("loginForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;
  if (!email || !password) {
    showToast("Please enter your login details");
    return;
  }
  localStorage.setItem("goodBossSession", JSON.stringify({ email }));
  showToast("Login successful");
  window.setTimeout(() => window.location.href = "dashboard.html?v=20261124-18", 350);
});

document.querySelector(".forgot-btn")?.addEventListener("click", () => showToast("Password reset link sent"));