// ===== CURSOR GLOW FOLLOWER =====
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursorGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) {
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
    }
    requestAnimationFrame(updateCursorGlow);
}
updateCursorGlow();

// ===== TYPEWRITER EFFECT =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'MERN Stack Developer.',
    'Java Developer.',
    'Agentic AI Explorer.',
    'Full-Stack Builder.',
    'Hackathon Enthusiast.',
    'SaaS Dreamer & Doer.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeWriter() {
    if (!typewriterEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // pause before new phrase
    }

    setTimeout(typeWriter, typeSpeed);
}
setTimeout(typeWriter, 1000);

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SCROLL REVEAL (IntersectionObserver) =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

// Add reveal to cards and sections
const revealElements = document.querySelectorAll(
    '.about-card, .vision-card, .skill-card-v2, .trait-card, .roadmap-item, .section-header'
);
revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Add stagger class to grid parents
document.querySelectorAll('.about-grid, .vision-grid, .skills-showcase, .traits-grid').forEach(grid => {
    grid.classList.add('reveal-stagger');
});

// ===== SKILL METER ANIMATION =====
const skillSection = document.getElementById('skills');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-meter-fill').forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.setProperty('--target-width', width + '%');
                fill.classList.add('animate');
            });
            skillObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

if (skillSection) skillObserver.observe(skillSection);

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target) || target === 0) return;
        let current = 0;
        const increment = Math.max(1, target / 30);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, 50);
    });
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ===== 3D TILT EFFECT =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    const maxTilt = parseInt(card.getAttribute('data-tilt-max')) || 10;

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== ROADMAP TIMELINE PROGRESS =====
const roadmapSection = document.getElementById('roadmap');
const timelineProgress = document.getElementById('timeline-progress');

if (roadmapSection && timelineProgress) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate to first item height (25%)
                timelineProgress.style.height = '25%';
            }
        });
    }, { threshold: 0.2 });

    timelineObserver.observe(roadmapSection);
}

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link && !link.classList.contains('nav-cta')) {
            if (scrollY >= top && scrollY < top + height) {
                link.style.color = 'var(--accent-cyan)';
            } else {
                link.style.color = '';
            }
        }
    });
});

// ===== PARALLAX ON SCROLL for ORBS =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.orb').forEach((orb, i) => {
        const speed = 0.03 + (i * 0.015);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ===== CARD HOVER GLOW (mouse position based) =====
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.background = `
            radial-gradient(
                350px circle at var(--mouse-x) var(--mouse-y),
                rgba(139,92,246,0.06),
                transparent 70%
            ),
            var(--glass-bg)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

// ===== TEXT SCRAMBLE on section headers =====
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.frame = 0;
        this.queue = [];
        this.resolve = null;
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 20);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span style="color:var(--accent-purple);opacity:0.6">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete < this.queue.length) {
            this.frameRequest = requestAnimationFrame(() => this.update());
            this.frame++;
        }
    }
}

// Apply scramble to section headers on reveal
const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h2 = entry.target.querySelector('h2');
            if (h2 && !h2.dataset.scrambled) {
                h2.dataset.scrambled = 'true';
                const scrambler = new TextScramble(h2);
                const originalText = h2.textContent;
                scrambler.setText(originalText);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-header').forEach(header => {
    scrambleObserver.observe(header);
});

// ===== SMOOTH PARALLAX for PROFILE =====
const profileWrapper = document.querySelector('.profile-wrapper');
if (profileWrapper) {
    window.addEventListener('scroll', () => {
        const speed = 0.15;
        const yPos = -(window.scrollY * speed);
        profileWrapper.style.transform = `translateY(${yPos}px)`;
    });
}

console.log('⚡ TeamStarter v2.0 by Vivek Verma — Loaded with premium effects!');
