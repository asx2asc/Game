// Track System Functions for Death by Coconuts

// Generate track spaces dynamically
function generateGameTrack() {
    console.log('generateGameTrack called!');
    const trackContainer = document.getElementById('game-track');
    const pathSvg = document.getElementById('track-path-svg');
    
    console.log('Track container:', trackContainer);
    console.log('Path SVG:', pathSvg);
    console.log('Track container exists:', !!trackContainer);
    console.log('Path SVG exists:', !!pathSvg);
    
    if (!trackContainer || !pathSvg) {
        console.error('Track containers not found!');
        console.error('trackContainer:', trackContainer);
        console.error('pathSvg:', pathSvg);
        return;
    }
    
    // Clear existing content
    trackContainer.innerHTML = '';
    pathSvg.innerHTML = '';
    
    // Create track spaces based on coordinates
    console.log('Creating', stonesOfFateCoordinates.length, 'track spaces from coordinates');
    stonesOfFateCoordinates.forEach((coord, index) => {
        const spaceNum = index + 1;
        const space = document.createElement('div');
        space.className = 'track-space';
        space.id = `space-${spaceNum}`;
        space.dataset.space = spaceNum;
        
        // Position the space
        space.style.left = coord.x + 'px';
        space.style.top = coord.y + 'px';
        // Add animation delay based on space index
        space.style.setProperty('--space-index', index);
        
        // Add space number
        const numberSpan = document.createElement('span');
        numberSpan.className = 'space-number';
        numberSpan.textContent = spaceNum;
        space.appendChild(numberSpan);
        
        // Check if it's a danger space
        if (dangerSpaces[spaceNum]) {
            space.classList.add('danger-space');
            const dangerIcon = document.createElement('div');
            dangerIcon.className = 'danger-icon';
            
            // Set appropriate icon class based on danger type
            switch(dangerSpaces[spaceNum].type) {
                case 'COCONUT_FALL':
                case 'COCONUT_STORM':
                    dangerIcon.classList.add('coconut-icon');
                    dangerIcon.innerHTML = '🥥';
                    break;
                case 'SLIP':
                    dangerIcon.classList.add('slip-icon');
                    dangerIcon.innerHTML = '🍌';
                    break;
                case 'CRAB_ATTACK':
                    dangerIcon.classList.add('crab-icon');
                    dangerIcon.innerHTML = '🦀';
                    break;
                case 'QUICKSAND':
                    dangerIcon.classList.add('quicksand-icon');
                    dangerIcon.innerHTML = '⏳';
                    break;
                case 'VOLCANO_RUMBLE':
                case 'LAVA_SPLASH':
                    dangerIcon.classList.add('volcano-icon');
                    dangerIcon.innerHTML = '🌋';
                    break;
            }
            
            space.appendChild(dangerIcon);
            
            // Add enhanced tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'track-tooltip';
            tooltip.textContent = `Space ${spaceNum}: ${dangerSpaces[spaceNum].message}`;
            space.appendChild(tooltip);
        } else {
            // Add tooltip for normal spaces
            const tooltip = document.createElement('div');
            tooltip.className = 'track-tooltip';
            tooltip.textContent = `Space ${spaceNum}: Safe passage`;
            space.appendChild(tooltip);
        }
        
        // Add container for players
        const playersContainer = document.createElement('div');
        playersContainer.className = 'space-players';
        space.appendChild(playersContainer);
        
        trackContainer.appendChild(space);
    });
    
    // Add spaces 46-50 leading to volcano
    for (let i = 46; i <= 50; i++) {
        const progress = (i - 45) / 5;
        const space = document.createElement('div');
        space.className = 'track-space';
        if (i === 50) {
            space.classList.add('volcano-space');
        }
        space.id = `space-${i}`;
        space.dataset.space = i;
        
        // Position spaces between last coordinate and volcano
        const lastCoord = stonesOfFateCoordinates[stonesOfFateCoordinates.length - 1];
        space.style.left = (lastCoord.x + (progress * (400 - lastCoord.x))) + 'px';
        space.style.top = (lastCoord.y + (progress * (300 - lastCoord.y))) + 'px';
        // Add animation delay
        space.style.setProperty('--space-index', 44 + i);
        
        const numberSpan = document.createElement('span');
        numberSpan.className = 'space-number';
        numberSpan.textContent = i === 50 ? 'VOLCANO' : i;
        space.appendChild(numberSpan);
        
        // Add tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'track-tooltip';
        tooltip.textContent = i === 50 ? 'Space 50: The Volcano of Doom!' : `Space ${i}: Almost there!`;
        space.appendChild(tooltip);
        
        const playersContainer = document.createElement('div');
        playersContainer.className = 'space-players';
        space.appendChild(playersContainer);
        
        trackContainer.appendChild(space);
    }
    
    // Draw path lines connecting spaces
    drawTrackPath(pathSvg);
    
    // Add thematic decorations
    addThematicDecorations(trackContainer);
    
    // Add directional arrows
    addDirectionalArrows();
    
    console.log('Track generation complete! Total spaces created:', trackContainer.children.length);
}

