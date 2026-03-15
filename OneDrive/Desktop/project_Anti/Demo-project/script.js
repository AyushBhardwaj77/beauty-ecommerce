/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Precise Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.add('active');
                mobileMenuBtn.classList.add('open');
                document.body.style.overflow = 'hidden'; // disable scroll
            } else {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Smooth Advanced Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before the element enters the viewport
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger CSS transition
                entry.target.classList.add('visible');
                // Unobserve so it only happens once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade up elements (Text, headers, specific blocks)
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // Scale up elements (Images, cards)
    const scaleElements = document.querySelectorAll('.scale-up');
    scaleElements.forEach(el => observer.observe(el));

    // Staggered children animations (Portfolio grid, services grid)
    const staggeredContainers = document.querySelectorAll('.staggered-container');
    staggeredContainers.forEach(container => {
        const observerStagger = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        // Dynamically assign transition delay based on DOM order
                        child.style.transitionDelay = `${index * 0.1}s`;
                        child.classList.add('visible');
                    });
                    observerStagger.unobserve(entry.target);
                }
            });
        }, observerOptions);
        observerStagger.observe(container);
    });

    // 4. Subtle Parallax for Hero Background 
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                // Only trigger within the top portion of the site for performance
                if (scrolled < window.innerHeight) {
                    if (heroTitle) heroTitle.style.transform = `translateY(${scrolled * 0.1}px)`;
                    if (heroSubtitle) heroSubtitle.style.transform = `translateY(${scrolled * 0.15}px)`;
                    if (heroCta) heroCta.style.transform = `translateY(${scrolled * 0.2}px)`;

                    // Subtle fade out on scroll
                    const opacity = 1 - (scrolled / window.innerHeight * 1.5);
                    if (heroTitle) heroTitle.style.opacity = Math.max(0, opacity);
                    if (heroSubtitle) heroSubtitle.style.opacity = Math.max(0, opacity);
                    if (heroCta) heroCta.style.opacity = Math.max(0, opacity);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 5. Custom Interactive Cursor
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    // Only activate custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        // Add hover effects to interactable elements
        const interactables = document.querySelectorAll('a, button, .portfolio-item');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 6. Dark/Light Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'dark';

        if (!currentTheme || currentTheme === 'dark') {
            newTheme = 'light';
        }

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
