/**
 * ==============================================================================
 * RISHABH SINGH - OFFICIAL PORTFOLIO ENGINE
 * Architecture: Vanilla Modern JavaScript (ES6+)
 * Features:
 *   1. Interactive Neural AI & Digital Literacy Canvas
 *   2. Dynamic Typewriter Effect
 *   3. Aesthetic Cybernetic Loading Screen State Machine
 *   4. Native Web Audio Synth (Futuristic Feedback Sounds)
 *   5. Interactive Certificates Modal & Filter System
 *   6. Resume Previewer & PDF Generator Integration
 *   7. Interactive Contact Terminal & Toast Notifications
 *   8. Responsive Navigation & Scroll Spy
 * ==============================================================================
 */

(function () {
  'use strict';

  // --- AUDIO SYNTH ENGINE (Web Audio API - No External Files) ---
  class CyberAudio {
    constructor() {
      this.enabled = false;
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      if (this.enabled) {
        this.init();
        this.playBeep(660, 0.08, 'sine');
      }
      return this.enabled;
    }

    playBeep(freq = 440, duration = 0.1, type = 'sine') {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // AudioContext fallback
      }
    }

    playSuccess() {
      if (!this.enabled || !this.ctx) return;
      this.playBeep(523.25, 0.1, 'sine'); // C5
      setTimeout(() => this.playBeep(659.25, 0.1, 'sine'), 100); // E5
      setTimeout(() => this.playBeep(783.99, 0.25, 'triangle'), 200); // G5
    }

    playGlitch() {
      if (!this.enabled || !this.ctx) return;
      this.playBeep(320, 0.05, 'sawtooth');
      setTimeout(() => this.playBeep(480, 0.05, 'square'), 50);
    }
  }

  const cyberAudio = new CyberAudio();

  // --- 1. INTERACTIVE NEURAL & DIGITAL LITERACY CANVAS ---
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: null,
      y: null,
      radius: 170
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 85);
    const colors = [
      'rgba(0, 242, 254, ',    // Cyan
      'rgba(168, 85, 247, ',   // Purple
      'rgba(245, 158, 11, ',   // Gold
      'rgba(16, 185, 129, '    // Green
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2.5 + 1.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.6 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.density = Math.random() * 20 + 1;
        // Occasional binary packet symbol for digital literacy
        this.isBinary = Math.random() > 0.85;
        this.symbol = Math.random() > 0.5 ? '1' : '0';
      }

      update() {
        // Normal drift
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density * 0.5;
            const directionY = forceDirectionY * force * this.density * 0.5;

            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw() {
        if (this.isBinary) {
          ctx.fillStyle = this.color + this.alpha + ')';
          ctx.font = '10px "Fira Code", monospace';
          ctx.fillText(this.symbol, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color + this.alpha + ')';
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color + '0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      const maxDist = 135;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        // Connect to mouse if nearby
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[a].x - mouse.x;
          const dy = particles[a].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.45;
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animateCanvas);
    }

    initParticles();
    animateCanvas();
  }

  // --- 2. DYNAMIC TYPEWRITER EFFECT ---
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = [
      'B.Tech Engineering at JECRC',
      'Artificial Intelligence & Digital Tech',
      'National Kabaddi & Sports Discipline',
      'Varanasi Roots & Global Vision',
      'Curious, Energetic Innovation',
      'Communication & Team Leadership'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 75;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1600; // Pause at end of phrase
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // --- 3. AESTHETIC CYBERNETIC LOADING ANIMATION SYSTEM ---
  const cyberLoader = document.getElementById('cyber-loader');
  const loaderTitle = document.getElementById('loader-title');
  const loaderMsg = document.getElementById('loader-msg');
  const loaderProgress = document.getElementById('loader-progress');
  const loaderIcon = document.getElementById('loader-icon');

  const actionConfigs = {
    resume: {
      title: 'INITIALIZING RESUME PROTOCOL',
      icon: '<i class="fa-solid fa-file-arrow-down"></i>',
      steps: [
        { pct: 25, msg: 'Querying JECRC & KV verified records...' },
        { pct: 55, msg: 'Compiling athletic & engineering credentials...' },
        { pct: 85, msg: 'Formatting curriculum vitae into high-res stream...' },
        { pct: 100, msg: 'Resume generated successfully!' }
      ],
      execute: () => openModal('resume-modal')
    },
    certificates: {
      title: 'ACCESSING CREDENTIALS VAULT',
      icon: '<i class="fa-solid fa-award"></i>',
      steps: [
        { pct: 25, msg: 'Authenticating sports & academic archive...' },
        { pct: 50, msg: 'Loading National Kabaddi & Regional honors...' },
        { pct: 80, msg: 'Verifying digital literacy badges...' },
        { pct: 100, msg: 'Credentials synchronized!' }
      ],
      execute: () => openModal('certificates-modal')
    },
    contact: {
      title: 'OPENING TRANSMISSION LINK',
      icon: '<i class="fa-solid fa-envelope-open-text"></i>',
      steps: [
        { pct: 30, msg: 'Connecting to Varanasi communications node...' },
        { pct: 65, msg: 'Securing end-to-end interactive terminal...' },
        { pct: 90, msg: 'Synchronizing mailbox pipeline...' },
        { pct: 100, msg: 'Direct channel connected!' }
      ],
      execute: () => openModal('contact-modal')
    },
    default: {
      title: 'PROCESSING PROTOCOL',
      icon: '<i class="fa-solid fa-bolt"></i>',
      steps: [
        { pct: 40, msg: 'Querying JECRC AI Matrix...' },
        { pct: 80, msg: 'Optimizing data streams...' },
        { pct: 100, msg: 'Protocol Completed.' }
      ],
      execute: () => {}
    }
  };

  let isLoaderActive = false;

  function triggerAestheticLoading(actionKey) {
    if (isLoaderActive) return;
    isLoaderActive = true;

    const config = actionConfigs[actionKey] || actionConfigs.default;

    // Reset UI
    if (loaderTitle) loaderTitle.textContent = config.title;
    if (loaderIcon) loaderIcon.innerHTML = config.icon;
    if (loaderProgress) loaderProgress.style.width = '0%';
    if (loaderMsg) loaderMsg.textContent = 'Initializing telemetry...';

    // Show Loader
    cyberLoader.classList.add('active');
    cyberAudio.playGlitch();

    let stepIndex = 0;
    const intervalDuration = 260; // Smooth 1-1.2s aesthetic sequence

    const stepInterval = setInterval(() => {
      if (stepIndex < config.steps.length) {
        const step = config.steps[stepIndex];
        if (loaderProgress) loaderProgress.style.width = step.pct + '%';
        if (loaderMsg) loaderMsg.textContent = step.msg;
        cyberAudio.playBeep(450 + step.pct * 4, 0.05, 'sine');
        stepIndex++;
      } else {
        clearInterval(stepInterval);
        cyberAudio.playSuccess();

        // Brief hold at 100% for aesthetic satisfaction
        setTimeout(() => {
          cyberLoader.classList.remove('active');
          isLoaderActive = false;
          config.execute();
        }, 320);
      }
    }, intervalDuration);
  }

  // Attach trigger actions to all buttons with .trigger-action
  document.querySelectorAll('.trigger-action').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const action = button.getAttribute('data-action');
      if (action) {
        triggerAestheticLoading(action);
      }
    });
  });

  // --- 4. MODALS MANAGEMENT SYSTEM ---
  function openModal(modalId) {
    closeAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.cyber-modal').forEach((modal) => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  // Close modal on backdrop click or close button click
  document.querySelectorAll('.modal-close-trigger').forEach((el) => {
    el.addEventListener('click', () => {
      closeAllModals();
      cyberAudio.playBeep(350, 0.05, 'sine');
    });
  });

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // --- 5. CERTIFICATES CATEGORY FILTERING ---
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certItems = document.querySelectorAll('.cert-item');

  certFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cyberAudio.playBeep(520, 0.04, 'sine');

      certItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          item.style.animation = 'slideInToast 0.3s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- 6. RESUME PRINT & SAVE PDF TRIGGER ---
  const printResumeBtn = document.getElementById('print-resume-btn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      cyberAudio.playBeep(700, 0.08, 'sine');
      window.print();
    });
  }

  // --- 7. CONTACT FORM SUBMISSION & TOAST NOTIFICATION ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const sendMsgBtn = document.getElementById('send-msg-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const senderName = nameInput ? nameInput.value : 'Friend';

      // Button loading state
      if (sendMsgBtn) {
        const originalContent = sendMsgBtn.innerHTML;
        sendMsgBtn.innerHTML = `
          <span class="btn-beam"></span>
          <span class="btn-content">
            <i class="fa-solid fa-circle-notch fa-spin"></i>
            <span>Transmitting...</span>
          </span>
        `;
        sendMsgBtn.disabled = true;

        cyberAudio.playBeep(600, 0.1, 'sine');

        setTimeout(() => {
          sendMsgBtn.innerHTML = originalContent;
          sendMsgBtn.disabled = false;
          contactForm.reset();
          closeAllModals();
          showToast(`Transmission received, ${senderName}! Rishabh will connect with you shortly.`);
          cyberAudio.playSuccess();
        }, 1200);
      }
    });
  }

  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'cyber-toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check"></i>
      <div class="toast-message">${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // --- 8. AUDIO TOGGLE BUTTON ---
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      const isSoundOn = cyberAudio.toggle();
      if (audioIcon) {
        if (isSoundOn) {
          audioIcon.className = 'fa-solid fa-volume-high';
          audioToggleBtn.style.color = 'var(--cyan-primary)';
          audioToggleBtn.style.borderColor = 'var(--cyan-primary)';
          showToast('Futuristic Audio Feedback: Activated');
        } else {
          audioIcon.className = 'fa-solid fa-volume-xmark';
          audioToggleBtn.style.color = '';
          audioToggleBtn.style.borderColor = '';
          showToast('Audio Feedback: Muted');
        }
      }
    });
  }

  // --- 9. NAVBAR SCROLL & ACTIVE LINK TRACKING ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background blur/shrink
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section spy
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // Trigger skills bar animations when in view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const rect = skillsSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.75) {
        document.querySelectorAll('.skill-progress-fill').forEach((fill) => {
          const percent = fill.style.getPropertyValue('--percent');
          if (percent) {
            fill.style.width = percent;
          }
        });
      }
    }
  });

  // --- 10. MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-links');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      cyberAudio.playBeep(400, 0.05, 'sine');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // --- 11. MAGNETIC PHOTO TILT EFFECT ---
  const photoCard = document.getElementById('photo-card');
  if (photoCard && window.innerWidth > 768) {
    photoCard.addEventListener('mousemove', (e) => {
      const rect = photoCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -10;
      const tiltY = (x / (rect.width / 2)) * 10;
      photoCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    photoCard.addEventListener('mouseleave', () => {
      photoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  console.log(
    '%c Rishabh Singh Portfolio Matrix Initialized %c JECRC University • Varanasi ',
    'background: #00f2fe; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'background: #7928ca; color: #fff; padding: 4px 8px; border-radius: 4px;'
  );
})();
