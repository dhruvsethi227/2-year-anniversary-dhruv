const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const card = document.getElementById('card');
const celebration = document.getElementById('celebration');
const video = document.getElementById('anniversary-video');

// ── No button escape ──────────────────────────────────────────────────────────

let noBtnFixed = false;
let roamInterval = null;

function getRandomPos() {
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const margin = 20;
  const maxX = window.innerWidth  - btnW - margin;
  const maxY = window.innerHeight - btnH - margin;
  return {
    x: Math.random() * (maxX - margin) + margin,
    y: Math.random() * (maxY - margin) + margin,
  };
}

function moveNoButton() {
  if (!noBtnFixed) {
    noBtn.style.position   = 'fixed';
    noBtn.style.zIndex     = '999';
    noBtn.style.margin     = '0';
    noBtn.style.transition = 'left 0.4s ease, top 0.4s ease';
    noBtnFixed = true;

    // Place it at its current rendered position before starting to roam
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.left = rect.left + 'px';
    noBtn.style.top  = rect.top  + 'px';

    // Start continuous roaming
    roamInterval = setInterval(() => {
      const { x, y } = getRandomPos();
      noBtn.style.left = x + 'px';
      noBtn.style.top  = y + 'px';
    }, 1200);
  }

  // Snap to a new random spot immediately on hover/touch
  const { x, y } = getRandomPos();
  noBtn.style.transition = 'left 0.15s ease, top 0.15s ease';
  noBtn.style.left = x + 'px';
  noBtn.style.top  = y + 'px';
  setTimeout(() => { noBtn.style.transition = 'left 0.4s ease, top 0.4s ease'; }, 200);
}

noBtn.addEventListener('mouseover', moveNoButton);

// Mobile: move on touchstart so she can never tap it
noBtn.addEventListener('touchstart', function (e) {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

// ── Yes button click ──────────────────────────────────────────────────────────

yesBtn.addEventListener('click', () => {
  // Hide the question card
  card.style.display = 'none';

  // Allow scrolling on the celebration screen
  document.body.style.overflow = 'auto';

  // Show celebration
  celebration.style.display = 'block';

  // Play video
  video.play().catch(() => {
    // Autoplay may be blocked on some browsers — controls are visible so she can tap
  });

  // Fire confetti bursts
  fireConfetti();
});

function fireConfetti() {
  const colors = ['#e8607a', '#f7a8b8', '#fde8d8', '#c2395a', '#ffffff', '#ffcc00'];

  // Initial big burst from center
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.5 },
    colors,
    shapes: ['circle', 'square'],
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    });
  }, 250);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    });
  }, 250);

  // Gentle follow-up shower
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.3 },
      colors,
      gravity: 0.6,
      ticks: 200,
    });
  }, 600);
}
