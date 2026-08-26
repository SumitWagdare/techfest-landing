// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Canvas Particle Background (Ethereal Orbs)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];
  
  const particleCount = window.innerWidth < 768 ? 30 : 70;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#00f0ff' : '#8a2be2',
      alpha: Math.random() * 0.5 + 0.1
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    // Move
    p.x += p.vx;
    p.y += p.vy;
    
    // Wrap around edges
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    
    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    
    // Draw connections
    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dx = p.x - p2.x;
      let dy = p.y - p2.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = (120 - dist) / 120 * 0.15;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawParticles();

// 2. GSAP Animations

// Hero Section Intro
const tl = gsap.timeline();

tl.from('.navbar', {
  y: -100,
  opacity: 0,
  duration: 1,
  ease: 'power4.out'
})
.from('.hero-subtitle', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
}, '-=0.5')
.from('.hero-title', {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power4.out'
}, '-=0.6')
.from('.hero-desc', {
  y: 20,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
}, '-=0.6')
.from('.hero-cta', {
  scale: 0.8,
  opacity: 0,
  duration: 0.5,
  ease: 'back.out(1.7)'
}, '-=0.4');


// Scroll Animations
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
});

gsap.from('.about-text p, .stats-container', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 70%',
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

gsap.from('.about-visual', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 70%',
  },
  scale: 0.8,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.event-card', {
  scrollTrigger: {
    trigger: '.events',
    start: 'top 70%',
  },
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'back.out(1.2)'
});

// 3. Magnetic Hover Effect
const magnetics = document.querySelectorAll('.magnetic');

magnetics.forEach((elem) => {
  elem.addEventListener('mousemove', (e) => {
    const position = elem.getBoundingClientRect();
    const x = e.clientX - position.left - position.width / 2;
    const y = e.clientY - position.top - position.height / 2;
    
    gsap.to(elem, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  elem.addEventListener('mouseleave', () => {
    gsap.to(elem, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});
