// --- Global Game State Variable ---
let gameState = 'MENU';

// --- Sound Engine (Howler.js Placeholder) ---
const sounds = {
    // UI & Menu
    menuButtonClick: { play: () => console.log("PLAY_SOUND: menuButtonClick") },
    uiHover: { play: () => console.log("PLAY_SOUND: uiHover") },
    pawnOptionClick: { play: () => console.log("PLAY_SOUND: pawnOptionClick") }, // Specific sound for pawn options
    // Game Flow
    roundStart: { play: () => console.log("PLAY_SOUND: roundStart") },
    cardDeal: { play: () => console.log("PLAY_SOUND: cardDeal") },
    tokenPickup: { play: () => console.log("PLAY_SOUND: tokenPickup") },
    tokenDrop: { play: () => console.log("PLAY_SOUND: tokenDrop") },
    confirmBetClick: { play: () => console.log("PLAY_SOUND: confirmBetClick") },
    betLockedStamp: { play: () => console.log("PLAY_SOUND: betLockedStamp") },
    aiThinkingLoopStart: { play: () => console.log("PLAY_SOUND: aiThinkingLoopStart") },
    aiThinkingLoopStop: { play: () => console.log("PLAY_SOUND: aiThinkingLoopStop") },
    aiTokenPlace: { play: () => console.log("PLAY_SOUND: aiTokenPlace") },
    revealBetsFanfare: { play: () => console.log("PLAY_SOUND: revealBetsFanfare") },
    aiBetFlip: { play: () => console.log("PLAY_SOUND: aiBetFlip") },
    drumRollStart: { play: () => console.log("PLAY_SOUND: drumRollStart") },
    drumRollStop: { play: () => console.log("PLAY_SOUND: drumRollStop") },
    placeholderReveal: { play: () => console.log("PLAY_SOUND: placeholderReveal") },
    deadliestCardRevealFanfare: { play: () => console.log("PLAY_SOUND: deadliestCardRevealFanfare") },
    deadliestCardBannerSwoop: { play: () => console.log("PLAY_SOUND: deadliestCardBannerSwoop") },
    correctJingle: { play: () => console.log("PLAY_SOUND: correctJingle") },
    wompWompPenalty: { play: () => console.log("PLAY_SOUND: wompWompPenalty") },
    pawnMoveForward: { play: () => console.log("PLAY_SOUND: pawnMoveForward") },
    pawnMoveBackward: { play: () => console.log("PLAY_SOUND: pawnMoveBackward") },
    shieldBlockSound: { play: () => console.log("PLAY_SOUND: shieldBlockSound") },
    cardsClear: { play: () => console.log("PLAY_SOUND: cardsClear") },
    tokensCollectToHand: { play: () => console.log("PLAY_SOUND: tokensCollectToHand") },
    gameWinFanfare: { play: () => console.log("PLAY_SOUND: gameWinFanfare") },
    gameLoseSound: { play: () => console.log("PLAY_SOUND: gameLoseSound") },
    gameTieSound: { play: () => console.log("PLAY_SOUND: gameTieSound") },
    pawnWinCelebrate: { play: () => console.log("PLAY_SOUND: pawnWinCelebrate") },
};

function playSound(soundName) {
    if (sounds[soundName] && typeof sounds[soundName].play === 'function') {
        sounds[soundName].play();
    } else {
        // console.warn(`Sound "${soundName}" not found or not playable.`);
    }
}

// --- Categorized Master Decks (Ensure these have actual image paths) ---
const masterDeckAnimals = [
    { scenario: "Shark Attack (Surfer)", casualties: 1, category: "animal", image: "assets/card-art/shark.jpg", placeholder: "assets/images/placeholder_bones_qmark.png" },
    { scenario: "Bear Mauling (Hiker)", casualties: 1, category: "animal", image: "assets/card-art/bear.jpg", placeholder: "assets/images/placeholder_bones_qmark.png" },
    { scenario: "Hippo Attack (River Boat)", casualties: 3, category: "animal", image: "assets/card-art/hippo.jpg", placeholder: "assets/images/placeholder_bones_qmark.png" },
    { scenario: "Swarm of Bees (Allergic Reaction)", casualties: 2, category: "animal", image: "assets/card-art/bees.jpg", placeholder: "assets/images/placeholder_bones_qmark.png"},
    { scenario: "Crocodile Attack (Swimmer)", casualties: 1, category: "animal", image: "assets/card-art/crocodile.jpg", placeholder: "assets/images/placeholder_bones_qmark.png"},
    { scenario: "Dog Attack (Fatal)", casualties: 1, category: "animal", image: "assets/card-art/dog.jpg", placeholder: "assets/images/placeholder_bones_qmark.png"},
    { scenario: "Snake Bite (Venomous)", casualties: 1, category: "animal", image: "assets/card-art/snake.jpg", placeholder: "assets/images/placeholder_bones_qmark.png"},
    { scenario: "Elephant Stampede (Village)", casualties: 5, category: "animal", image: "assets/card-art/elephant.jpg", placeholder: "assets/images/placeholder_bones_qmark.png"},
    { scenario: "Moose Charging Car", casualties: 1, category: "animal", image: "assets/card-art/moose.jpg", placeholder: "assets/images/placeholder_bones_qmark.png"},
    { scenario: "Piranha Swarm (Myth vs Reality - Low)", casualties: 0, category: "animal", image: "assets/card-art/piranha.jpg", placeholder: "assets/images/placeholder_bones_qmark.png"}
];
const masterDeckEvents = [
    { scenario: "Downtown Apartment Fire", casualties: 12, category: "event", image: "assets/card-art/fire.jpg", placeholder: "assets/images/placeholder_vault.png" },
    { scenario: "Highway Bus Crash", casualties: 35, category: "event", image: "assets/card-art/bus_crash.jpg", placeholder: "assets/images/placeholder_vault.png" },
    { scenario: "Train Derailment (Rural Area)", casualties: 75, category: "event", image: "assets/card-art/train_derail.jpg", placeholder: "assets/images/placeholder_vault.png"},
    { scenario: "Food Poisoning Outbreak (Large Festival)", casualties: 250, category: "event", image: "assets/card-art/food_poison.jpg", placeholder: "assets/images/placeholder_vault.png"},
    { scenario: "Bridge Collapse (Rush Hour)", casualties: 45, category: "event", image: "assets/card-art/bridge_collapse.jpg", placeholder: "assets/images/placeholder_vault.png"},
    { scenario: "Small Plane Crash (Suburban)", casualties: 4, category: "event", image: "assets/card-art/plane_crash.jpg", placeholder: "assets/images/placeholder_vault.png"},
    { scenario: "Factory Explosion (Chemical Plant)", casualties: 22, category: "event", image: "assets/card-art/factory_explosion.jpg", placeholder: "assets/images/placeholder_vault.png"},
    { scenario: "Amusement Park Ride Malfunction", casualties: 8, category: "event", image: "assets/card-art/amusement_park.jpg", placeholder: "assets/images/placeholder_vault.png"},
    { scenario: "Cruise Ship Capsizes (Storm)", casualties: 450, category: "event", image: "assets/card-art/cruise_ship.jpg", placeholder: "assets/images/placeholder_vault.png"},
    { scenario: "Tornado Hits Small Town", casualties: 110, category: "event", image: "assets/card-art/tornado.jpg", placeholder: "assets/images/placeholder_vault.png"}
];
const masterDeckOddities = [
    { scenario: "Falling Coconut Death", casualties: 1, category: "oddity", image: "assets/card-art/coconut_fall.jpg", placeholder: "assets/images/placeholder_top_secret.png" },
    { scenario: "Icicle Fall Death", casualties: 1, category: "oddity", image: "assets/card-art/icicle.jpg", placeholder: "assets/images/placeholder_top_secret.png" },
    { scenario: "Champagne Cork Injury (Eye)", casualties: 0, category: "oddity", image: "assets/card-art/champagne.jpg", placeholder: "assets/images/placeholder_top_secret.png"},
    { scenario: "Runaway Shopping Cart Pile-up", casualties: 2, category: "oddity", image: "assets/card-art/shopping_cart.jpg", placeholder: "assets/images/placeholder_top_secret.png"},
    { scenario: "Spontaneous Human Combustion (Disputed)", casualties: 1, category: "oddity", image: "assets/card-art/shc.jpg", placeholder: "assets/images/placeholder_top_secret.png"},
    { scenario: "Vending Machine Tip-Over Death", casualties: 1, category: "oddity", image: "assets/card-art/vending_machine.jpg", placeholder: "assets/images/placeholder_top_secret.png"},
    { scenario: "Skydiving Accident (Parachute Failure)", casualties: 1, category: "oddity", image: "assets/card-art/skydiving.jpg", placeholder: "assets/images/placeholder_top_secret.png"},
    { scenario: "Hot Air Balloon Crash", casualties: 3, category: "oddity", image: "assets/card-art/hot_air_balloon.jpg", placeholder: "assets/images/placeholder_top_secret.png"},
    { scenario: "Stage Collapse at Concert", casualties: 15, category: "oddity", image: "assets/card-art/stage_collapse.jpg", placeholder: "assets/images/placeholder_top_secret.png"},
    { scenario: "Black Friday Stampede (Retail Store)", casualties: 2, category: "oddity", image: "assets/card-art/black_friday.jpg", placeholder: "assets/images/placeholder_top_secret.png"}
];


