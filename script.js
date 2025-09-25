// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Event Cards Hover Effect
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Dynamic Event Date Display
function updateEventDates() {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = new Date();

    // Thursday Live Music
    const thursday = new Date();
    const daysUntilThursday = (4 - today.getDay() + 7) % 7 || 7;
    thursday.setDate(today.getDate() + daysUntilThursday);

    // Update dynamic dates if needed
    const thursdayCard = document.querySelector('.event-card:nth-child(1) .date');
    if (thursdayCard && !thursdayCard.textContent.includes('Weekly')) {
        thursdayCard.textContent = `${thursday.getDate()}/${thursday.getMonth() + 1}`;
    }
}

// Call on load
updateEventDates();

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.logo-svg, .tagline');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic Noise Effect
function createNoiseEffect() {
    const noiseOverlay = document.querySelector('.noise-overlay');
    if (noiseOverlay) {
        let opacity = 0.03;
        setInterval(() => {
            opacity = 0.02 + Math.random() * 0.02;
            noiseOverlay.style.opacity = opacity;
        }, 100);
    }
}

createNoiseEffect();

// Logo Animation on Load
window.addEventListener('load', () => {
    const logoText = document.querySelector('.logo-text');
    const logoCircles = document.querySelectorAll('.logo-circle');

    if (logoText) {
        logoText.style.opacity = '0';
        logoText.style.transform = 'scale(0.8)';
        setTimeout(() => {
            logoText.style.transition = 'all 1s ease';
            logoText.style.opacity = '1';
            logoText.style.transform = 'scale(1)';
        }, 300);
    }

    logoCircles.forEach((circle, index) => {
        circle.style.opacity = '0';
        setTimeout(() => {
            circle.style.transition = 'all 0.8s ease';
            circle.style.opacity = '1';
        }, 500 + index * 200);
    });
});

// Event List Dynamic Loading Effect
function animateEventList() {
    const events = document.querySelectorAll('.event-card');
    events.forEach((event, index) => {
        event.style.opacity = '0';
        event.style.transform = 'translateX(-20px)';

        setTimeout(() => {
            event.style.transition = 'all 0.6s ease';
            event.style.opacity = '1';
            event.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// Trigger when events section is visible
const eventsSection = document.querySelector('.events');
const eventsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateEventList();
            eventsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (eventsSection) {
    eventsObserver.observe(eventsSection);
}

// Interactive SVG Elements
document.querySelectorAll('.event-graphic').forEach(svg => {
    svg.addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.2); opacity: 0.6; }
        100% { transform: scale(1); opacity: 0.3; }
    }
`;
document.head.appendChild(style);