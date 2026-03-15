// src/hooks/useScrollAnimation.js
import { useEffect } from 'react';

export function useScrollAnimation() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute('data-visible', 'true');
                    if (entry.target.classList.contains('staggered-container')) {
                        const items = entry.target.querySelectorAll('.stagger-item');
                        items.forEach((item, index) => {
                            item.style.transitionDelay = `${index * 0.1}s`;
                            item.setAttribute('data-visible', 'true');
                        });
                    }
                }
            });
        }, observerOptions);

        const scan = () => {
            const elements = document.querySelectorAll('.fade-up, .scale-up, .staggered-container');
            elements.forEach(el => {
                if (!el.dataset.observed) {
                    observer.observe(el);
                    el.dataset.observed = 'true';
                }
            });
        };

        // Initial scan
        scan();

        // Re-scan when DOM changes (e.g. data is loaded)
        const mutationObserver = new MutationObserver(scan);
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);
}