// Add thematic decorations around the island
function addThematicDecorations(container) {
    // Add palm trees around the island edges
    const palmTreePositions = [
        { x: 150, y: 100 },
        { x: 650, y: 120 },
        { x: 180, y: 450 },
        { x: 620, y: 480 },
        { x: 300, y: 80 },
        { x: 500, y: 520 }
    ];
    
    palmTreePositions.forEach((pos, index) => {
        const palmTree = document.createElement('div');
        palmTree.className = 'palm-tree-decoration';
        palmTree.textContent = '🌴';
        palmTree.style.left = pos.x + 'px';
        palmTree.style.top = pos.y + 'px';
        palmTree.style.animationDelay = (index * 0.5) + 's';
        container.appendChild(palmTree);
    });
    
    // Add some seashells near the beach area
    const shellPositions = [
        { x: 120, y: 200, icon: '🐚' },
        { x: 140, y: 250, icon: '🦀' },
        { x: 160, y: 180, icon: '⭐' }
    ];
    
    shellPositions.forEach(pos => {
        const shell = document.createElement('div');
        shell.className = 'beach-decoration';
        shell.textContent = pos.icon;
        shell.style.position = 'absolute';
        shell.style.left = pos.x + 'px';
        shell.style.top = pos.y + 'px';
        shell.style.fontSize = '16px';
        shell.style.opacity = '0.6';
        shell.style.zIndex = '1';
        container.appendChild(shell);
    });
}

