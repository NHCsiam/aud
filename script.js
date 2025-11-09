// Modern JavaScript for enhanced animations and interactivity
// Enhanced with GSAP for smooth, professional animations

// Create animated stars background - optimized
function createStars() {
    const starsContainer = document.querySelector('.stars-background');
    const numberOfStars = 50; // Reduced for better performance
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Create floating particles - optimized
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const colors = ['#ffb6c1', '#ff69b4', '#ffc0cb', '#ff1493', '#ff69b4'];
    const numberOfParticles = 25; // Reduced for better performance
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 6 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${particle.style.background}`;
        
        // Animate particle
        const duration = Math.random() * 10 + 10;
        const xMovement = (Math.random() - 0.5) * 200;
        const yMovement = (Math.random() - 0.5) * 200;
        
        particle.style.animation = `floatParticle ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    // Add keyframes for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.2);
                opacity: 0.6;
            }
            50% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(0.8);
                opacity: 0.4;
            }
            75% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.1);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add scroll animations using GSAP
function initScrollAnimations() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate cards on scroll
        gsap.utils.toArray('.message-card, .wish-card, .photo-placeholder').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.1
            });
        });
    }
}

// Add interactive hover effects - Enhanced with GSAP (Framer-like smoothness)
function addInteractiveEffects() {
    if (typeof gsap === 'undefined') return;
    
    // Enhanced smooth scroll animations for sections (Framer-like) - Fixed to show content
    const sections = document.querySelectorAll('.message-section, .memories-section, .wishes-section, .secret-section');
    sections.forEach((section, index) => {
        // Ensure sections are visible
        gsap.set(section, { opacity: 1, visibility: 'visible' });
        
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    });
    
    // Enhanced card animations with stagger effect - Fixed to show content
    const cards = document.querySelectorAll('.message-card, .wish-card-flip, .photo-card-flip');
    cards.forEach((card, index) => {
        // Ensure content is visible first - CRITICAL
        gsap.set(card, { 
            opacity: 1, 
            visibility: 'visible',
            display: 'flex' // Ensure flex display for proper layout
        });
        
        // Only animate if ScrollTrigger is available and element is not in viewport
        if (typeof ScrollTrigger !== 'undefined') {
            // Check if element is already in viewport
            const rect = card.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isInViewport) {
                // Only animate if not already visible
                gsap.from(card, {
                    opacity: 0,
                    scale: 0.9,
                    y: 30,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                        onEnter: () => {
                            gsap.set(card, { opacity: 1, visibility: 'visible' });
                        }
                    }
                });
            } else {
                // Already in viewport, just ensure it's visible
                gsap.set(card, { opacity: 1, visibility: 'visible' });
            }
        } else {
            // No ScrollTrigger - simple fade in
            gsap.from(card, {
                opacity: 0,
                scale: 0.9,
                y: 30,
                duration: 0.6,
                ease: 'back.out(1.7)',
                delay: index * 0.1,
                onComplete: () => {
                    gsap.set(card, { opacity: 1, visibility: 'visible' });
                }
            });
        }
    });
    
    // Flip card functionality for wish cards
    const wishFlipCards = document.querySelectorAll('.wish-card-flip');
    wishFlipCards.forEach((card) => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Flip card functionality for photo/memory cards
    const photoFlipCards = document.querySelectorAll('.photo-card-flip');
    photoFlipCards.forEach((card) => {
        // Ensure card starts unflipped
        card.classList.remove('flipped');
        
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Enhanced hover effects for message cards
    const otherCards = document.querySelectorAll('.message-card');
    otherCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
        
        card.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    scale: 1.05,
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Enhanced candle flame effect
function enhanceCandleFlame() {
    const candleFlames = document.querySelectorAll('.fuego');
    
    candleFlames.forEach((flame, index) => {
        // Add periodic brightness variation
        setInterval(() => {
            const brightness = Math.random() * 0.3 + 0.7;
            flame.style.filter = `brightness(${brightness})`;
        }, 100 + index * 50);
    });
}

// Position candle correctly relative to cake SVG
function positionCandle() {
    const cake = document.querySelector('#cake');
    const candleContainer = document.querySelector('.velas-container');
    const cakeContainer = document.querySelector('.cake-container');
    
    if (cake && candleContainer && cakeContainer) {
        const cakeRect = cake.getBoundingClientRect();
        const containerRect = cakeContainer.getBoundingClientRect();
        
        // Candle position in SVG viewBox: x=97.5, y=380
        // SVG viewBox: 0 0 200 500
        // SVG actual size: 200px × 500px
        const candleX = 97.5; // In viewBox coordinates (center is 100)
        const candleY = 380;  // In viewBox coordinates
        
        // Calculate relative position within SVG (0-1 range)
        const relX = candleX / 200; // 0.4875 (48.75% from left)
        const relY = candleY / 500; // 0.76 (76% from top)
        
        // Get actual SVG dimensions
        const svgActualWidth = cakeRect.width;
        const svgActualHeight = cakeRect.height;
        
        // Calculate pixel offset from SVG top-left
        const candleXOffset = relX * svgActualWidth; // Pixels from left of SVG
        const candleYOffset = relY * svgActualHeight; // Pixels from top of SVG
        
        // Calculate position relative to container
        const svgTopRelativeToContainer = cakeRect.top - containerRect.top;
        const svgLeftRelativeToContainer = cakeRect.left - containerRect.left;
        
        // Position candle container
        const candleTop = svgTopRelativeToContainer + candleYOffset;
        const candleLeft = svgLeftRelativeToContainer + candleXOffset - 2.5; // -2.5 to center 5px candle
        
        candleContainer.style.top = `${candleTop}px`;
        candleContainer.style.left = `${candleLeft}px`;
    }
}

// Add parallax effect to hero section
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Loading Screen Handler
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBar = document.getElementById('loadingBar');
    const body = document.body;
    
    if (!loadingScreen) return;
    
    // Add loading class to body
    body.classList.add('loading');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (loadingBar) {
            loadingBar.style.width = progress + '%';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Wait a bit then hide loading screen
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                body.classList.remove('loading');
                
                // Remove from DOM after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 800);
            }, 500);
        }
    }, 100);
}

