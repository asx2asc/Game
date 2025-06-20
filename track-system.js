// Track System Functions for Death by Coconuts

// Generate track spaces dynamically
function generateGameTrack() {
    const trackContainer = document.getElementById('game-track');
    const pathSvg = document.getElementById('track-path-svg');
    
    if (!trackContainer || !pathSvg) {
        console.error('Track containers not found!');
        return;
    }
    
    // Clear existing content
    trackContainer.innerHTML = '';
    pathSvg.innerHTML = '';
    
    // Create track spaces based on coordinates
    stonesOfFateCoordinates.forEach((coord, index) => {
        const spaceNum = index + 1;
        const space = document.createElement('div');
        space.className = 'track-space';
        space.id = `space-${spaceNum}`;
        space.dataset.space = spaceNum;
        
        // Position the space
        space.style.left = coord.x + 'px';
        space.style.top = coord.y + 'px';
        
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
            space.title = dangerSpaces[spaceNum].message;
        }
        
        // Add container for players
        const playersContainer = document.createElement('div');
        playersContainer.className = 'space-players';
        space.appendChild(playersContainer);
        
        trackContainer.appendChild(space);
    });
    
    // Add the volcano space (final destination)
    const volcanoSpace = document.createElement('div');
    volcanoSpace.className = 'track-space volcano-space';
    volcanoSpace.id = 'space-volcano';
    volcanoSpace.dataset.space = '50';
    volcanoSpace.style.left = '400px';
    volcanoSpace.style.top = '300px';
    
    const volcanoLabel = document.createElement('span');
    volcanoLabel.className = 'space-number';
    volcanoLabel.textContent = 'VOLCANO';
    volcanoSpace.appendChild(volcanoLabel);
    
    const volcanoPlayersContainer = document.createElement('div');
    volcanoPlayersContainer.className = 'space-players';
    volcanoSpace.appendChild(volcanoPlayersContainer);
    
    trackContainer.appendChild(volcanoSpace);
    
    // Draw path lines connecting spaces
    drawTrackPath(pathSvg);
}

// Draw SVG path lines connecting track spaces
function drawTrackPath(svg) {
    const pathData = [];
    
    // Create path string from coordinates
    stonesOfFateCoordinates.forEach((coord, index) => {
        if (index === 0) {
            pathData.push(`M ${coord.x + 20} ${coord.y + 20}`);
        } else {
            pathData.push(`L ${coord.x + 20} ${coord.y + 20}`);
        }
    });
    
    // Connect to volcano
    pathData.push(`L 420 320`);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData.join(' '));
    path.setAttribute('class', 'track-path-line');
    svg.appendChild(path);
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
    
    // Show danger message
    updateInfoMessage(`${player === 'human' ? 'You' : 'AI'} landed on a danger space! ${danger.message}`);
    
    // Visual effect on the space
    const space = document.getElementById(`space-${position}`);
    if (space) {
        space.classList.add('danger-triggered');
        setTimeout(() => space.classList.remove('danger-triggered'), 1000);
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