// --- DOM Element References ---
// (Keep all existing DOM references as they were in the previous "complete" response)
const appContainer = document.getElementById('app-container');
const mainMenuScreen = document.getElementById('main-menu-screen');
const gameScreen = document.getElementById('game-screen');
const gameContainer = document.getElementById('game-container');
const gameOverScreen = document.getElementById('game-over-screen');
const startNewGameBtn = document.getElementById('start-new-game-btn');
const howToPlayBtn = document.getElementById('how-to-play-btn');
const settingsBtn = document.getElementById('settings-btn');
const quitBtn = document.getElementById('quit-btn');
const pawnCustomizationUI = document.getElementById('pawn-customization-ui');
const aiSelectionUI = document.getElementById('ai-selection-ui');
// const pawnShapeBtns = document.querySelectorAll('.pawn-shape-btn'); // MOVED to DOMContentLoaded
// const pawnColorBtns = document.querySelectorAll('.pawn-color-btn'); // MOVED to DOMContentLoaded
const pawnPreviewMarker = document.getElementById('pawn-preview-marker');
// const aiPersonalitySelect = document.getElementById('ai-personality-select'); // MOVED to DOMContentLoaded
const infoMessageBarP = document.getElementById('info-message-bar').querySelector('p');
const humanScorePosSpan = document.getElementById('human-score-pos');
const aiScorePosSpan = document.getElementById('ai-score-pos');
const mapTotalSpacesSpans = document.querySelectorAll('.map-total-spaces');
const humanTokensSpan = document.getElementById('human-tokens');
const aiPlayerPanel1 = document.getElementById('ai-panel-1');
const aiAvatar1 = aiPlayerPanel1.querySelector('.ai-avatar');
const aiName1 = aiPlayerPanel1.querySelector('.ai-name');
const aiPawnMiniature1 = aiPlayerPanel1.querySelector('#ai-pawn-miniature-1');
const aiBetIndicator1 = aiPlayerPanel1.querySelector('.ai-bet-indicator');
const aiBetResultIcon1 = aiPlayerPanel1.querySelector('.ai-bet-result-icon');
const userCommandCenter = document.querySelector('.user-command-center');
const tokenPool = document.getElementById('token-pool');
const humanMarker = document.getElementById('human-marker');
const aiMarker = document.getElementById('ai-marker');
const humanMapPosText = document.getElementById('human-map-pos-text');
const aiMapPosText = document.getElementById('ai-map-pos-text');
const cardDisplayArea = document.getElementById('card-display-area');
const deckSourceVisuals = [
    document.getElementById('deck-source-1'),
    document.getElementById('deck-source-2'),
    document.getElementById('deck-source-3'),
];
const cardSlots = [1, 2, 3].map(i => ({
    slot: document.getElementById(`card-slot-${i}`),
    scenarioText: document.getElementById(`card-slot-${i}`).querySelector('.scenario-text'),
    casualtyText: document.getElementById(`card-slot-${i}`).querySelector('.casualty-text'),
    tokenCountSpan: document.getElementById(`token-count-card-${i}`),
    droppedTokensVisualArea: document.getElementById(`card-slot-${i}`).querySelector('.dropped-tokens-visual-area'),
    cardFace: document.getElementById(`card-slot-${i}`).querySelector('.card-face'),
    categoryIcon: document.getElementById(`card-slot-${i}`).querySelector('.card-category-icon'),
    deathTollPlaceholder: document.getElementById(`card-slot-${i}`).querySelector('.death-toll-placeholder'),
    playerBetIndicator: document.getElementById(`card-slot-${i}`).querySelector('.player-bet-indicator'),
    bannerContainer: document.getElementById(`card-slot-${i}`).querySelector('.most-deaths-banner-container'),
    particleContainer: document.getElementById(`card-slot-${i}`).querySelector('.card-particle-container'),
}));
const confirmBetBtn = document.getElementById('place-bet-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const aiBetDisplayDiv = document.getElementById('ai-bet-display');
const aiBetDisplayP = aiBetDisplayDiv.querySelector('p');
const resultsAreaDiv = document.getElementById('results-area');
const roundOutcomeMessageP = document.getElementById('round-outcome-message');
const gameOverMessage = document.getElementById('game-over-message');
const finalScoresSummary = document.getElementById('final-scores-summary');
const playAgainBtn = document.getElementById('play-again-btn');
const returnToMainMenuBtn = document.getElementById('return-to-main-menu-btn');
const confettiContainer = document.querySelector('.confetti-container');
const fireworksContainer = document.querySelector('.fireworks-container');
const gameTooltip = document.getElementById('game-tooltip');

// --- Game State Variables ---
const MAP_START_POSITION = 0;
const MAP_END_POSITION = 50;
const CHECKPOINTS = [10, 20, 30, 40];

// Initialize playerPawnConfig (default values)
let playerPawnConfig = {
    shape: 'default',
    shapeChar: 'H',
    shapeImg: null, // No image for default
    color: '#007bff' // Default blue
};
let aiPersonality = 'average';
let aiPawnVisual = { shapeChar: 'A', shapeImg: 'assets/pawns/ai_robot_pawn.png', color: '#dc3545' };

let humanMapPosition = MAP_START_POSITION;
let aiMapPosition = MAP_START_POSITION;
let humanTokensCurrentRoundAllowance = 3;
let playerTokensOnCards = [0, 0, 0];
let draggedTokenElement = null;
let deckAnimals = [], deckEvents = [], deckOddities = [];
let currentCards = [];
let currentRound = 0;

let scrollInterval = null;
const SCROLL_AREA_HEIGHT = 70;
const SCROLL_SPEED = 15;
const SCROLL_INTERVAL_DELAY = 30;

// --- Utility Functions ---
function initializeDeck() {
    deckAnimals = [...masterDeckAnimals].sort(() => Math.random() - 0.5);
    deckEvents = [...masterDeckEvents].sort(() => Math.random() - 0.5);
    deckOddities = [...masterDeckOddities].sort(() => Math.random() - 0.5);
}
function updateInfoMessage(message, append = false) {
    if (infoMessageBarP) {
        if (append) infoMessageBarP.innerHTML += `<br>${message}`;
        else infoMessageBarP.innerHTML = message;
    }
}
function setGameState(newState) {
    console.log(`[GAME STATE] Transitioning from ${gameState} to: ${newState}`);
    gameState = newState;
    if (newState === 'PLAYER_BETTING') {
        tokenPool.querySelectorAll('.draggable-token').forEach(t => t.classList.add('active-for-betting'));
        if (aiAvatar1) aiAvatar1.classList.add('thinking');
        playSound('aiThinkingLoopStart');
    } else {
        tokenPool.querySelectorAll('.draggable-token').forEach(t => t.classList.remove('active-for-betting'));
        // Stop AI thinking only if not waiting for AI bets
        if (gameState !== 'AWAITING_AI_BETS' && gameState !== 'AWAITING_CONFIRM') {
             if (aiAvatar1) aiAvatar1.classList.remove('thinking');
             playSound('aiThinkingLoopStop');
        }
    }
}
const delay = ms => new Promise(res => setTimeout(res, ms));

// --- Pawn Preview Update Function ---
function updatePawnPreviewDisplay() {
    if (!pawnPreviewMarker) return;

    if (playerPawnConfig.shapeImg) {
        pawnPreviewMarker.innerHTML = `<img src="${playerPawnConfig.shapeImg}" alt="Pawn Preview">`;
        pawnPreviewMarker.style.backgroundColor = 'transparent'; // Important for image pawns
        // Optional: Apply color filter to image if desired and images are designed for it
        // const imgEl = pawnPreviewMarker.querySelector('img');
        // if (imgEl) applyPawnColorFilter(imgEl, playerPawnConfig.color);
    } else {
        pawnPreviewMarker.innerHTML = playerPawnConfig.shapeChar;
        pawnPreviewMarker.style.backgroundColor = playerPawnConfig.color;
    }
}
// Optional helper for advanced color filtering on images (example stub)
// function applyPawnColorFilter(imgElement, hexColor) {
//     // This would require logic to convert hex to a filter string, e.g., hue-rotate
//     // imgElement.style.filter = `hue-rotate(90deg) saturate(150%) brightness(1.1)`;
//     console.log("Applying color filter (stub)", hexColor, "to", imgElement);
// }


// --- Phase 0: Main Menu Logic ---
function showMainMenu() {
    setGameState('MENU');
    mainMenuScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    if (confettiContainer) confettiContainer.innerHTML = '';
    if (fireworksContainer) fireworksContainer.innerHTML = '';
    updateInfoMessage("Welcome to Death by Coconuts!");
    if (pawnCustomizationUI) pawnCustomizationUI.style.display = 'block';
    if (aiSelectionUI) aiSelectionUI.style.display = 'block';
    gameContainer.classList.remove('game-ended-focus-zoom');
    updatePawnPreviewDisplay(); // Ensure preview is correct when returning to menu
}

function initializeGameVariables() {
    humanMapPosition = MAP_START_POSITION;
    aiMapPosition = MAP_START_POSITION;
    humanTokensCurrentRoundAllowance = 3;
    currentRound = 0;
    playerTokensOnCards = [0, 0, 0];
    initializeDeck();

    if (aiAvatar1) aiAvatar1.classList.remove('thinking');
    if (aiBetIndicator1) {
        aiBetIndicator1.textContent = '?';
        aiBetIndicator1.className = 'ai-bet-indicator face-down';
        aiBetIndicator1.style.display = 'none';
    }
    if (aiBetResultIcon1) {
        aiBetResultIcon1.style.display = 'none';
        aiBetResultIcon1.classList.remove('visible', 'correct', 'incorrect', 'animate-stamp');
    }
    aiPawnMiniature1.innerHTML = aiPawnVisual.shapeImg ? `<img src="${aiPawnVisual.shapeImg}" alt="AI">` : aiPawnVisual.shapeChar;
    aiPawnMiniature1.style.backgroundColor = aiPawnVisual.shapeImg ? 'transparent' : aiPawnVisual.color;
    aiMarker.innerHTML = aiPawnVisual.shapeImg ? `<img src="${aiPawnVisual.shapeImg}" alt="AI">` : aiPawnVisual.shapeChar;
    aiMarker.style.backgroundColor = aiPawnVisual.shapeImg ? 'transparent' : aiPawnVisual.color;
    aiMarker.style.setProperty('--pawn-glow-color', `${aiPawnVisual.color}80`);

    humanMarker.innerHTML = playerPawnConfig.shapeImg ? `<img src="${playerPawnConfig.shapeImg}" alt="Player">` : playerPawnConfig.shapeChar;
    humanMarker.style.backgroundColor = playerPawnConfig.shapeImg ? 'transparent' : playerPawnConfig.color;
    humanMarker.style.setProperty('--pawn-glow-color', `${playerPawnConfig.color}80`);
}

function actualStartGame() {
    playSound('menuButtonClick');
    setGameState('INITIALIZING_ROUND');
    initializeGameVariables(); // This now sets pawn visuals based on playerPawnConfig
    mainMenuScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    gameOverScreen.style.display = 'none';
    mapTotalSpacesSpans.forEach(span => span.textContent = MAP_END_POSITION);
    document.querySelectorAll('.map-space-finish').forEach(el => el.classList.add('glowing'));
    renderCheckpoints();

    if(humanScorePosSpan) humanScorePosSpan.textContent = humanMapPosition;
    if(aiScorePosSpan) aiScorePosSpan.textContent = aiMapPosition;
    updateMapDisplay(); // Initial map display after pawn visuals are set
    startNewRound();
}

// --- Phase 1 & 2: Round Start & Card Dealing ---
// (drawCardsAndPrepareData, dealCardsAnimated are complex and assumed to be mostly correct from previous,
// ensure asset paths in masterDecks are valid and placeholder images exist)
async function startNewRound() {
    currentRound++;
    setGameState('INITIALIZING_ROUND');
    updateInfoMessage(`Round ${currentRound}: Shuffling the dangers...`);
    playSound('roundStart');
    if (gameContainer) gameContainer.classList.remove('game-ended-focus-zoom');
    if (cardDisplayArea) cardDisplayArea.classList.remove('zoomed-in-focus', 'spotlight-on-deadliest');

    cardSlots.forEach((cs) => {
        cs.slot.classList.remove('disabled', 'deadliest-card', 'clearing', 'clear-fly-off', 'clear-slide-discard');
        cs.scenarioText.textContent = ``;
        cs.cardFace.style.backgroundImage = '';
        cs.cardFace.classList.remove('populated');
        cs.casualtyText.style.display = 'none';
        cs.deathTollPlaceholder.style.backgroundImage = '';
        cs.deathTollPlaceholder.classList.remove('revealing-default', 'revealing-shatter', 'hidden');
        cs.deathTollPlaceholder.style.opacity = '1';
        cs.deathTollPlaceholder.style.transform = 'scale(1) rotateY(0deg)';
        if(cs.playerBetIndicator) {
            cs.playerBetIndicator.style.display = 'none';
            cs.playerBetIndicator.classList.remove('visible', 'correct', 'incorrect', 'animate-stamp');
        }
        cs.tokenCountSpan.textContent = '0';
        cs.droppedTokensVisualArea.innerHTML = '';
        if(cs.categoryIcon) cs.categoryIcon.innerHTML = '';
        if(cs.bannerContainer) cs.bannerContainer.innerHTML = '';
        if(cs.particleContainer) cs.particleContainer.innerHTML = '';
    });
    playerTokensOnCards = [0, 0, 0];

    if (!drawCardsAndPrepareData()) {
        confirmBetBtn.disabled = true;
        updateInfoMessage("Error drawing cards. Please refresh.");
        return;
    }

    if (humanScorePosSpan) humanScorePosSpan.textContent = humanMapPosition;
    if (aiScorePosSpan) aiScorePosSpan.textContent = aiMapPosition;
    updateMapDisplay(); // Update map after potentially moving from previous round

    if (aiBetDisplayDiv) {
      aiBetDisplayDiv.style.display = 'block';
      aiBetDisplayDiv.classList.remove('fading-out-ai-info'); // Reset fade class
    }
    if (aiBetDisplayP) aiBetDisplayP.textContent = `${aiName1.textContent} is pondering...`;
    if (resultsAreaDiv) {
      resultsAreaDiv.style.display = 'none'; // Keep hidden initially
      resultsAreaDiv.classList.remove('fading-out-ai-info');
    }
    if (roundOutcomeMessageP) roundOutcomeMessageP.textContent = "Awaiting bets.";

    await animateTokensReturn(); // Ensure tokens are visually reset before new ones are made
    resetAndCreatePlayerTokens();
    if (userCommandCenter) userCommandCenter.style.opacity = '1';

    confirmBetBtn.textContent = 'Place Your Bets';
    confirmBetBtn.disabled = true;
    confirmBetBtn.classList.remove('confirmed');
    if (nextRoundBtn) nextRoundBtn.style.display = 'none';

    if (aiAvatar1) aiAvatar1.classList.remove('thinking');
    if (aiBetIndicator1) {
        aiBetIndicator1.textContent = '?';
        aiBetIndicator1.className = 'ai-bet-indicator face-down';
        aiBetIndicator1.style.display = 'none';
    }
    if (aiBetResultIcon1) {
        aiBetResultIcon1.style.display = 'none';
        aiBetResultIcon1.classList.remove('visible', 'correct', 'incorrect', 'animate-stamp');
    }

    setGameState('DEALING_CARDS');
    updateInfoMessage(`Round ${currentRound}: Dealing cards...`);
    await dealCardsAnimated();

    setGameState('PLAYER_BETTING');
    updateInfoMessage(`Round ${currentRound}: Your turn! Drag tokens to bet.`);
    cardSlots.forEach(cs => cs.slot.classList.remove('disabled'));
}

function drawCardsAndPrepareData() { // (Assumed correct from previous)
    currentCards = [];
    if (deckAnimals.length === 0) deckAnimals = [...masterDeckAnimals].sort(() => Math.random() - 0.5);
    if (deckEvents.length === 0) deckEvents = [...masterDeckEvents].sort(() => Math.random() - 0.5);
    if (deckOddities.length === 0) deckOddities = [...masterDeckOddities].sort(() => Math.random() - 0.5);

    if (deckAnimals.length > 0) currentCards.push(deckAnimals.pop()); else currentCards.push({...masterDeckAnimals[0]});
    if (deckEvents.length > 0) currentCards.push(deckEvents.pop()); else currentCards.push({...masterDeckEvents[0]});
    if (deckOddities.length > 0) currentCards.push(deckOddities.pop()); else currentCards.push({...masterDeckOddities[0]});

    currentCards.sort(() => Math.random() - 0.5);

    if (currentCards.length !== 3 || currentCards.some(card => card === undefined)) return false;
    return true;
}

async function dealCardsAnimated() { // (Assumed correct from previous)
    deckSourceVisuals.forEach(dsv => { if(dsv) dsv.style.display = 'block'; });
    await delay(200);

    const dealPromises = currentCards.map(async (card, index) => {
        const cs = cardSlots[index];
        if (cs && card) {
            cs.slot.classList.add('dealing');
            await delay(100 + 200 * index);
            cs.scenarioText.textContent = card.scenario;
            cs.cardFace.style.backgroundImage = `url('${card.image || 'assets/images/card_default_art.jpg'}')`;
            cs.cardFace.classList.add('populated');
            if (cs.categoryIcon && card.category) {
                cs.categoryIcon.innerHTML = `<img src="assets/icons/category_${card.category}.svg" alt="${card.category}">`;
            }
            if (cs.deathTollPlaceholder) {
                cs.deathTollPlaceholder.style.backgroundImage = `url('${card.placeholder || 'assets/images/placeholder_qmark_bones.png'}')`;
                cs.deathTollPlaceholder.classList.remove('hidden');
                cs.deathTollPlaceholder.style.opacity = '1';
            }
            playSound('cardDeal');
            return new Promise(resolve => {
                const animationEndHandler = () => {
                    cs.slot.removeEventListener('animationend', animationEndHandler);
                    cs.slot.classList.remove('dealing');
                    resolve();
                };
                cs.slot.addEventListener('animationend', animationEndHandler);
                setTimeout(() => { cs.slot.classList.remove('dealing'); resolve(); }, 700 + 200 * index);
            });
        }
    });
    await Promise.all(dealPromises);
    deckSourceVisuals.forEach(dsv => { if(dsv) dsv.style.display = 'none'; });
}


// --- D&D Token & Autoscroll Functions ---
// (handleDocumentDragOver, stopAutoScroll, handleTokenDragStart, handleTokenDragEnd, handleCardDragOver, handleCardDragEnter, handleCardDragLeave, handleCardDrop
//  These should be mostly correct from the previous "complete" version which included tooltip and dimming logic.)
function resetAndCreatePlayerTokens() {
    if (!tokenPool) return;
    tokenPool.innerHTML = '';
    for (let i = 0; i < humanTokensCurrentRoundAllowance; i++) {
        const holsterDiv = document.createElement('div');
        holsterDiv.classList.add('token-holster');

        const tokenDiv = document.createElement('div');
        tokenDiv.classList.add('draggable-token');
        tokenDiv.setAttribute('draggable', 'true');
        tokenDiv.id = `player-token-${i + 1}`;
        tokenDiv.textContent = (i + 1).toString();

        tokenDiv.addEventListener('dragstart', handleTokenDragStart);
        tokenDiv.addEventListener('dragend', handleTokenDragEnd);
        holsterDiv.appendChild(tokenDiv);
        tokenPool.appendChild(holsterDiv);
    }
    if (humanTokensSpan) humanTokensSpan.textContent = tokenPool.querySelectorAll('.draggable-token').length;
}
function handleDocumentDragOver(e) {
    e.preventDefault();
    const mouseY = e.clientY;
    if (mouseY > SCROLL_AREA_HEIGHT && mouseY < window.innerHeight - SCROLL_AREA_HEIGHT) {
        if (scrollInterval) { clearInterval(scrollInterval); scrollInterval = null; }
    } else if (mouseY > window.innerHeight - SCROLL_AREA_HEIGHT) {
        if (!scrollInterval) { scrollInterval = setInterval(() => window.scrollBy(0, SCROLL_SPEED), SCROLL_INTERVAL_DELAY); }
    } else if (mouseY < SCROLL_AREA_HEIGHT) {
        if (!scrollInterval) { scrollInterval = setInterval(() => window.scrollBy(0, -SCROLL_SPEED), SCROLL_INTERVAL_DELAY); }
    }
}
function stopAutoScroll() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}
function handleTokenDragStart(e) {
    draggedTokenElement = e.target;
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = 'move';
    document.addEventListener('dragover', handleDocumentDragOver);
    setTimeout(() => { if(e.target) e.target.classList.add('dragging'); }, 0);
    playSound('tokenPickup');
    if(gameTooltip) gameTooltip.style.display = 'none';
    if (cardDisplayArea) cardDisplayArea.classList.add('is-dragging-over-cards');
}
function handleTokenDragEnd(e) {
    document.removeEventListener('dragover', handleDocumentDragOver);
    stopAutoScroll();
    if (draggedTokenElement) draggedTokenElement.classList.remove('dragging');
    draggedTokenElement = null;
    if(gameTooltip) gameTooltip.style.display = 'none';
    if (cardDisplayArea) cardDisplayArea.classList.remove('is-dragging-over-cards');
}
function handleCardDragOver(e) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
}
function handleCardDragEnter(e) {
    const cardSlotElement = e.target.closest('.card-slot');
    if (cardSlotElement && draggedTokenElement && tokenPool.contains(draggedTokenElement.closest('.token-holster'))) {
        cardSlotElement.classList.add('drag-over');
        if(gameTooltip) {
            const cardIndex = parseInt(cardSlotElement.id.split('-')[2]) - 1;
            gameTooltip.textContent = `Bet on "${currentCards[cardIndex].scenario}"?`;
            gameTooltip.style.display = 'block';
        }
    }
}
function handleCardDragLeave(e) {
    const cardSlotElement = e.target.closest('.card-slot');
    if (cardSlotElement && (!e.relatedTarget || !cardSlotElement.contains(e.relatedTarget))) {
        cardSlotElement.classList.remove('drag-over');
        if(gameTooltip) gameTooltip.style.display = 'none';
    }
}
function handleCardDrop(e) {
    e.preventDefault();
    const cardSlotDiv = e.currentTarget;
    if (cardSlotDiv) cardSlotDiv.classList.remove('drag-over');
    stopAutoScroll(); document.removeEventListener('dragover', handleDocumentDragOver);
    if(gameTooltip) gameTooltip.style.display = 'none';

    if (!draggedTokenElement || !tokenPool.contains(draggedTokenElement.closest('.token-holster'))) { return; }

    const cardIndex = parseInt(cardSlotDiv.id.split('-')[2]) - 1;
    if (cardIndex >= 0 && cardIndex < 3 && cardSlots[cardIndex]) {
        playerTokensOnCards[cardIndex]++;
        cardSlots[cardIndex].tokenCountSpan.textContent = playerTokensOnCards[cardIndex];
        draggedTokenElement.classList.add('dropped-snap', 'pending-confirmation');
        draggedTokenElement.classList.remove('dragging', 'draggable-token', 'active-for-betting');
        draggedTokenElement.classList.add('dropped-token');
        draggedTokenElement.setAttribute('draggable', 'false');
        draggedTokenElement.removeEventListener('dragstart', handleTokenDragStart);
        cardSlots[cardIndex].droppedTokensVisualArea.appendChild(draggedTokenElement);
        playSound('tokenDrop');
        setTimeout(() => draggedTokenElement.classList.remove('dropped-snap'), 300);
        const scenarioName = currentCards[cardIndex].scenario;
        const tokenValue = draggedTokenElement.textContent;
        updateInfoMessage(`Provisionally bet Token ${tokenValue} on CARD ${cardIndex + 1}: '${scenarioName}'. Click 'CONFIRM BET'.`);

        draggedTokenElement = null;
        if (humanTokensSpan) humanTokensSpan.textContent = tokenPool.querySelectorAll('.draggable-token').length;
        if (confirmBetBtn) { confirmBetBtn.disabled = false; confirmBetBtn.textContent = 'Confirm Bets'; }
    }
}