// Initialize everything when DOM is loaded
(function() {
    'use strict';
    
    // Start loading screen immediately
    initLoadingScreen();
    
    function init() {
        console.log('=== INITIALIZING BIRTHDAY ANIMATIONS ===');
        
        // Verify containers exist FIRST
        const ribbonsContainer = document.querySelector('.falling-ribbons-container');
        const mouseContainer = document.querySelector('.mouse-follow-elements');
        
        console.log('Ribbons container found:', !!ribbonsContainer);
        console.log('Mouse container found:', !!mouseContainer);
        
        if (!ribbonsContainer) {
            console.error('❌ Falling ribbons container NOT FOUND in HTML!');
            console.error('Please check that <div class="falling-ribbons-container"></div> exists in HTML');
            return;
        }
        
        if (!mouseContainer) {
            console.error('❌ Mouse follow container NOT FOUND in HTML!');
            return;
        }
        
        console.log('✅ Containers found! Starting animations...');
        
        createStars();
        createParticles();
        createFallingRibbons();
        createMouseFollowElements();
        addInteractiveEffects();
        enhanceCandleFlame();
        initSecretSection();
        
        console.log('✅ All animations initialized!');
        
        // Position candle correctly after SVG is rendered
        positionCandle();
        setTimeout(() => positionCandle(), 100);
        setTimeout(() => positionCandle(), 500);
        setTimeout(() => positionCandle(), 1000);
        
        // Re-position candle on window resize and scroll
        window.addEventListener('resize', () => {
            positionCandle();
        });
        
        // Update position during cake animation
        window.addEventListener('scroll', () => {
            positionCandle();
        });
        
        // Initialize GSAP ScrollTrigger if available
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            script.onload = () => {
                gsap.registerPlugin(ScrollTrigger);
                initScrollAnimations();
            };
            document.head.appendChild(script);
        }
        
        // Add parallax on scroll
        addParallaxEffect();
        
        // Add sparkle effect to title on hover
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            mainTitle.addEventListener('mouseenter', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                }
            });
            
            mainTitle.addEventListener('mouseleave', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        }
        
        // Test: Create a visible test element to verify it works
        const testEl = document.createElement('div');
        testEl.style.cssText = `
            position: fixed !important;
            top: 100px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 50px !important;
            height: 50px !important;
            background: red !important;
            z-index: 99999 !important;
            border-radius: 50% !important;
            animation: testPulse 1s infinite !important;
        `;
        document.body.appendChild(testEl);
        
        // Remove test element after 3 seconds
        setTimeout(() => {
            testEl.remove();
            console.log('✅ Test element removed. If you saw a red circle, JavaScript works!');
        }, 3000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Add click confetti effect
function createConfetti(event) {
    const colors = ['#ffb6c1', '#ff69b4', '#ffc0cb', '#ff1493', '#ff69b4', '#fff'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = event.clientX + 'px';
        confetti.style.top = event.clientY + 'px';
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.opacity = '0.9';
        confetti.style.boxShadow = `0 0 10px ${confetti.style.background}`;
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        if (typeof gsap !== 'undefined') {
            gsap.to(confetti, {
                x: x * 50,
                y: y * 50,
                opacity: 0,
                scale: 0,
                duration: 1 + Math.random(),
                ease: 'power2.out',
                onComplete: () => confetti.remove()
            });
        } else {
            setTimeout(() => confetti.remove(), 1000);
        }
    }
}

// Add confetti on click for birthday wishes section
document.addEventListener('DOMContentLoaded', () => {
    const wishesSection = document.querySelector('.wishes-section');
    if (wishesSection) {
        wishesSection.addEventListener('click', createConfetti);
    }
});

// Secret Section Password Protection
function initSecretSection() {
    const SECRET_PASSWORD = "123";
    const lockScreen = document.getElementById('secretLock');
    const secretContent = document.getElementById('secretContent');
    const passwordInput = document.getElementById('secretPassword');
    const submitBtn = document.getElementById('secretSubmit');
    const lockBtn = document.getElementById('secretLockBtn');
    const errorMsg = document.getElementById('passwordError');
    
    if (!lockScreen || !secretContent || !passwordInput || !submitBtn) {
        console.error('Secret section elements not found');
        return;
    }
    
    // Unlock function
    function unlockSecret() {
        const password = passwordInput.value.trim();
        
        if (password === SECRET_PASSWORD) {
            // Correct password
            errorMsg.classList.remove('show');
            errorMsg.textContent = '';
            passwordInput.value = '';
            
            // Hide lock screen and show content
            lockScreen.style.display = 'none';
            secretContent.style.display = 'block';
            
            // Add confetti celebration - highly optimized
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const confettiCount = 12; // Reduced for better performance
            
            // Use requestAnimationFrame for smoother batch creation
            let created = 0;
            function createNextConfetti() {
                if (created >= confettiCount) return;
                
                const confetti = document.createElement('div');
                const color = ['#ffb6c1', '#ff69b4', '#ff1493', '#ffc0cb'][Math.floor(Math.random() * 4)];
                const size = Math.random() * 6 + 5;
                const angle = (Math.random() - 0.5) * Math.PI * 2;
                const distance = 120 + Math.random() * 80;
                const duration = 0.7 + Math.random() * 0.3;
                
                // Initial position
                const startX = centerX + (Math.random() - 0.5) * 200;
                const startY = centerY + (Math.random() - 0.5) * 200;
                const endX = startX + Math.cos(angle) * distance;
                const endY = startY + Math.sin(angle) * distance;
                
                confetti.style.cssText = `
                    position: fixed !important;
                    left: ${startX}px !important;
                    top: ${startY}px !important;
                    width: ${size}px !important;
                    height: ${size}px !important;
                    background: ${color} !important;
                    border-radius: 50% !important;
                    box-shadow: 0 0 6px ${color} !important;
                    pointer-events: none !important;
                    z-index: 10001 !important;
                    will-change: transform, opacity !important;
                    transform: translate3d(0, 0, 0) !important;
                    opacity: 1 !important;
                `;
                document.body.appendChild(confetti);
                
                // Force reflow before animation
                confetti.offsetHeight;
                
                // Animate with CSS transform (GPU accelerated)
                requestAnimationFrame(() => {
                    confetti.style.transition = `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}s ease-out`;
                    confetti.style.transform = `translate3d(${endX - startX}px, ${endY - startY}px, 0) rotate(${360 * Math.random()}deg)`;
                    confetti.style.opacity = '0';
                    
                    // Clean up after animation
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }, duration * 1000 + 50);
                });
                
                created++;
                
                // Create next confetti with slight delay
                if (created < confettiCount) {
                    requestAnimationFrame(() => {
                        setTimeout(createNextConfetti, 20);
                    });
                }
            }
            
            // Start creating confetti
            createNextConfetti();
            
            console.log('✅ Secret section unlocked!');
        } else {
            // Wrong password
            errorMsg.textContent = '❌ Incorrect password. Try again.';
            errorMsg.classList.add('show');
            passwordInput.value = '';
            passwordInput.focus();
            
            // Shake animation
            lockScreen.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                lockScreen.style.animation = '';
            }, 500);
        }
    }
    
    // Lock function
    function lockSecret() {
        lockScreen.style.display = 'block';
        secretContent.style.display = 'none';
        passwordInput.value = '';
        errorMsg.textContent = '';
        errorMsg.classList.remove('show');
    }
    
    // Submit button click
    submitBtn.addEventListener('click', unlockSecret);
    
    // Enter key press
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockSecret();
        }
    });
    
    // Lock button click
    if (lockBtn) {
        lockBtn.addEventListener('click', lockSecret);
    }
    
    console.log('🔒 Secret section initialized');
}

