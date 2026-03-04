// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        const isExpanded = navLinks.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Scroll to section with offset for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                    item.setAttribute('aria-current', 'page');
                } else {
                    item.removeAttribute('aria-current');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// SCROLL TO TOP ON PAGE LOAD
// ========================================
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ========================================
// KEYBOARD NAVIGATION IMPROVEMENTS
// ========================================
// Trap focus in mobile menu when open
document.addEventListener('keydown', (e) => {
    if (navLinks.classList.contains('active') && e.key === 'Escape') {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
    }
});

// ========================================
// EXTERNAL LINK HANDLING
// ========================================
// Add visual indicator and aria-label for external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Skip if it's an internal link
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        // Add screen reader text for external links
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = ' (opens in new tab)';
        link.appendChild(srText);
    }
});


// ========================================
// PERFORMANCE: LAZY LOAD IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}