// Draw SVG path lines connecting track spaces
function drawTrackPath(svg) {
    // Set SVG viewBox to match board dimensions
    svg.setAttribute('viewBox', '0 0 800 640');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    
    // Create a smooth curved path through all coordinates
    const pathData = [];
    const coords = [...stonesOfFateCoordinates];
    
    // Add spaces 46-50 leading to volcano
    for (let i = 46; i <= 50; i++) {
        const progress = (i - 45) / 5;
        coords.push({
            x: 688 + (progress * (400 - 688)),
            y: 144 + (progress * (300 - 144))
        });
    }
    
    // Create smooth bezier curve path
    coords.forEach((coord, index) => {
        if (index === 0) {
            pathData.push(`M ${coord.x + 22.5} ${coord.y + 22.5}`);
        } else if (index < coords.length - 1) {
            // Calculate control points for smooth curves
            const prev = coords[index - 1];
            const next = coords[index + 1];
            const cp1x = prev.x + (coord.x - prev.x) * 0.5 + 22.5;
            const cp1y = prev.y + (coord.y - prev.y) * 0.5 + 22.5;
            const cp2x = coord.x + (next.x - coord.x) * 0.5 + 22.5;
            const cp2y = coord.y + (next.y - coord.y) * 0.5 + 22.5;
            
            pathData.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${coord.x + 22.5} ${coord.y + 22.5}`);
        } else {
            pathData.push(`L ${coord.x + 22.5} ${coord.y + 22.5}`);
        }
    });
    
    // Create main track path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData.join(' '));
    path.setAttribute('class', 'track-path-line');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
    
    // Add decorative dashed overlay
    const dashedPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dashedPath.setAttribute('d', pathData.join(' '));
    dashedPath.setAttribute('class', 'track-path-line-overlay');
    dashedPath.setAttribute('fill', 'none');
    dashedPath.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
    dashedPath.setAttribute('stroke-width', '2');
    dashedPath.setAttribute('stroke-dasharray', '5, 10');
    svg.appendChild(dashedPath);
}

// Update player position on visual track
function updatePlayerPositionOnTrack(player, position) {
    // Remove player from all spaces
    document.querySelectorAll('.space-players').forEach(container => {
        const existingPlayer = container.querySelector(`#track-${player}`);
        if (existingPlayer) {
            existingPlayer.remove();
        }
    });
    
    // Add player to new position
    let targetSpace;
    if (position >= 50) {
        targetSpace = document.getElementById('space-volcano');
    } else if (position > 0 && position <= 45) {
        targetSpace = document.getElementById(`space-${position}`);
    } else {
        targetSpace = document.getElementById('space-1');
    }
    
    if (targetSpace) {
        const playersContainer = targetSpace.querySelector('.space-players');
        const playerMarker = document.createElement('div');
        playerMarker.className = 'player-marker';
        playerMarker.id = `track-${player}`;
        
        if (player === 'human') {
            playerMarker.style.backgroundColor = playerPawnConfig.color;
            if (playerPawnConfig.shapeImg) {
                const img = document.createElement('img');
                img.src = playerPawnConfig.shapeImg;
                img.style.width = '100%';
                img.style.height = '100%';
                playerMarker.appendChild(img);
            } else {
                playerMarker.textContent = playerPawnConfig.shapeChar || 'H';
            }
        } else {
            playerMarker.style.backgroundColor = '#dc3545';
            playerMarker.textContent = '🤖';
        }
        
        playersContainer.appendChild(playerMarker);
        
        // Animate the space when player lands
        targetSpace.classList.add('space-active');
        setTimeout(() => targetSpace.classList.remove('space-active'), 500);
    }
}

// Trigger danger space effects
async function triggerDangerSpace(player, position) {
    const danger = dangerSpaces[position];
    
    // Play danger sound effect
    playDangerSound(danger.type);
    
    // Show danger message
    updateInfoMessage(`${player === 'human' ? 'You' : 'AI'} landed on a danger space! ${danger.message}`);
    
    // Enhanced visual effects on the space
    const space = document.getElementById(`space-${position}`);
    if (space) {
        space.classList.add('danger-triggered');
        
        // Add particle effects based on danger type
        createDangerParticles(space, danger.type);
        
        // Screen shake effect for dramatic dangers
        if (['VOLCANO_RUMBLE', 'LAVA_SPLASH'].includes(danger.type)) {
            document.body.classList.add('screen-shake');
            setTimeout(() => document.body.classList.remove('screen-shake'), 500);
        }
        
        setTimeout(() => space.classList.remove('danger-triggered'), 2000);
    }
    
    // Apply effect
    switch(danger.effect) {
        case 'moveBack':
            await movePlayer(player, -danger.spaces);
            break;
        case 'skipTurn':
            playerSkipTurn[player] = true;
            break;
        case 'loseToken':
            if (player === 'human' && humanTokens > 0) {
                humanTokens--;
                document.getElementById('human-tokens').textContent = humanTokens;
            }
            break;
        case 'allMoveBack':
            await movePlayer('human', -danger.spaces);
            await movePlayer('ai', -danger.spaces);
            break;
    }
}

// Hook into existing functions
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the game to fully load
    setTimeout(() => {
        // Override movePlayer to update visual track
        const originalMovePlayer = window.movePlayer;
        if (originalMovePlayer) {
            window.movePlayer = async function(player, spaces) {
                // Call original function
                await originalMovePlayer(player, spaces);
                
                // Update visual position
                const position = player === 'human' ? window.humanPosition : window.aiPosition;
                updatePlayerPositionOnTrack(player, position);
                
                // Check for danger space effects
                if (dangerSpaces[position] && !playerSkipTurn[player]) {
                    await triggerDangerSpace(player, position);
                }
            };
        }
        
        // Override actualStartGame to initialize track
        const originalActualStartGame = window.actualStartGame;
        if (originalActualStartGame) {
            window.actualStartGame = function() {
                originalActualStartGame();
                // Delay track generation to ensure DOM is ready
                setTimeout(() => {
                    generateGameTrack();
                    updatePlayerPositionOnTrack('human', window.humanPosition || 0);
                    updatePlayerPositionOnTrack('ai', window.aiPosition || 0);
                }, 100);
            };
        }
        
        // If game is already in progress, generate track immediately
        if (window.gameState && window.gameState !== 'MENU') {
            generateGameTrack();
            updatePlayerPositionOnTrack('human', window.humanPosition || 0);
            updatePlayerPositionOnTrack('ai', window.aiPosition || 0);
        }
    }, 500);
});


