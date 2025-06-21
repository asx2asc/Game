// Death by Coconuts - Enhanced Animations Module

// Coconut falling animation
function createCoconutFallAnimation(targetSpace) {
    const coconut = document.createElement('div');
    coconut.className = 'falling-coconut-animated';
    
    // Get target space position
    const spaceElement = document.getElementById(`space-${targetSpace}`);
    if (!spaceElement) return;
    
    const rect = spaceElement.getBoundingClientRect();
    const gameContainer = document.getElementById('game-container');
    const containerRect = gameContainer.getBoundingClientRect();
    
    // Set initial position above the game board
    coconut.style.left = (rect.left - containerRect.left + rect.width / 2 - 30) + 'px';
    coconut.style.top = '-60px';
    
    // Add coconut SVG content
    coconut.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60">
            <defs>
                <radialGradient id="coconutGrad">
                    <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
                </radialGradient>
            </defs>
            <ellipse cx="30" cy="30" rx="25" ry="28" fill="url(#coconutGrad)"/>
            <path d="M15 20 Q30 25 45 20" stroke="#654321" stroke-width="2" fill="none"/>
            <path d="M10 35 Q30 40 50 35" stroke="#654321" stroke-width="2" fill="none"/>
            <circle cx="20" cy="25" r="3" fill="#2C1810"/>
            <circle cx="40" cy="25" r="3" fill="#2C1810"/>
            <circle cx="30" cy="35" r="3" fill="#2C1810"/>
        </svg>
    `;
    
    gameContainer.appendChild(coconut);
    
    // Animate the fall
    const targetY = rect.top - containerRect.top + rect.height / 2 - 30;
    
    coconut.animate([
        { 
            transform: 'translateY(0) rotate(0deg) scale(0.5)', 
            opacity: 0 
        },
        { 
            transform: 'translateY(50px) rotate(180deg) scale(1)', 
            opacity: 1,
            offset: 0.1
        },
        { 
            transform: `translateY(${targetY}px) rotate(720deg) scale(1)`, 
            opacity: 1,
            offset: 0.9
        },
        { 
            transform: `translateY(${targetY}px) rotate(720deg) scale(1.2)`, 
            opacity: 0
        }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        coconut.remove();
        // Create impact effect
        createImpactEffect(rect.left - containerRect.left + rect.width / 2, 
                          rect.top - containerRect.top + rect.height / 2);
    };
}

// Impact effect for when coconut hits
function createImpactEffect(x, y) {
    const impact = document.createElement('div');
    impact.className = 'impact-effect';
    impact.style.left = x + 'px';
    impact.style.top = y + 'px';
    
    const gameContainer = document.getElementById('game-container');
    gameContainer.appendChild(impact);
    
    // Create star burst pattern
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'impact-particle';
        const angle = (i * 45) * Math.PI / 180;
        const distance = 30 + Math.random() * 20;
        
        particle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
        
        impact.appendChild(particle);
    }
    
    setTimeout(() => impact.remove(), 1000);
}

// Volcano eruption animation
function createVolcanoEruption() {
    const volcano = document.getElementById('volcano-feature');
    if (!volcano) return;
    
    volcano.classList.add('erupting');
    
    // Create lava particles
    const lavaContainer = document.createElement('div');
    lavaContainer.className = 'lava-eruption-container';
    volcano.appendChild(lavaContainer);
    
    // Generate multiple lava particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const lava = document.createElement('div');
            lava.className = 'lava-particle';
            
            // Random trajectory
            const angle = -90 + (Math.random() - 0.5) * 60; // -120 to -60 degrees
            const velocity = 200 + Math.random() * 100;
            const size = 10 + Math.random() * 15;
            
            lava.style.width = size + 'px';
            lava.style.height = size + 'px';
            lava.style.setProperty('--angle', angle + 'deg');
            lava.style.setProperty('--velocity', velocity + 'px');
            
            lavaContainer.appendChild(lava);
            
            // Remove after animation
            setTimeout(() => lava.remove(), 3000);
        }, i * 100);
    }
    
    // Add smoke effect
    createVolcanoSmoke();
    
    // Remove erupting class after animation
    setTimeout(() => {
        volcano.classList.remove('erupting');
        lavaContainer.remove();
    }, 4000);
}

// Volcano smoke effect
function createVolcanoSmoke() {
    const volcano = document.getElementById('volcano-feature');
    const smokeContainer = document.createElement('div');
    smokeContainer.className = 'volcano-smoke-container';
    volcano.appendChild(smokeContainer);
    
    for (let i = 0; i < 5; i++) {
        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        smoke.style.animationDelay = (i * 0.2) + 's';
        smokeContainer.appendChild(smoke);
    }
    
    setTimeout(() => smokeContainer.remove(), 5000);
}

// Player movement animation
function animatePlayerMovement(playerId, fromSpace, toSpace, callback) {
    const playerMarker = document.getElementById(playerId);
    if (!playerMarker) return;
    
    const path = calculatePath(fromSpace, toSpace);
    let currentStep = 0;
    
    function moveToNextSpace() {
        if (currentStep >= path.length) {
            if (callback) callback();
            return;
        }
        
        const targetSpace = document.getElementById(`space-${path[currentStep]}`);
        if (targetSpace) {
            const rect = targetSpace.getBoundingClientRect();
            const containerRect = document.getElementById('game-container').getBoundingClientRect();
            
            playerMarker.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            playerMarker.style.left = (rect.left - containerRect.left + rect.width / 2 - 15) + 'px';
            playerMarker.style.top = (rect.top - containerRect.top + rect.height / 2 - 15) + 'px';
            
            // Add bounce effect
            playerMarker.classList.add('bouncing');
            setTimeout(() => playerMarker.classList.remove('bouncing'), 300);
        }
        
        currentStep++;
        setTimeout(moveToNextSpace, 350);
    }
    
    moveToNextSpace();
}

// Calculate path between spaces
function calculatePath(from, to) {
    const path = [];
    const step = from < to ? 1 : -1;
    
    for (let i = from + step; step > 0 ? i <= to : i >= to; i += step) {
        path.push(i);
    }
    
    return path;
}

// Danger space activation animation
function activateDangerSpace(spaceNum, dangerType) {
    const space = document.getElementById(`space-${spaceNum}`);
    if (!space) return;
    
    space.classList.add('danger-activated');
    
    // Create danger-specific animation
    switch(dangerType) {
        case 'COCONUT_FALL':
        case 'COCONUT_STORM':
            createCoconutFallAnimation(spaceNum);
            break;
        case 'SLIP':
            createSlipAnimation(space);
            break;
        case 'CRAB_ATTACK':
            createCrabAnimation(space);
            break;
        case 'QUICKSAND':
            createQuicksandAnimation(space);
            break;
        case 'VOLCANO_RUMBLE':
        case 'LAVA_SPLASH':
            createVolcanoRumbleAnimation();
            break;
    }
    
    setTimeout(() => space.classList.remove('danger-activated'), 2000);
}

// Slip animation
function createSlipAnimation(spaceElement) {
    const banana = document.createElement('div');
    banana.className = 'banana-peel-animation';
    banana.innerHTML = '🍌';
    
    const rect = spaceElement.getBoundingClientRect();
    const containerRect = document.getElementById('game-container').getBoundingClientRect();
    
    banana.style.left = (rect.left - containerRect.left + rect.width / 2 - 20) + 'px';
    banana.style.top = (rect.top - containerRect.top + rect.height / 2 - 20) + 'px';
    
    document.getElementById('game-container').appendChild(banana);
    
    banana.animate([
        { transform: 'rotate(0deg) scale(1)', opacity: 1 },
        { transform: 'rotate(360deg) scale(1.5)', opacity: 0.5 },
        { transform: 'rotate(720deg) scale(0)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => banana.remove();
}

// Crab animation
function createCrabAnimation(spaceElement) {
    const crab = document.createElement('div');
    crab.className = 'crab-animation';
    crab.innerHTML = '🦀';
    
    const rect = spaceElement.getBoundingClientRect();
    const containerRect = document.getElementById('game-container').getBoundingClientRect();
    
    crab.style.left = (rect.left - containerRect.left - 40) + 'px';
    crab.style.top = (rect.top - containerRect.top + rect.height / 2 - 20) + 'px';
    
    document.getElementById('game-container').appendChild(crab);
    
    crab.animate([
        { transform: 'translateX(0) scaleX(1)' },
        { transform: 'translateX(80px) scaleX(1)' },
        { transform: 'translateX(80px) scaleX(-1)' },
        { transform: 'translateX(0) scaleX(-1)' },
        { transform: 'translateX(0) scaleX(1)' }
    ], {
        duration: 1500,
        easing: 'ease-in-out'
    }).onfinish = () => crab.remove();
}

// Quicksand animation
function createQuicksandAnimation(spaceElement) {
    spaceElement.classList.add('quicksand-active');
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'quicksand-ripple';
    spaceElement.appendChild(ripple);
    
    setTimeout(() => {
        spaceElement.classList.remove('quicksand-active');
        ripple.remove();
    }, 2000);
}

// Volcano rumble animation
function createVolcanoRumbleAnimation() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.add('shaking');
    
    // Create screen shake
    setTimeout(() => gameContainer.classList.remove('shaking'), 1000);
    
    // Add some lava particles from volcano
    const volcano = document.getElementById('volcano-feature');
    if (volcano) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.className = 'volcano-spark';
                volcano.appendChild(spark);
                setTimeout(() => spark.remove(), 1000);
            }, i * 100);
        }
    }
}

// Victory celebration animation
function createVictoryCelebration() {
    // Create confetti
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-celebration';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
        confettiContainer.appendChild(confetti);
    }
    
    // Volcano celebration eruption
    createVolcanoEruption();
    
    // Remove confetti after animation
    setTimeout(() => confettiContainer.remove(), 6000);
}

// Export functions for use in main game
window.GameAnimations = {
    coconutFall: createCoconutFallAnimation,
    volcanoEruption: createVolcanoEruption,
    playerMovement: animatePlayerMovement,
    dangerActivation: activateDangerSpace,
    victoryCelebration: createVictoryCelebration
};
