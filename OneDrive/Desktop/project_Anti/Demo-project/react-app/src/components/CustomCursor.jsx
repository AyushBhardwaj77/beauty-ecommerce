// src/components/CustomCursor.jsx
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const outlineRef = useRef(null);

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const dot = dotRef.current;
        const outline = outlineRef.current;

        const onMouseMove = (e) => {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 150, fill: 'forwards' });
        };

        const onEnter = () => document.body.classList.add('cursor-hover');
        const onLeave = () => document.body.classList.remove('cursor-hover');

        window.addEventListener('mousemove', onMouseMove);

        const interactables = document.querySelectorAll('a, button, .portfolio-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactables.forEach(el => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-200"
                style={{ backgroundColor: 'var(--text-primary)' }}
            />
            <div
                ref={outlineRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-200"
                style={{ borderColor: 'var(--text-secondary)' }}
            />
        </>
    );
}
