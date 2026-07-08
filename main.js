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

    const battagliaBtn = document.getElementById('battaglia-btn');
    const battagliaModal = document.getElementById('battaglia-modal');
    const battagliaClose = document.getElementById('battaglia-close');
    const battagliaSlides = document.querySelectorAll('.battaglia-slide');
    let currentSlide = 0;

    if (battagliaBtn && battagliaModal) {
        battagliaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            battagliaModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            currentSlide = 0;
            showSlide(0);
        });

        battagliaClose.addEventListener('click', () => {
            battagliaModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        battagliaModal.addEventListener('click', (e) => {
            if (e.target === battagliaModal) {
                battagliaModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && battagliaModal.classList.contains('active')) {
                e.preventDefault();
                currentSlide = (currentSlide + 1) % battagliaSlides.length;
                showSlide(currentSlide);
            }
            if (e.code === 'Escape' && battagliaModal.classList.contains('active')) {
                battagliaModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        function showSlide(index) {
            battagliaSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }
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

    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (musicToggle && backgroundMusic) {
        const musicIcon = musicToggle.querySelector('.music-icon');
        
        let isPlaying = localStorage.getItem('musicPlaying');
        if (isPlaying === null) {
            isPlaying = 'true';
            localStorage.setItem('musicPlaying', 'true');
        } else {
            isPlaying = isPlaying === 'true';
        }
        
        const musicTime = parseFloat(localStorage.getItem('musicTime')) || 0;
        
        if (isPlaying) {
            backgroundMusic.currentTime = musicTime;
            musicToggle.classList.add('playing');
            musicIcon.textContent = '🔊';
            
            const startMusic = () => {
                backgroundMusic.play().then(() => {
                    console.log('Music started');
                }).catch(e => {
                    console.log('Autoplay prevented, waiting for user interaction');
                });
                document.removeEventListener('click', startMusic);
                document.removeEventListener('scroll', startMusic);
                document.removeEventListener('keydown', startMusic);
            };
            
            document.addEventListener('click', startMusic, { once: true });
            document.addEventListener('scroll', startMusic, { once: true });
            document.addEventListener('keydown', startMusic, { once: true });
        }
        
        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggle.classList.add('playing');
                musicIcon.textContent = '🔊';
                localStorage.setItem('musicPlaying', 'true');
            } else {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
                musicIcon.textContent = '🔇';
                localStorage.setItem('musicPlaying', 'false');
            }
        });
        
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicTime', backgroundMusic.currentTime);
        });
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
