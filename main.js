document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const pageTransition = document.getElementById('pageTransition');
    
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }

    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const pageName = currentPage === 'index' ? 'home' : currentPage;
    fetch(`/api/visit/${pageName}`, { method: 'POST' }).catch(err => console.log('Visit tracking failed'));

    // Scroll indicator click
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const previewSection = document.querySelector('.preview-section');
            if (previewSection) {
                previewSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Page transition for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            if (href && href.endsWith('.html') && href !== currentPage) {
                e.preventDefault();
                
                if (pageTransition) {
                    pageTransition.classList.add('active');
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                } else {
                    window.location.href = href;
                }
            }
        });
    });

    // Fade in transition when page loads
    if (pageTransition) {
        pageTransition.classList.remove('active');
    }

    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    const battagliaBtn = document.getElementById('battaglia-btn');
    const battagliaModal = document.getElementById('battaglia-modal');
    const battagliaClose = document.getElementById('battaglia-close');
    const battagliaSlides = document.querySelectorAll('.battaglia-slide');
    let currentSlide = 0;
    
    // Create epic battle audio
    let epicBattleAudio = null;
    let battitomorteAudio = null;
    if (battagliaModal) {
        epicBattleAudio = new Audio('epicbattle.mp3');
        epicBattleAudio.volume = 0.7;
        epicBattleAudio.loop = true;
        battitomorteAudio = new Audio('battitomorte.mp3');
        battitomorteAudio.volume = 0.7;
        battitomorteAudio.loop = true;
    }

    if (battagliaBtn && battagliaModal) {
        battagliaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            battagliaModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            currentSlide = 0;
            showSlide(0);
            
            // Pause background music when opening modal
            const bgMusic = document.getElementById('backgroundMusic');
            if (bgMusic && !bgMusic.paused) {
                bgMusic.pause();
            }
        });

        battagliaClose.addEventListener('click', () => {
            battagliaModal.classList.remove('active');
            document.body.style.overflow = '';
            if (epicBattleAudio) {
                epicBattleAudio.pause();
                epicBattleAudio.currentTime = 0;
            }
            if (battitomorteAudio) {
                battitomorteAudio.pause();
                battitomorteAudio.currentTime = 0;
            }
            
            // Resume background music when closing modal
            const bgMusic = document.getElementById('backgroundMusic');
            const musicState = localStorage.getItem('musicPlaying');
            if (bgMusic && musicState === 'true') {
                bgMusic.play().catch(e => console.log('Resume music failed'));
            }
        });

        battagliaModal.addEventListener('click', (e) => {
            if (e.target === battagliaModal) {
                battagliaModal.classList.remove('active');
                document.body.style.overflow = '';
                if (epicBattleAudio) {
                    epicBattleAudio.pause();
                    epicBattleAudio.currentTime = 0;
                }
                if (battitomorteAudio) {
                    battitomorteAudio.pause();
                    battitomorteAudio.currentTime = 0;
                }
                
                // Resume background music when closing modal
                const bgMusic = document.getElementById('backgroundMusic');
                const musicState = localStorage.getItem('musicPlaying');
                if (bgMusic && musicState === 'true') {
                    bgMusic.play().catch(e => console.log('Resume music failed'));
                }
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
                if (epicBattleAudio) {
                    epicBattleAudio.pause();
                    epicBattleAudio.currentTime = 0;
                }
                if (battitomorteAudio) {
                    battitomorteAudio.pause();
                    battitomorteAudio.currentTime = 0;
                }
                
                // Resume background music when closing modal
                const bgMusic = document.getElementById('backgroundMusic');
                const musicState = localStorage.getItem('musicPlaying');
                if (bgMusic && musicState === 'true') {
                    bgMusic.play().catch(e => console.log('Resume music failed'));
                }
            }
        });

        function showSlide(index) {
            battagliaSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                    
                    // Stop all battle music first
                    if (epicBattleAudio) {
                        epicBattleAudio.pause();
                        epicBattleAudio.currentTime = 0;
                    }
                    if (battitomorteAudio) {
                        battitomorteAudio.pause();
                        battitomorteAudio.currentTime = 0;
                    }
                    
                    // Play epic battle music for first 3 slides (0, 1, 2)
                    if (index < 3 && epicBattleAudio) {
                        epicBattleAudio.currentTime = 12;
                        epicBattleAudio.play().catch(e => {
                            console.log('Audio play prevented:', e);
                        });
                    }
                    // Play battitomorte music for slide 3 (file.jpg)
                    else if (index === 3 && battitomorteAudio) {
                        battitomorteAudio.currentTime = 0;
                        battitomorteAudio.play().catch(e => {
                            console.log('Audio play prevented:', e);
                        });
                    }
                }
            });
        }
    }

    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 8 + 12) + 's';
            
            const size = Math.random() * 8 + 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
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
