// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add typing effect to hero tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid #58A6FF';
        
        let i = 0;
        const typeSpeed = 50;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing effect after hero animation
        setTimeout(typeWriter, 1000);
    }
    
    // Performance optimization: Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Add subtle parallax effect to hero background
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-bg-animation');
            
            if (heroBackground && scrolled < window.innerHeight) {
                const rate = scrolled * -0.3;
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        }, 10);
    });
    
    // Add hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item, .cs-tag, .tech-tag');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click-to-copy functionality for email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary notification
                    showNotification('Email copied to clipboard!');
                });
            }
        });
    });
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #58A6FF;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2500);
    }
    
    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Preload resume PDF for faster download
    const resumeLink = document.querySelector('a[href="Payas_Resume.pdf"]');
    if (resumeLink) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'Payas_Resume.pdf';
        document.head.appendChild(link);
    }
    
    // Performance: Reduce animations on slower devices
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    if (isSlowDevice) {
        document.body.classList.add('reduced-motion');
        
        // Add CSS for reduced motion
        const reducedMotionStyle = document.createElement('style');
        reducedMotionStyle.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(reducedMotionStyle);
    }
    
    // Platform logo hover effect
    const platformLogos = document.querySelectorAll('.platform-logo');
    platformLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 25px rgba(88, 166, 255, 0.5)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
});