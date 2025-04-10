// Animation initialization
function initAnimations() {
    // Hero animation
    anime({
        targets: '#hero-content',
        opacity: [0, 1],
        translateY: [50, 0],
        easing: 'easeOutQuad',
        duration: 1000,
        delay: 300
    });
    
    // Animate elements with delay
    const animateElements = document.querySelectorAll('.animate-element');
    
    animateElements.forEach((el, index) => {
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : index * 100;
        
        anime({
            targets: el,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutQuad',
            duration: 800,
            delay: 500 + delay
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section-container');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}
