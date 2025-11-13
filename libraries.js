// Advanced Particle System
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            color: options.color || '#d4af37',
            size: options.size || { min: 1, max: 3 },
            speed: options.speed || { min: 0.5, max: 2 },
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.handleResize());
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.handleResize();
    }
    
    handleResize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * (this.options.size.max - this.options.size.min) + this.options.size.min,
                speedX: (Math.random() - 0.5) * (Math.random() * (this.options.speed.max - this.options.speed.min) + this.options.speed.min),
                speedY: (Math.random() - 0.5) * (Math.random() * (this.options.speed.max - this.options.speed.min) + this.options.speed.min),
                color: this.options.color,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${this.hexToRgb(particle.color)}, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(${this.hexToRgb(this.options.color)}, ${0.1 * (1 - distance/100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
            : '212, 175, 55';
    }
}

// Magnetic Cursor
class MagneticCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.init();
    }
    
    init() {
        this.cursor.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--secondary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(this.cursor);
        
        document.addEventListener('mousemove', (e) => this.moveCursor(e));
        document.addEventListener('mousedown', () => this.cursor.classList.add('active'));
        document.addEventListener('mouseup', () => this.cursor.classList.remove('active'));
    }
    
    moveCursor(e) {
        this.cursor.style.left = `${e.clientX - 20}px`;
        this.cursor.style.top = `${e.clientY - 20}px`;
    }
}

// Scroll Animations Manager
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }
    
    init() {
        this.observeElements();
    }
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        document.querySelectorAll('[data-scroll-animation]').forEach(element => {
            observer.observe(element);
        });
    }
    
    animateElement(element) {
        const animation = element.dataset.scrollAnimation;
        element.classList.add(`animate-${animation}`);
        
        // Remove animation class after completion for re-triggering
        setTimeout(() => {
            element.classList.remove(`animate-${animation}`);
        }, 1000);
    }
}

// Initialize all advanced features
function initAdvancedFeatures() {
    // Initialize particle systems
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        new ParticleSystem(heroSection, {
            count: 30,
            color: '#d4af37',
            size: { min: 1, max: 3 },
            speed: { min: 0.5, max: 1.5 }
        });
    }
    
    // Initialize magnetic cursor (optional)
    // new MagneticCursor();
    
    // Initialize scroll animations
    new ScrollAnimations();
}

// Export for use in other files
window.ParticleSystem = ParticleSystem;
window.MagneticCursor = MagneticCursor;
window.ScrollAnimations = ScrollAnimations;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAdvancedFeatures);