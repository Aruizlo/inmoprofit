/*
  File: script.js
  Description: Controla la interactividad y las animaciones de la página de propuesta de inversión.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger the general reveal animation
                entry.target.classList.add('active');
                
                // Specific logic for animating the ROI chart
                if (entry.target.id === 'roi-chart-animator') {
                    animateRoiChart(entry.target);
                    // Unobserve after animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
                
                // Specific logic for animating counters
                if (entry.target.classList.contains('counter')) {
                     animateCounter(entry.target);
                     // Unobserve after animation
                     observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    // Observe elements with the 'reveal' class for fade-in animations
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Observe all counters to start their animation
    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });
    
    // Observe the ROI Chart animator element
    const roiChart = document.getElementById('roi-chart-animator');
    if (roiChart) {
        observer.observe(roiChart);
    }

    // --- Counter Animation Function ---
    function animateCounter(counterElement) {
        const target = +counterElement.getAttribute('data-target');
        const duration = 1500; // Animation duration in milliseconds (1.5 seconds)
        const stepTime = 20; // Time between each step
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                // Format the final number with separators for thousands
                counterElement.innerText = target.toLocaleString('es-ES');
            } else {
                // Update the text and format it during the animation
                counterElement.innerText = Math.ceil(current).toLocaleString('es-ES');
            }
        }, stepTime);
    }
    
    // --- ROI Chart Animation Function ---
    function animateRoiChart(chartElement) {
        const chartText = document.getElementById('roi-chart-text');
        if (!chartText) return;

        // CAMBIO: Porcentaje objetivo actualizado a 12 (el mínimo garantizado)
        const targetPercentage = 12; 
        let start = 0;
        const duration = 1500; // Animation duration in milliseconds
        const stepTime = 20; // Time between each step

        const timer = setInterval(() => {
            // Calculate the next step
            start += targetPercentage / (duration / stepTime);
             if (start >= targetPercentage) {
                clearInterval(timer);
                start = targetPercentage;
            }
            // Update the CSS custom property '--p' for the conic-gradient
            chartElement.style.setProperty('--p', Math.round(start));
            // Update the text inside the chart
            chartText.innerText = Math.round(start);

        }, stepTime);
    }
});