// --- Phase 4: User Confirms Bet / AI "Bets" ---
async function handleConfirmBet() { // (Assumed correct from previous)
    if (gameState !== 'PLAYER_BETTING' && gameState !== 'AWAITING_CONFIRM') return;
    setGameState('AWAITING_AI_BETS');
    playSound('confirmBetClick');
    confirmBetBtn.disabled = true;
    confirmBetBtn.classList.add('confirmed');
    updateInfoMessage("Your bets are LOCKED! Waiting for AI opponents...");

    cardSlots.forEach(cs => {
        cs.droppedTokensVisualArea.querySelectorAll('.dropped-token.pending-confirmation').forEach(token => {
            token.classList.remove('pending-confirmation');
            token.classList.add('locked-on-card', 'animate-lock-stamp');
            token.addEventListener('animationend', () => token.classList.remove('animate-lock-stamp'), { once: true });
        });
        cs.slot.classList.add('disabled');
    });
    playSound('betLockedStamp');

    tokenPool.querySelectorAll('.draggable-token').forEach(token => {
        token.style.opacity = '0.5';
        token.setAttribute('draggable', 'false');
        token.classList.remove('active-for-betting');
    });

    if (aiAvatar1) aiAvatar1.classList.add('thinking');
    // playSound('aiThinkingLoopStart'); // Loop might already be playing
    if (aiBetDisplayP) aiBetDisplayP.textContent = `${aiName1.textContent} is placing bets...`;

    await delay(Math.random() * 1500 + 1000);
    playSound('aiThinkingLoopStop');
    if (aiAvatar1) aiAvatar1.classList.remove('thinking');

    const aiBetData = getAIBet();
    const aiChosenCardIndexForVisual = aiBetData.betsArray.findIndex(bet => bet > 0);

    if (aiBetIndicator1) {
        aiBetIndicator1.textContent = '?';
        aiBetIndicator1.className = 'ai-bet-indicator face-down';
        aiBetIndicator1.style.display = 'inline-flex';
        playSound('aiTokenPlace');
    }
    if (aiBetDisplayP) aiBetDisplayP.textContent = `${aiName1.textContent} has placed bets (face down).`;
    await delay(500);
    setGameState('REVEALING_BETS');
    await revealPlayerBets(aiChosenCardIndexForVisual, aiBetData);
}

