// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScroll();
    initFormHandling();
    initAnimations();
    initScrollObserver();
    initStatsCounter();
});

// Menu Mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }
}

// Gestion du Header au scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - document.querySelector('.header').offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Gestion du formulaire de contact avec WhatsApp
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('nom');
            const email = formData.get('email');
            const message = formData.get('message');
            
            const phoneNumber = '+237698712194';
            
            const whatsappMessage = `Bonjour Propulse,
Je suis ${name}.
Mon e-mail est : ${email}.
Mon message est le suivant :
"${message}"
`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }
}

// Initialiser les animations de la hero section
function initAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    setTimeout(() => {
        heroTitle.querySelectorAll('span').forEach(span => {
            span.style.opacity = '1';
        });
    }, 4000); // Après l'animation de typing
}

// Compteurs animés pour la section Statistiques
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = 50;

        const updateCount = () => {
            const increment = target / 100;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target;
            }
        };

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Observer pour animations on scroll
function initScrollObserver() {
    const sections = document.querySelectorAll('.animate-on-scroll');
    const cards = document.querySelectorAll('.about-card, .service-card, .portfolio-card, .stat-card, .testimonial-card, .team-card');

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Décalage pour chaque carte
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
    cards.forEach(card => cardObserver.observe(card));
}