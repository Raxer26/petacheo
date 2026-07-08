document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = 100;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 6 + 8) + 's';
            
            const size = Math.random() * 6 + 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            const opacity = Math.random() * 0.4 + 0.6;
            particle.dataset.baseOpacity = opacity;
            
            particlesContainer.appendChild(particle);
        }
    }

    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const nav = document.querySelector('.nav');
    
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(5, 5, 8, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 15, 0.9)';
            }
        });
    }

    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = (index * 0.2) + 's';
    });

    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.15) + 's';
    });

    const teamSections = document.querySelectorAll('.team-section');
    
    teamSections.forEach((section, index) => {
        section.style.transitionDelay = (index * 0.2) + 's';
    });

    const previewCards = document.querySelectorAll('.preview-card');
    
    previewCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.15) + 's';
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