// Debug code for track visibility

// Add debug logging to track generation
const originalGenerateGameTrack = generateGameTrack;
generateGameTrack = function() {
    console.log('[TRACK DEBUG] Starting track generation...');
    const trackContainer = document.getElementById('game-track');
    const pathSvg = document.getElementById('track-path-svg');
    
    console.log('[TRACK DEBUG] Track container found:', !!trackContainer);
    console.log('[TRACK DEBUG] Path SVG found:', !!pathSvg);
    console.log('[TRACK DEBUG] Stones coordinates available:', stonesOfFateCoordinates.length);
    
    if (!trackContainer || !pathSvg) {
        console.error('[TRACK DEBUG] Required containers not found!');
        return;
    }
    
    // Call original function
    originalGenerateGameTrack();
    
    // Log results
    const spacesCreated = trackContainer.querySelectorAll('.track-space').length;
    console.log('[TRACK DEBUG] Spaces created:', spacesCreated);
    console.log('[TRACK DEBUG] Track generation complete!');
};


// Robust initialization code

// Immediate track initialization
window.addEventListener('load', function() {
    console.log('[TRACK INIT] Window loaded, checking game state...');
    
    // Force track generation after a short delay
    setTimeout(function() {
        if (document.getElementById('game-track-container')) {
            console.log('[TRACK INIT] Forcing track generation...');
            generateGameTrack();
            
            // Also update player positions if game has started
            if (window.humanPosition !== undefined) {
                updatePlayerPositionOnTrack('human', window.humanPosition || 0);
            }
            if (window.aiPosition !== undefined) {
                updatePlayerPositionOnTrack('ai', window.aiPosition || 0);
            }
        }
    }, 1000);
});

// Also hook into game state changes
if (window.gameState) {
    const originalSetState = window.setGameState || function() {};
    window.setGameState = function(newState) {
        console.log('[TRACK INIT] Game state changing to:', newState);
        originalSetState(newState);
        
        if (newState === 'INITIALIZING_ROUND' || newState === 'BETTING_PHASE') {
            setTimeout(function() {
                if (!document.querySelector('.track-space')) {
                    console.log('[TRACK INIT] No track spaces found, generating...');
                    generateGameTrack();
                    updatePlayerPositionOnTrack('human', window.humanPosition || 0);
                    updatePlayerPositionOnTrack('ai', window.aiPosition || 0);
                }
            }, 500);
        }
    };
}


