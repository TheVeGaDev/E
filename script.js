// Enhanced Preloader with Advanced Animations
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    
    // Create floating particles in preloader
    createPreloaderParticles();
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            // Initialize advanced animations after preloader
            initAdvancedAnimations();
        }, 500);
    }, 2000);
});

// Advanced Particle System for Preloader
function createPreloaderParticles() {
    const preloader = document.querySelector('.preloader');
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: var(--secondary-color);
            border-radius: 50%;
            animation: preloaderFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        preloader.appendChild(particle);
    }
    
    // Add CSS for preloader particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes preloaderFloat {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize AOS with Enhanced Settings
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
    mirror: false
});

// Enhanced Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add ripple effect to menu toggle
        if (this.classList.contains('active')) {
            createRippleEffect(this, '#d4af37');
        }
    });
}

// Enhanced Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Smooth scroll with offset
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    // Add hover magnetic effect
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced Header Scroll Effect
let lastScrollY = window.scrollY;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollToTop = document.querySelector('.scroll-to-top');
    
    // Show/hide header based on scroll direction
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
    
    // Add scrolled class for background change
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        scrollToTop.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        scrollToTop.classList.remove('show');
    }
    
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Enhanced Progress Bar
window.addEventListener('scroll', function() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const winScroll = window.scrollY;
    const scrollPercent = (winScroll / (docHeight - winHeight)) * 100;
    const progressBar = document.getElementById('progressBar');
    
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
        
        // Add glow effect at certain scroll points
        if (scrollPercent > 50) {
            progressBar.style.animation = 'progressGlow 1s ease-in-out infinite';
        }
    }
});

// Enhanced Scroll to Top
const scrollToTopBtn = document.querySelector('.scroll-to-top');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        // Add bounce effect
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Form Handling with Advanced Effects
const serviceForm = document.getElementById('serviceForm');
if (serviceForm) {
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state to submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <div class="loading-spinner-advanced" style="width: 20px; height: 20px; margin-left: 10px;"></div>
            جاري الإرسال...
        `;
        submitBtn.disabled = true;
        
        // Get form data
        const name = serviceForm.querySelector('input[type="text"]').value;
        const phone = serviceForm.querySelector('input[type="tel"]').value;
        const service = serviceForm.querySelector('select').value;
        const message = serviceForm.querySelector('textarea').value;
        
        // Create WhatsApp message
        const whatsappMessage = `السلام عليكم\nأريد طلب خدمة نقل أثاث\nالاسم: ${name}\nرقم الهاتف: ${phone}\nالخدمة المطلوبة: ${service}\n${message ? `تفاصيل إضافية: ${message}` : ''}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Simulate API call delay
        setTimeout(() => {
            // Redirect to WhatsApp
            window.open(`https://wa.me/201116870575?text=${encodedMessage}`, '_blank');
            
            // Reset form
            serviceForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success effect
            showSuccessEffect();
        }, 2000);
    });
}

// Enhanced Success Effect
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
    
    // Add confetti particles
    createConfetti();
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

// Confetti Effect
function createConfetti() {
    const colors = ['#d4af37', '#ffd700', '#f4d03f', '#1e4620', '#2d5e31'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 2px;
            pointer-events: none;
            z-index: 10000;
            animation: confettiFall ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
    
    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translate(0, 0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, 100vh) rotate(${Math.random() * 360}deg) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Counter Animation for Stats
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
                
                // Add completion effect
                counter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 200);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Enhanced Testimonials Slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.opacity = '0';
        });
        
        // Show current testimonial
        setTimeout(() => {
            testimonials[index].classList.add('active');
            testimonials[index].style.opacity = '1';
        }, 300);
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
        
        // Add click effect to button
        if (nextBtn) {
            nextBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                nextBtn.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
        
        // Add click effect to button
        if (prevBtn) {
            prevBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                prevBtn.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
        
        // Add magnetic effects to nav buttons
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(nextTestimonial, 5000);
    }
}

// Enhanced Ripple Effect for Buttons
function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn, .nav-btn, .service-cta');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple element
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
        });
    });
}

// Enhanced Floating Elements
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.feature, .service-card, .gallery-item');
    
    floatingElements.forEach((element, index) => {
        // Add random floating animation
        element.style.animationDelay = `${index * 0.1}s`;
        
        // Add magnetic hover effect
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Advanced Background Particles
function initBackgroundParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-background';
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}vw;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.3 + 0.1};
            background: hsl(${Math.random() * 60 + 30}, 70%, 60%);
        `;
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Enhanced Image Loading Animation
function initImageAnimations() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'all 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Lazy loading effect
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    });
}

// Advanced Text Animations
function initTextAnimations() {
    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease both';
            }
        });
    }, { threshold: 0.3 });
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
    
    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid var(--secondary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    heroSubtitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing after preloader
        setTimeout(typeWriter, 2200);
    }
}

// Enhanced Notification Effects
function initNotificationEffects() {
    const badges = document.querySelectorAll('.notification-badge, .float-notification');
    
    badges.forEach(badge => {
        // Random pulse animation
        setInterval(() => {
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = '';
            }, 10);
        }, Math.random() * 5000 + 5000);
        
        // Add click effect
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Advanced Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .gallery-item, .process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Enhanced Cursor Effects (Optional)
function initCursorEffects() {
    // Only enable on desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--secondary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effects
        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .gallery-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.background = 'var(--secondary-color)';
                cursor.style.opacity = '0.5';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.background = 'transparent';
                cursor.style.opacity = '1';
            });
        });
    }
}

// Enhanced Form Interactions
function initFormInteractions() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.style.background = 'var(--white)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.style.background = '';
        });
        
        // Add input validation effects
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#4CAF50';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
    });
}

// Initialize All Advanced Animations
function initAdvancedAnimations() {
    initRippleEffects();
    initFloatingElements();
    initBackgroundParticles();
    initImageAnimations();
    initTextAnimations();
    initNotificationEffects();
    initScrollAnimations();
    initFormInteractions();
    
    // Optional: Enable cursor effects
    // initCursorEffects();
    
    console.log('🎯 Advanced animations initialized!');
}

// Enhanced DOM Ready
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
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
        
        .loading-spinner-advanced {
            width: 20px;
            height: 20px;
            border: 2px solid transparent;
            border-top: 2px solid var(--secondary-color);
            border-right: 2px solid var(--primary-color);
            border-radius: 50%;
            animation: spin-advanced 1s linear infinite;
        }
        
        @keyframes spin-advanced {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🚀 Website enhanced with advanced animations!');
});

// Enhanced Resize Handler
window.addEventListener('resize', function() {
    // Reinitialize particles on resize
    const particleContainer = document.querySelector('.particle-background');
    if (particleContainer) {
        particleContainer.innerHTML = '';
        initBackgroundParticles();
    }
});

// Enhanced Error Handling
window.addEventListener('error', function(e) {
    console.log('Animation error:', e.error);
});

// Performance Optimization
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});