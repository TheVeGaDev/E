// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initThreeJS();
    initNavigation();
    initScrollEffects();
    initCounters();
    initServiceCards();
    initAnimations();
    initFloatingButtons();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Simulate loading
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
}

// Three.js Background
function initThreeJS() {
    const container = document.getElementById('threejs-background');
    
    // Check if WebGL is supported
    if (!window.WebGLRenderingContext) {
        container.innerHTML = '<div class="absolute inset-0 gradient-bg"></div>';
        return;
    }

    try {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
            colorArray[i] = Math.random();
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

    } catch (error) {
        console.log('Three.js not supported, using fallback background');
        container.innerHTML = '<div class="absolute inset-0 gradient-bg"></div>';
    }
}

// Navigation
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.style.transform = 'translateX(0)';
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.style.transform = 'translateX(100%)';
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.transform = 'translateX(100%)';
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // GSAP ScrollTrigger animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero-title', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-badge', {
        duration: 1,
        scale: 0,
        rotation: 360,
        ease: 'back.out(1.7)',
        delay: 0.5
    });

    // Service cards animation
    gsap.from('.service-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#services',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Stat cards animation
    gsap.from('.stat-card', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.hero-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Service Cards Interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceBtns = document.querySelectorAll('.service-btn');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    serviceBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.closest('.service-card').querySelector('h3').textContent;
            const message = `أريد طلب خدمة: ${service}`;
            const whatsappUrl = `https://wa.me/201116870575?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Additional Animations
function initAnimations() {
    // Logo animation
    const logo = document.querySelector('.logo-icon');
    setInterval(() => {
        logo.style.transform = 'scale(1.1)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
        }, 300);
    }, 3000);

    // Floating buttons animation
    const floatBtns = document.querySelectorAll('.whatsapp-btn, .call-btn');
    floatBtns.forEach((btn, index) => {
        btn.style.animationDelay = `${index * 0.5}s`;
    });
}

// Floating Buttons
function initFloatingButtons() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const callBtn = document.querySelector('.call-btn');

    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://wa.me/201116870575', '_blank');
    });

    callBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'tel:01116870575';
    });
}

// CTA Button Interactions
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Handle click based on button type
        if (this.classList.contains('bg-yellow-500')) {
            window.location.href = 'tel:01116870575';
        } else if (this.classList.contains('bg-green-600')) {
            window.open('https://wa.me/201116870575', '_blank');
        }
    });
});

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization
window.addEventListener('load', function() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.log('Error occurred:', e.error);
});