// --- Phase 5: All Bets Revealed ---
async function revealPlayerBets(aiChosenCardIndexForVisual, aiBetData) { // (Assumed correct from previous)
    updateInfoMessage("All bets are in! Let's see who chose what...");
    playSound('revealBetsFanfare');

    cardSlots.forEach(cs => {
        cs.droppedTokensVisualArea.querySelectorAll('.dropped-token.locked-on-card').forEach(token => {
            token.classList.add('highlight-user-choice');
        });
    });

    if (aiBetIndicator1 && aiChosenCardIndexForVisual !== -1) {
        const indicator = aiBetIndicator1;
        indicator.classList.add('flipping');
        indicator.style.transition = 'none';
        setTimeout(() => {
            indicator.textContent = aiChosenCardIndexForVisual + 1;
            indicator.className = 'ai-bet-indicator flipping';
            indicator.classList.add('revealed-' + (aiChosenCardIndexForVisual + 1));
        }, 250);
        indicator.addEventListener('animationend', () => {
            indicator.classList.remove('flipping');
            indicator.style.transition = '';
        }, { once: true });
        playSound('aiBetFlip');
    }
    await delay(1000);
    setGameState('REVEALING_TOLLS');
    await revealDeathTolls(aiBetData);
}

// --- Phase 6: Death Tolls Revealed ---
async function revealDeathTolls(aiBetData) { // (Assumed correct from previous)
    updateInfoMessage("And the official death tolls are...");
    playSound('drumRollStart');
    if (resultsAreaDiv) {
      resultsAreaDiv.style.display = 'block';
      resultsAreaDiv.classList.remove('fading-out-ai-info');
    }
    if (cardDisplayArea) cardDisplayArea.classList.add('zoomed-in-focus');

    let deadliestCardIndices = determineWinner(currentCards);

    for (let i = 0; i < currentCards.length; i++) {
        const cs = cardSlots[i];
        const card = currentCards[i];
        const revealAnimClass = card.placeholder?.includes('vault') ? 'revealing-shatter' : 'revealing-default';
        cs.deathTollPlaceholder.classList.add(revealAnimClass);
        playSound('placeholderReveal');
        await delay(700);

        cs.casualtyText.textContent = `Casualties: ${card.casualties}`;
        cs.casualtyText.style.display = 'block';
        cs.deathTollPlaceholder.classList.add('hidden');

        const casualties = Number(card.casualties);
        cs.casualtyText.classList.remove('toll-low', 'toll-mid', 'toll-high', 'toll-extreme-glow');
        if (casualties === 0) cs.casualtyText.classList.add('toll-low');
        else if (casualties < 10) cs.casualtyText.classList.add('toll-low', 'toll-extreme-glow');
        else if (casualties < 100) cs.casualtyText.classList.add('toll-mid');
        else if (casualties < 1000) cs.casualtyText.classList.add('toll-high');
        else cs.casualtyText.classList.add('toll-high', 'toll-extreme-glow');
        await delay(800);
    }
    playSound('drumRollStop');
    if (cardDisplayArea) cardDisplayArea.classList.remove('zoomed-in-focus');

    if (deadliestCardIndices.length > 0) {
        if (cardDisplayArea) cardDisplayArea.classList.add('spotlight-on-deadliest');
        deadliestCardIndices.forEach(idx => {
            cardSlots[idx].slot.classList.add('deadliest-card');
            const banner = document.createElement('div');
            banner.className = 'most-deaths-banner';
            banner.innerHTML = `<span>MOST DEATHS!</span>`;
            cardSlots[idx].bannerContainer.innerHTML = ''; // Clear previous if any
            cardSlots[idx].bannerContainer.appendChild(banner);
            playSound('deadliestCardBannerSwoop');
            createParticles(cardSlots[idx].particleContainer, 30, 'deadliest_card_sparkle');
        });
        playSound('deadliestCardRevealFanfare');
        const deadliestScenarios = deadliestCardIndices.map(idx => `${currentCards[idx].scenario} (${currentCards[idx].casualties})`).join(' & ');
        updateInfoMessage(`Deadliest: ${deadliestScenarios}!`);
    } else {
        updateInfoMessage("No card had the highest casualties or all were zero.");
    }
    await delay(1500);
    setGameState('PROCESSING_RESULTS');
    await processScoresAndMovePawns(deadliestCardIndices, aiBetData);
}

function determineWinner(threeCardsArray) {
    let highestCasualties = -1; let winningIndices = [];
    if (!threeCardsArray || threeCardsArray.length !== 3) return [];
    for (let i = 0; i < threeCardsArray.length; i++) {
        const casualties = Number(threeCardsArray[i].casualties) || 0;
        if (casualties > highestCasualties) { highestCasualties = casualties; winningIndices = [i]; }
        else if (casualties === highestCasualties && highestCasualties > -1) { winningIndices.push(i); }
    }
    return winningIndices;
}
function getPlayerBet() { return { betsArray: [...playerTokensOnCards] }; }
function getAIBet() {
    const aiBets = [0, 0, 0]; let aiCardChoiceIndex;
    if (aiPersonality === 'risky' && currentCards.some(c => c.casualties > 100)) {
        aiCardChoiceIndex = currentCards.findIndex(c => c.casualties > 100);
        if (aiCardChoiceIndex === -1) aiCardChoiceIndex = Math.floor(Math.random() * 3);
    } else if (aiPersonality === 'cautious' && currentCards.some(c => c.casualties < 10)) {
        aiCardChoiceIndex = currentCards.findIndex(c => c.casualties < 10);
        if (aiCardChoiceIndex === -1) aiCardChoiceIndex = Math.floor(Math.random() * 3);
    }
    else { aiCardChoiceIndex = Math.floor(Math.random() * 3); }
    aiBets[aiCardChoiceIndex] = humanTokensCurrentRoundAllowance;
    return { betsArray: aiBets };
}

// --- Phase 7: Scoring and Pawn Movement ---
async function processScoresAndMovePawns(winningCardIndices, aiBetData) { // (Assumed correct from previous)
    const playerBetData = getPlayerBet(); let roundMessages = [];
    let netHumanMove = 0;
    playerBetData.betsArray.forEach((tokensBet, cardIdx) => {
        if (tokensBet > 0) {
            const indicator = cardSlots[cardIdx].playerBetIndicator;
            if (winningCardIndices.includes(cardIdx)) {
                netHumanMove += tokensBet; playSound('correctJingle');
                if(indicator) { indicator.className = 'player-bet-indicator correct visible animate-stamp'; indicator.style.display = 'block'; }
            } else {
                netHumanMove -= tokensBet; playSound('wompWompPenalty');
                if(indicator) { indicator.className = 'player-bet-indicator incorrect visible animate-stamp'; indicator.style.display = 'block'; }
            }
            if(indicator) indicator.addEventListener('animationend', () => indicator.classList.remove('animate-stamp'), {once:true});
        }
    });

    let netAiMove = 0;
    aiBetData.betsArray.forEach((tokensBet, cardIdx) => {
        if (tokensBet > 0) {
            const resultIcon = aiBetResultIcon1;
            if (winningCardIndices.includes(cardIdx)) {
                netAiMove += tokensBet; playSound('correctJingle');
                if (resultIcon) { resultIcon.className = 'ai-bet-result-icon correct visible animate-stamp'; resultIcon.style.display = 'block'; }
            } else {
                netAiMove -= tokensBet; playSound('wompWompPenalty');
                if (resultIcon) { resultIcon.className = 'ai-bet-result-icon incorrect visible animate-stamp'; resultIcon.style.display = 'block'; }
            }
            if(resultIcon) resultIcon.addEventListener('animationend', () => resultIcon.classList.remove('animate-stamp'), {once:true});
        }
    });

    // --- Human Pawn Movement ---
    const prevHumanPos = humanMapPosition;
    let newHumanPos = prevHumanPos + netHumanMove;
    let humanStoppedAtCp = false;
    if (netHumanMove < 0) {
        for (const cp of CHECKPOINTS.slice().reverse()) {
            if (prevHumanPos >= cp && newHumanPos < cp) {
                newHumanPos = cp;
                roundMessages.push(`You fell back but stopped at checkpoint ${cp}.`);
                humanStoppedAtCp = true; break;
            }
        }
        if (!humanStoppedAtCp) roundMessages.push(`You moved backward ${Math.abs(netHumanMove)} spaces.`);
    } else if (netHumanMove > 0) {
        roundMessages.push(`You moved forward ${netHumanMove} spaces.`);
    } else {
        roundMessages.push(`You stayed put this round.`);
    }
    humanMapPosition = Math.max(MAP_START_POSITION, Math.min(newHumanPos, MAP_END_POSITION));
    await movePawnVisual(humanMarker, humanMapPosition, netHumanMove > 0, prevHumanPos, humanStoppedAtCp);

    // --- AI Pawn Movement ---
    const prevAiPos = aiMapPosition;
    let newAiPos = prevAiPos + netAiMove;
    let aiStoppedAtCp = false;
    if (netAiMove < 0) {
        for (const cp of CHECKPOINTS.slice().reverse()) {
            if (prevAiPos >= cp && newAiPos < cp) {
                newAiPos = cp;
                roundMessages.push(`AI fell back but stopped at checkpoint ${cp}.`);
                aiStoppedAtCp = true; break;
            }
        }
        if(!aiStoppedAtCp) roundMessages.push(`AI moved backward ${Math.abs(netAiMove)} spaces.`);
    } else if (netAiMove > 0) {
        roundMessages.push(`AI moved forward ${netAiMove} spaces.`);
    } else {
        roundMessages.push(`AI stayed put this round.`);
    }
    aiMapPosition = Math.max(MAP_START_POSITION, Math.min(newAiPos, MAP_END_POSITION));
    await movePawnVisual(aiMarker, aiMapPosition, netAiMove > 0, prevAiPos, aiStoppedAtCp);

    if (humanScorePosSpan) humanScorePosSpan.textContent = humanMapPosition;
    if (aiScorePosSpan) aiScorePosSpan.textContent = aiMapPosition;
    updateInfoMessage(roundMessages.join(' '), true);
    if (roundOutcomeMessageP) roundOutcomeMessageP.innerHTML = roundMessages.join('<br>');

    const humanReachedEnd = humanMapPosition >= MAP_END_POSITION;
    const aiReachedEnd = aiMapPosition >= MAP_END_POSITION;
    if (humanReachedEnd || aiReachedEnd) {
        let winner = null;
        if (humanReachedEnd && !aiReachedEnd) winner = "Human";
        else if (aiReachedEnd && !humanReachedEnd) winner = "AI";
        else { winner = humanMapPosition > aiMapPosition ? "Human" : (aiMapPosition > humanMapPosition ? "AI" : "Tie"); }
        setGameState('GAME_OVER'); // Set state before calling endGame
        await endGame(winner);
    } else {
        setGameState('ROUND_ENDED');
        prepareNextRoundScreen();
    }
}

async function movePawnVisual(pawnElement, targetMapPos, isForward, prevMapPos, stoppedAtCp = false) {
    pawnElement.classList.add('activating');
    await delay(300);
    pawnElement.classList.remove('activating');

    if (stoppedAtCp) { // Already handled stopping at checkpoint logic if applicable
        createShieldEffect(pawnElement);
        playSound('shieldBlockSound');
    }

    const targetPercentage = (targetMapPos / MAP_END_POSITION) * 100;
    pawnElement.style.left = `${Math.min(100, Math.max(0, targetPercentage))}%`;
    playSound(isForward ? 'pawnMoveForward' : (targetMapPos === prevMapPos ? 'uiHover' : 'pawnMoveBackward')); // uiHover if no move
    // createPawnTrail(pawnElement, 5, isForward); // Example trail
    await delay(600);
    updateMapDisplay();
}

// updateMapDisplay (Ensure it's just updating text, not pawn position directly as movePawnVisual handles that)
function updateMapDisplay() {
    if (!humanMarker || !aiMarker || !humanMapPosText || !aiMapPosText) return;
    // Pawn positions are now set by movePawnVisual via style.left
    humanMapPosText.textContent = `${humanMapPosition}/${MAP_END_POSITION}`;
    aiMapPosText.textContent = `${aiMapPosition}/${MAP_END_POSITION}`;
}

// --- Phase 8: End of Round / Transition ---
async function prepareNextRoundScreen() { // (Assumed correct from previous)
    updateInfoMessage(`End of Round ${currentRound}. Current Positions: You - ${humanMapPosition}, AI - ${aiMapPosition}.`);
    playSound('cardsClear');
    if (cardDisplayArea) cardDisplayArea.classList.remove('spotlight-on-deadliest');

    await animateTokensReturn();

    const clearAnimations = ['clear-fly-off', 'clear-slide-discard', 'clearing'];
    cardSlots.forEach((cs, idx) => {
        cs.slot.classList.add('clearing', clearAnimations[idx % clearAnimations.length]);
        cs.slot.addEventListener('animationend', () => {
            cs.slot.classList.remove('clearing', 'clear-fly-off', 'clear-slide-discard', 'deadliest-card', 'disabled');
            if (cs.bannerContainer) cs.bannerContainer.innerHTML = '';
            if (cs.particleContainer) cs.particleContainer.innerHTML = '';
            if (cs.playerBetIndicator) {
                cs.playerBetIndicator.style.display = 'none';
                cs.playerBetIndicator.classList.remove('animate-stamp'); // Clear animation class
            }
            cs.cardFace.classList.remove('populated');
            cs.cardFace.style.backgroundImage = '';
            cs.scenarioText.textContent = '';
            cs.deathTollPlaceholder.classList.remove('hidden', 'revealing-default', 'revealing-shatter');
            cs.deathTollPlaceholder.style.opacity = '1';
            cs.deathTollPlaceholder.style.backgroundImage = '';
            cs.casualtyText.style.display = 'none';
            cs.droppedTokensVisualArea.innerHTML = ''; // Clear visual tokens from card
            cs.tokenCountSpan.textContent = '0'; // Reset count
        }, { once: true });
    });

    await delay(1000);
    playerTokensOnCards = [0,0,0];

    if (nextRoundBtn) {
        nextRoundBtn.style.display = 'inline-block';
        nextRoundBtn.disabled = false;
        nextRoundBtn.textContent = `Start Round ${currentRound + 1}`;
    }
    if (confirmBetBtn) {
        confirmBetBtn.textContent = 'Place Your Bets';
        confirmBetBtn.disabled = true;
        confirmBetBtn.classList.remove('confirmed');
    }

    if (aiBetIndicator1) {
        aiBetIndicator1.style.display = 'none';
        aiBetIndicator1.className = 'ai-bet-indicator face-down';
    }
    if (aiBetResultIcon1) {
        aiBetResultIcon1.style.display = 'none';
        aiBetResultIcon1.classList.remove('visible', 'fading-out-ai-info', 'animate-stamp');
    }
    if(aiBetDisplayDiv) {
        aiBetDisplayDiv.classList.add('fading-out-ai-info');
        aiBetDisplayDiv.addEventListener('animationend', ()=> {
            aiBetDisplayDiv.style.display = 'none';
            aiBetDisplayDiv.classList.remove('fading-out-ai-info');
        }, {once:true});
    }
    if(resultsAreaDiv) {
        resultsAreaDiv.classList.add('fading-out-ai-info');
         resultsAreaDiv.addEventListener('animationend', ()=> {
            resultsAreaDiv.style.display = 'none';
            resultsAreaDiv.classList.remove('fading-out-ai-info');
        }, {once:true});
    }
}

// --- Phase 9: Winning the Game ---
async function endGame(winnerPlayer) { // (Assumed correct from previous)
    // gameState is already GAME_OVER
    let message = "";
    if (winnerPlayer === "Human") {
        message = "CONGRATULATIONS! YOU WIN!"; playSound('gameWinFanfare');
    } else if (winnerPlayer === "AI") {
        message = `AI '${aiName1.textContent}' WINS! Better luck next time!`; playSound('gameLoseSound');
    } else {
        message = "IT'S A TIE! What a match!"; playSound('gameTieSound');
    }

    if(gameContainer) gameContainer.classList.add('game-ended-focus-zoom');
    const winningPawn = winnerPlayer === "Human" ? humanMarker : (winnerPlayer === "AI" ? aiMarker : null);
    if(winningPawn && gameScreen.style.display !== 'none') { // Only if game screen was visible
        // This part would need CSS for .victory-animation (e.g. jump, spin)
        // winningPawn.classList.add('victory-animation');
        playSound('pawnWinCelebrate');
    }
    await delay(1000); // Allow brief focus on board if desired

    gameOverMessage.textContent = message;
    finalScoresSummary.textContent = `Final Positions: You - ${humanMapPosition}/${MAP_END_POSITION}, AI - ${aiMapPosition}/${MAP_END_POSITION}`;
    gameScreen.style.display = 'none'; // Now hide game screen
    gameOverScreen.style.display = 'flex';

    if (winnerPlayer === "Human" || winnerPlayer === "Tie") {
        for (let i = 0; i < 60; i++) { createConfetto(); }
        // createFireworks(5);
    }
}


