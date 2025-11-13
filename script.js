// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const colors = ['#d4af37', '#1a3c1e', '#2d5e31', '#3a7a40'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        const size = Math.random() * 60 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = `radial-gradient(circle, ${color}, transparent)`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 20 + 10}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(element);
    }
}

// Initialize Three.js background
function initThreeBackground() {
    const container = document.getElementById('threeContainer');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xd4af37
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Magnetic button effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            gsap.to(this, {
                duration: 0.5,
                x: deltaX * 10,
                y: deltaY * 10,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.5,
                x: 0,
                y: 0,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    // Hero section animations
    gsap.from('.hero-badge', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "back.out(1.7)"
    });
    
    gsap.from('.hero-title .title-line', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.2,
        ease: "power3.out"
    });
    
    gsap.from('.hero-features .feature', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        delay: 1.5,
        ease: "power3.out"
    });
    
    gsap.from('.cta-buttons .btn', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        delay: 2,
        ease: "power3.out"
    });
    
    // Services section animations
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create floating elements
    createFloatingElements();
    
    // Initialize Three.js background
    initThreeBackground();
    
    // Initialize magnetic buttons
    initMagneticButtons();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize counters when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollToTop = document.querySelector('.scroll-to-top');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            scrollToTop.classList.remove('show');
        }
    });
    
    // Scroll to top
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form handling
const serviceForm = document.getElementById('serviceForm');
if (serviceForm) {
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = serviceForm.querySelector('input[type="text"]').value;
        const phone = serviceForm.querySelector('input[type="tel"]').value;
        const service = serviceForm.querySelector('select').value;
        const message = serviceForm.querySelector('textarea').value;
        
        // Create WhatsApp message
        const whatsappMessage = `السلام عليكم\nأريد طلب خدمة نقل أثاث\nالاسم: ${name}\nرقم الهاتف: ${phone}\nالخدمة المطلوبة: ${service}\n${message ? `تفاصيل إضافية: ${message}` : ''}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Redirect to WhatsApp
        window.open(`https://wa.me/201116870575?text=${encodedMessage}`, '_blank');
        
        // Reset form
        serviceForm.reset();
        
        // Show success effect
        showSuccessEffect();
    });
}

// Success effect function
function showSuccessEffect() {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, var(--secondary-color), transparent);
        border-radius: 50%;
        z-index: 10000;
        pointer-events: none;
        animation: successPulse 1s ease-out forwards;
    `;
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

// Add CSS for success effect
const style = document.createElement('style');
style.textContent = `
    @keyframes successPulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);