// Add shake animation for wrong password
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Create falling animations from top (confetti)
function createFallingRibbons() {
    const container = document.querySelector('.falling-ribbons-container');
    if (!container) {
        console.error('❌ Falling ribbons container not found!');
        return;
    }
    
    console.log('🎉 Creating falling animations...');
    
    // Force container styling - CRITICAL - BRING TO FRONT
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '9999'; // Very high z-index to be in front
    container.style.pointerEvents = 'none';
    container.style.overflow = 'visible';
    container.style.background = 'transparent';
    
    console.log('Container styled:', {
        position: container.style.position,
        width: container.style.width,
        height: container.style.height,
        zIndex: container.style.zIndex
    });
    
    // Create falling confetti - More visible
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'falling-confetti';
        
        const colors = ['#ffb6c1', '#ff69b4', '#ff1493', '#ffc0cb', '#ff91a4', '#ffd1dc'];
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 3; // 3-8 seconds (faster)
        const delay = Math.random() * 1;
        const size = Math.random() * 8 + 6; // Smaller for performance
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles optimized for performance
        confetti.style.cssText = `
            position: absolute !important;
            top: -30px !important;
            left: ${left}% !important;
            width: ${size}px !important;
            height: ${size}px !important;
            background: ${color} !important;
            border-radius: 50% !important;
            box-shadow: 0 0 10px ${color} !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            pointer-events: none !important;
            will-change: transform, opacity !important;
            transform: translate3d(0, 0, 0) !important;
            backface-visibility: hidden !important;
            animation: fallConfetti ${duration}s linear ${delay}s forwards !important;
        `;
        
        container.appendChild(confetti);
        
        // Log first few confetti to verify they're being created
        if (container.children.length <= 10) {
            console.log('✅ Confetti created:', {
                left: left + '%',
                size: size + 'px',
                color: color
            });
        }
        
        setTimeout(() => {
            if (confetti && confetti.parentNode) {
                confetti.remove();
            }
        }, (duration + delay + 0.5) * 1000);
    }
    
    
    // Start creating elements immediately
    console.log('🎉 Starting falling animations...');
    console.log('Container before start:', container);
    console.log('Container children count:', container.children.length);
    
    // Create initial batch - fewer for better performance
    createConfetti();
    createConfetti();
    createConfetti();
    
    console.log('Initial elements created. Container children count now:', container.children.length);
    
    // Create initial batch with delays (fewer elements)
    for (let i = 3; i < 15; i++) {
        setTimeout(() => createConfetti(), i * 200);
    }
    
    // Create confetti continuously (throttled for performance)
    let lastConfettiTime = 0;
    const confettiInterval = setInterval(() => {
        const now = Date.now();
        // Throttle to max 10 per second
        if (now - lastConfettiTime > 100 && container.children.length < 50) {
            createConfetti();
            lastConfettiTime = now;
        }
    }, 300);
    
    // Clean up old elements periodically to prevent memory leaks
    setInterval(() => {
        // Keep only visible elements (remove ones that have finished animation)
        const children = Array.from(container.children);
        children.forEach(child => {
            const rect = child.getBoundingClientRect();
            // Remove elements that are way off screen
            if (rect.top > window.innerHeight + 100 && rect.opacity === 0) {
                child.remove();
            }
        });
    }, 5000);
    
    console.log('✅ Falling animations started!');
}