// --- Helper functions for new visuals ---
// renderCheckpoints, createConfetto, createParticles, createShieldEffect, animateTokensReturn (As defined in previous "complete" response)
function renderCheckpoints() {
    const tracks = [document.getElementById('human-map-track').querySelector('.track-line'), document.getElementById('ai-map-track').querySelector('.track-line')];
    const checkpointIcons = ['🛡️', '🛟', '😇']; let iconIdx = 0;
    CHECKPOINTS.forEach(pos => {
        const percent = (pos / MAP_END_POSITION) * 100;
        tracks.forEach(track => {
            if (!track) return;
            const existingCp = track.querySelector(`.cp-marker-${pos}`);
            if (existingCp) return;
            const cpMarker = document.createElement('div');
            cpMarker.classList.add('checkpoint-marker', `cp-marker-${pos}`);
            cpMarker.style.left = `calc(${percent}% - 14px)`;
            cpMarker.innerHTML = checkpointIcons[iconIdx % checkpointIcons.length];
            cpMarker.title = `Checkpoint at ${pos}`;
            if (pos % 20 === 0) cpMarker.classList.add('glowing-border');
            track.appendChild(cpMarker);
        });
        iconIdx++;
    });
}
function createConfetto() {
    if (!confettiContainer) return;
    const confetto = document.createElement('div');
    confetto.classList.add('confetto');
    const confettiTypes = ['assets/confetti/skull.svg', 'assets/confetti/coconut.svg', 'assets/confetti/star.svg'];
    const type = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
    confetto.style.backgroundImage = `url('${type}')`; // ASSUMES YOU HAVE THESE ASSETS
    confetto.style.width = '15px'; confetto.style.height = '15px'; // Adjust size for SVG/image
    confetto.style.left = Math.random() * 100 + 'vw';
    confetto.style.animationDuration = Math.random() * 3 + 4 + 's';
    confetto.style.transform = `scale(${Math.random() * 0.5 + 0.8}) rotate(${Math.random() * 360}deg)`;
    confetto.style.animationDelay = Math.random() * 1 + 's';
    confettiContainer.appendChild(confetto);
    confetto.addEventListener('animationend', () => { confetto.remove(); });
}
function createParticles(container, count, particleClass) {
    if (!container) return;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = `particle ${particleClass}`; // Add base 'particle' class
        // Random positions and animation delays for variety
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`);
        p.style.setProperty('--ty', `${(Math.random() - 0.5) * 100}px`);
        p.style.animationDelay = `${Math.random() * 0.3}s`;
        // Example: p.style.backgroundColor = `hsl(${Math.random()*60 + 20}, 100%, 70%)`; // Gold/Orange sparkles
        p.style.backgroundImage = `url('assets/particles/gold_sparkle.png')`; // CREATE THIS
        p.style.width = '8px'; p.style.height = '8px'; p.style.backgroundSize = 'contain';
        container.appendChild(p);
        p.addEventListener('animationend', () => p.remove(), { once: true });
    }
}
function createShieldEffect(pawnElement) {
    const shield = document.createElement('div'); shield.className = 'shield-visual';
    pawnElement.appendChild(shield); // Make sure pawnElement can host positioned children
    shield.addEventListener('animationend', () => shield.remove(), {once:true});
}
async function animateTokensReturn() {
    // Clear tokens from cards visually, then from tokenPool, then recreate.
    // This is a simplified version; true animation needs more complex JS position calculation.
    cardSlots.forEach(cs => {
        cs.droppedTokensVisualArea.innerHTML = '';
        cs.tokenCountSpan.textContent = '0';
    });
    tokenPool.innerHTML = ''; // Clear old holsters/tokens
    playSound('tokensCollectToHand');
    await delay(300); // Simulate animation time
}

// --- Event Listeners & Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Moved DOM queries for interactive menu elements inside DOMContentLoaded
    const pawnShapeBtns = document.querySelectorAll('.pawn-shape-btn');
    const pawnColorBtns = document.querySelectorAll('.pawn-color-btn');
    const aiPersonalitySelect = document.getElementById('ai-personality-select');

    startNewGameBtn.addEventListener('click', actualStartGame);
    howToPlayBtn.addEventListener('click', () => {
        playSound('menuButtonClick');
        alert("How to Play:\n\n1. Each round, three scenario cards are dealt.\n2. Drag your betting tokens from your pool to the scenario card(s) you believe will have the highest annual casualty count.\n3. Click 'Confirm Bets'.\n4. If your tokens are on a card with the highest casualties, you move forward. Otherwise, you move backward.\n5. Checkpoints (🛡️) protect you from moving further backward.\n6. First to 'FINISH' wins!");
    });
    settingsBtn.addEventListener('click', () => {
        pawnCustomizationUI.style.display = pawnCustomizationUI.style.display === 'none' ? 'block' : 'none';
        aiSelectionUI.style.display = aiSelectionUI.style.display === 'none' ? 'block' : 'none';
        playSound('menuButtonClick');
    });
    quitBtn.addEventListener('click', () => {
        playSound('menuButtonClick');
        if (gameState === 'MENU' || gameState === 'GAME_OVER') {
            alert("Already at the main menu or game has ended.");
        } else if (confirm("Are you sure you want to quit to the main menu? Progress will be lost.")) {
            showMainMenu();
        }
    });
    playAgainBtn.addEventListener('click', () => { playSound('menuButtonClick'); actualStartGame(); });
    returnToMainMenuBtn.addEventListener('click', () => { playSound('menuButtonClick'); showMainMenu(); });

    pawnShapeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pawnShapeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            playerPawnConfig.shape = btn.dataset.shape;
            playerPawnConfig.shapeChar = btn.dataset.shapeChar;
            playerPawnConfig.shapeImg = btn.dataset.shapeImg || null;
            updatePawnPreviewDisplay();
            playSound('pawnOptionClick');
        });
    });
    pawnColorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pawnColorBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            playerPawnConfig.color = btn.dataset.color;
            updatePawnPreviewDisplay();
            playSound('pawnOptionClick');
        });
    });

    if (aiPersonalitySelect) {
        aiPersonalitySelect.addEventListener('change', (e) => {
            aiPersonality = e.target.value;
            // Assuming aiName1 and aiAvatar1 are valid global constants referencing game screen elements
            if (aiName1 && aiAvatar1) { // Added defensive check
                if (aiPersonality === 'risky') {
                    aiName1.textContent = "Risky Rita";
                    aiAvatar1.src = "assets/avatars/ai_risky_rita.png"; /* CREATE AVATAR */
                } else if (aiPersonality === 'cautious') {
                    aiName1.textContent = "Cautious Carl";
                    aiAvatar1.src = "assets/avatars/ai_cautious_carl.png"; /* CREATE AVATAR */
                } else {
                    aiName1.textContent = "Robo-Betty";
                    aiAvatar1.src = "assets/avatars/ai_robot_neutral.png";
                }
            }
            playSound('pawnOptionClick');
        });
    }

    if (tokenPool) {
        tokenPool.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('draggable-token') && e.target.getAttribute('draggable') === 'true') {
                if (gameTooltip) {
                    gameTooltip.textContent = `Token ${e.target.textContent}. Drag to bet.`;
                    gameTooltip.style.display = 'block';
                }
            }
        });
        tokenPool.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('draggable-token')) {
                if (gameTooltip) gameTooltip.style.display = 'none';
            }
        });
    }
    document.addEventListener('mousemove', (e) => {
        if (gameTooltip && gameTooltip.style.display === 'block') {
            gameTooltip.style.left = (e.clientX + 15) + 'px';
            gameTooltip.style.top = (e.clientY + 10) + 'px';
        }
    });

    showMainMenu(); // Initial call
    confirmBetBtn.addEventListener('click', handleConfirmBet);
    if (nextRoundBtn) nextRoundBtn.addEventListener('click', () => { playSound('menuButtonClick'); startNewRound(); });
    cardSlots.forEach(cs => {
        if (cs.slot) {
            cs.slot.addEventListener('dragover', handleCardDragOver);
            cs.slot.addEventListener('dragenter', handleCardDragEnter);
            cs.slot.addEventListener('dragleave', handleCardDragLeave);
            cs.slot.addEventListener('drop', handleCardDrop);
        }
    });
    mapTotalSpacesSpans.forEach(span => span.textContent = MAP_END_POSITION);
    updatePawnPreviewDisplay(); // Ensure preview is correct on initial load
    console.log("Game initialized with pawn preview fix. Displaying main menu.");
});