// Sound effects for danger spaces
function playDangerSound(dangerType) {
    // Use existing sound system if available
    if (typeof playSound === 'function') {
        switch(dangerType) {
            case 'COCONUT_FALL':
            case 'COCONUT_STORM':
                playSound('coconutFall');
                break;
            case 'SLIP':
                playSound('slip');
                break;
            case 'CRAB_ATTACK':
                playSound('crabAttack');
                break;
            case 'QUICKSAND':
                playSound('quicksand');
                break;
            case 'VOLCANO_RUMBLE':
            case 'LAVA_SPLASH':
                playSound('volcanoRumble');
                break;
            default:
                playSound('danger');
        }
    }
}

// Create particle effects for danger spaces
function createDangerParticles(space, dangerType) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'danger-particles';
    space.appendChild(particleContainer);
    
    const particleCount = 8;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'danger-particle';
        
        // Set particle appearance based on danger type
        switch(dangerType) {
            case 'COCONUT_FALL':
            case 'COCONUT_STORM':
                particle.textContent = '🥥';
                particle.style.fontSize = '12px';
                break;
            case 'SLIP':
                particle.textContent = '💨';
                particle.style.fontSize = '10px';
                break;
            case 'CRAB_ATTACK':
                particle.textContent = '🦀';
                particle.style.fontSize = '8px';
                break;
            case 'QUICKSAND':
                particle.style.backgroundColor = '#d2b48c';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.borderRadius = '50%';
                break;
            case 'VOLCANO_RUMBLE':
            case 'LAVA_SPLASH':
                particle.style.backgroundColor = '#ff4500';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.borderRadius = '50%';
                particle.style.boxShadow = '0 0 4px #ff4500';
                break;
            default:
                particle.textContent = '✨';
                particle.style.fontSize = '10px';
        }
        
        // Random position and animation
        const angle = (i / particleCount) * 2 * Math.PI;
        const distance = 30 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.position = 'absolute';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        
        particleContainer.appendChild(particle);
        particles.push({ element: particle, x, y });
        
        // Animate particle
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`, opacity: 1, offset: 0.7 },
            { transform: `translate(calc(-50% + ${x * 1.5}px), calc(-50% + ${y * 1.5}px)) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
    }
    
    // Remove particle container after animation
    setTimeout(() => {
        if (particleContainer.parentNode) {
            particleContainer.parentNode.removeChild(particleContainer);
        }
    }, 1000);
}

// Add directional arrows between track spaces
function addDirectionalArrows() {
    const trackContainer = document.getElementById('game-track');
    if (!trackContainer) return;
    
    for (let i = 0; i < stonesOfFateCoordinates.length - 1; i++) {
        const current = stonesOfFateCoordinates[i];
        const next = stonesOfFateCoordinates[i + 1];
        
        const arrow = document.createElement('div');
        arrow.className = 'track-arrow';
        
        // Calculate position between current and next space
        const midX = (current.x + next.x) / 2;
        const midY = (current.y + next.y) / 2;
        
        // Calculate angle
        const angle = Math.atan2(next.y - current.y, next.x - current.x) * 180 / Math.PI;
        
        arrow.style.left = midX + 'px';
        arrow.style.top = midY + 'px';
        arrow.style.transform = `rotate(${angle + 90}deg)`;
        
        trackContainer.appendChild(arrow);
    }
}

// Highlight current player positions
function highlightCurrentPositions() {
    // Remove existing highlights
    document.querySelectorAll('.track-space').forEach(space => {
        space.classList.remove('current-player-position');
    });
    
    // Highlight human player position
    const humanSpace = document.getElementById(`space-${humanMapPosition}`);
    if (humanSpace) {
        humanSpace.classList.add('current-player-position');
    }
    
    // Highlight AI player position
    const aiSpace = document.getElementById(`space-${aiMapPosition}`);
    if (aiSpace) {
        aiSpace.classList.add('current-player-position');
    }
}