// Mouse following elements
function createMouseFollowElements() {
    const container = document.querySelector('.mouse-follow-elements');
    if (!container) {
        console.error('Mouse follow elements container not found!');
        return;
    }
    
    // Force container styling - BRING TO FRONT
    container.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: 10000 !important;
        pointer-events: none !important;
        overflow: hidden !important;
        background: transparent !important;
    `;
    
    let mouseX = 0;
    let mouseY = 0;
    let trailingElements = [];
    let lastTime = Date.now();
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createTrailingElement(e.clientX, e.clientY);
    });
    
    // Create trailing elements - optimized
    let sparkleCount = 0;
    function createTrailingElement(x, y) {
        // Limit creation rate more aggressively
        const now = Date.now();
        if (now - lastTime < 100) return; // Max 10 per second
        lastTime = now;
        
        // Limit total sparkles on screen
        if (sparkleCount > 20) return;
        
        // Create sparkle less frequently
        if (Math.random() > 0.5) {
            sparkleCount++;
            const sparkle = document.createElement('div');
            sparkle.className = 'mouse-sparkle';
            
            const colors = ['#ffb6c1', '#ff69b4', '#ff1493', '#ffc0cb'];
            const size = Math.random() * 4 + 4;
            
            sparkle.style.cssText = `
                position: absolute !important;
                left: ${x}px !important;
                top: ${y}px !important;
                width: ${size}px !important;
                height: ${size}px !important;
                background: ${colors[Math.floor(Math.random() * colors.length)]} !important;
                border-radius: 50% !important;
                box-shadow: 0 0 10px currentColor !important;
                pointer-events: none !important;
                will-change: transform, opacity !important;
                transform: translate3d(0, 0, 0) !important;
                z-index: 10000 !important;
            `;
            
            container.appendChild(sparkle);
            
            if (typeof gsap !== 'undefined') {
                gsap.to(sparkle, {
                    x: (Math.random() - 0.5) * 30,
                    y: (Math.random() - 0.5) * 30,
                    opacity: 0,
                    scale: 0,
                    duration: 0.8 + Math.random() * 0.4,
                    ease: 'power2.out',
                    onComplete: () => {
                        sparkle.remove();
                        sparkleCount--;
                    }
                });
            } else {
                setTimeout(() => {
                    sparkle.remove();
                    sparkleCount--;
                }, 1000);
            }
        }
    }
    
    // Disable balloons for better performance - too resource intensive
    // Create floating balloons that follow mouse
    // function createFollowingBalloon() {
    //     // Disabled for performance
    // }
    
    // Create balloons periodically - disabled for performance
    // setInterval(() => {
    //     if (Math.random() > 0.8) {
    //         createFollowingBalloon();
    //     }
    // }, 2000);
}

