// --- Categorized Master Decks ---
const masterDeckAnimals = [
    { scenario: "Shark Attack (Surfer)", casualties: 1 },
    { scenario: "Bear Mauling (Hiker)", casualties: 1 },
    { scenario: "Hippo Attack (River Boat)", casualties: 3 },
    { scenario: "Swarm of Bees (Allergic Reaction)", casualties: 2 },
    { scenario: "Crocodile Attack (Swimmer)", casualties: 1 },
    { scenario: "Dog Attack (Fatal)", casualties: 1 }, // Can be higher in groups, but for a single event
    { scenario: "Snake Bite (Venomous)", casualties: 1 },
    { scenario: "Elephant Stampede (Village)", casualties: 5 },
    { scenario: "Moose Charging Car", casualties: 1 }, // Driver
    { scenario: "Piranha Swarm (Myth vs Reality - Low)", casualties: 0 } // Often exaggerated
];

const masterDeckEvents = [ // Natural Disasters, Accidents involving objects/environment
    { scenario: "Downtown Apartment Fire", casualties: 12 },
    { scenario: "Highway Bus Crash", casualties: 35 },
    { scenario: "Train Derailment (Rural Area)", casualties: 75 },
    { scenario: "Food Poisoning Outbreak (Large Festival)", casualties: 250 },
    { scenario: "Bridge Collapse (Rush Hour)", casualties: 45 },
    { scenario: "Small Plane Crash (Suburban)", casualties: 4 },
    { scenario: "Factory Explosion (Chemical Plant)", casualties: 22 },
    { scenario: "Amusement Park Ride Malfunction", casualties: 8 },
    { scenario: "Cruise Ship Capsizes (Storm)", casualties: 450 },
    { scenario: "Tornado Hits Small Town", casualties: 110 },
    { scenario: "Earthquake (Major City, 7.2 Richter)", casualties: 1200 },
    { scenario: "Volcano Eruption (Nearby Town)", casualties: 550 },
    { scenario: "Major Freeway Pile-up (Fog)", casualties: 18 },
    { scenario: "Building Collapse (Old Structure)", casualties: 28 },
    { scenario: "Ferry Sinking (Overcrowded)", casualties: 150 },
    { scenario: "Wildfire Engulfs Homes", casualties: 65 },
    { scenario: "Mining Accident (Cave-in)", casualties: 9 },
    { scenario: "Heatwave (Urban Elderly)", casualties: 210 },
    { scenario: "Blizzard Strands Motorists", casualties: 7 },
    { scenario: "Industrial Spill (Water Supply)", casualties: 300 }
];

const masterDeckOddities = [ // Human Actions, Strange Events, Less Common Accidents
    { scenario: "Falling Coconut Death", casualties: 1 }, // Classic
    { scenario: "Icicle Fall Death", casualties: 1 },
    { scenario: "Champagne Cork Injury (Eye)", casualties: 0 }, // Usually non-fatal but notable
    { scenario: "Runaway Shopping Cart Pile-up", casualties: 2 }, // Minor injuries usually
    { scenario: "Spontaneous Human Combustion (Disputed)", casualties: 1 },
    { scenario: "Vending Machine Tip-Over Death", casualties: 1 },
    { scenario: "Skydiving Accident (Parachute Failure)", casualties: 1 },
    { scenario: "Hot Air Balloon Crash", casualties: 3 },
    { scenario: "Stage Collapse at Concert", casualties: 15 },
    { scenario: "Black Friday Stampede (Retail Store)", casualties: 2 }
];


// DOM Element References
const humanScoreSpan = document.getElementById('human-score');
const aiScoreSpan = document.getElementById('ai-score');
const humanTokensSpan = document.getElementById('human-tokens');

const cardSlots = [
    {
        slot: document.getElementById('card-slot-1'),
        scenarioText: document.getElementById('card-slot-1').querySelector('.scenario-text'),
        casualtyText: document.getElementById('card-slot-1').querySelector('.casualty-text')
    },
    {
        slot: document.getElementById('card-slot-2'),
        scenarioText: document.getElementById('card-slot-2').querySelector('.scenario-text'),
        casualtyText: document.getElementById('card-slot-2').querySelector('.casualty-text')
    },
    {
        slot: document.getElementById('card-slot-3'),
        scenarioText: document.getElementById('card-slot-3').querySelector('.scenario-text'),
        casualtyText: document.getElementById('card-slot-3').querySelector('.casualty-text')
    }
];

// const cardChoiceRadios = document.querySelectorAll('input[name="card-choice"]'); // Removed
// const tokenAmountRadios = document.querySelectorAll('input[name="token-amount"]'); // Removed

const tokenInputs = [
    document.getElementById('tokens-on-card-1'),
    document.getElementById('tokens-on-card-2'),
    document.getElementById('tokens-on-card-3')
];
const totalTokensPlacedSpan = document.getElementById('total-tokens-placed');
const availableTokensForBettingSpan = document.getElementById('available-tokens-for-betting');

const placeBetBtn = document.getElementById('place-bet-btn');
const nextRoundBtn = document.getElementById('next-round-btn');

// Ensure the querySelector targets the <p> tag inside #ai-bet-display if one exists.
// HTML has <p>AI is thinking...</p>
const aiBetDisplayP = document.getElementById('ai-bet-display').querySelector('p');
const roundOutcomeMessageP = document.getElementById('round-outcome-message');

// Map Display DOM References
const humanMarker = document.getElementById('human-marker');
const aiMarker = document.getElementById('ai-marker');
const humanMapPosText = document.getElementById('human-map-pos-text');
const aiMapPosText = document.getElementById('ai-map-pos-text');
// const humanTrackLine = document.getElementById('human-map-track').querySelector('.track-line'); // For adding checkpoints visually
// const aiTrackLine = document.getElementById('ai-map-track').querySelector('.track-line');     // For adding checkpoints visually


// Game State Variables
let humanScore = 0; // This score can be a bonus or main score. Let's use it for checkpoint bonuses.
let aiScore = 0;   // Overall game score for AI

// Map Configuration Constants
const MAP_START_POSITION = 0;
const MAP_END_POSITION = 50;
const CHECKPOINTS = [10, 20, 30, 40];
const BACKWARD_PENALTY_SPACES = 3;

// Player Map Positions
let humanMapPosition = MAP_START_POSITION;
let aiMapPosition = MAP_START_POSITION;

let humanTokensCurrentRound = 3; // Player starts with 3 tokens each round for betting
// Working decks for each category
let deckAnimals = [];
let deckEvents = [];
let deckOddities = [];

let currentCards = []; // Array to hold the 3 cards in play (Animal, Event, Oddity)

// --- Utility Functions ---
function initializeDeck() {
    deckAnimals = [...masterDeckAnimals];
    deckEvents = [...masterDeckEvents];
    deckOddities = [...masterDeckOddities];

    // Optional: Shuffle each deck
    deckAnimals.sort(() => Math.random() - 0.5);
    deckEvents.sort(() => Math.random() - 0.5);
    deckOddities.sort(() => Math.random() - 0.5);

    console.log(`Decks initialized: Animals (${deckAnimals.length}), Events (${deckEvents.length}), Oddities (${deckOddities.length})`);
}

function drawCardsAndDisplay() { // Parameter numCardsToDraw removed
    currentCards = []; // Clear previous round's cards

    // Draw one card from each category
    if (deckAnimals.length === 0) {
        deckAnimals = [...masterDeckAnimals].sort(() => Math.random() - 0.5); // Reinitialize and shuffle
        console.log("Animal deck reshuffled.");
    }
    if (masterDeckAnimals.length === 0) { // Should not happen if master decks are populated
        alert("Critical Error: Master Animal Deck is empty!"); return false;
    }
    currentCards.push(deckAnimals.splice(Math.floor(Math.random() * deckAnimals.length), 1)[0]);

    if (deckEvents.length === 0) {
        deckEvents = [...masterDeckEvents].sort(() => Math.random() - 0.5);
        console.log("Event deck reshuffled.");
    }
    if (masterDeckEvents.length === 0) {
         alert("Critical Error: Master Event Deck is empty!"); return false;
    }
    currentCards.push(deckEvents.splice(Math.floor(Math.random() * deckEvents.length), 1)[0]);

    if (deckOddities.length === 0) {
        deckOddities = [...masterDeckOddities].sort(() => Math.random() - 0.5);
        console.log("Oddity deck reshuffled.");
    }
     if (masterDeckOddities.length === 0) {
         alert("Critical Error: Master Oddity Deck is empty!"); return false;
    }
    currentCards.push(deckOddities.splice(Math.floor(Math.random() * deckOddities.length), 1)[0]);

    // Ensure we have 3 cards
    if (currentCards.length !== 3 || currentCards.some(card => card === undefined)) {
        console.error("Failed to draw 3 valid cards.", currentCards);
        alert("Error drawing cards. Please check console and refresh.");
        return false; // Indicate failure
    }

    // Display cards in their respective slots (assuming cardSlots[0] for Animal, [1] for Event, [2] for Oddity)
    currentCards.forEach((card, index) => {
        if (cardSlots[index]) {
            cardSlots[index].scenarioText.textContent = card.scenario;
            cardSlots[index].casualtyText.textContent = 'Casualties: ???';
            cardSlots[index].casualtyText.style.display = 'none'; // Initially hidden
        } else {
            console.error(`Card slot ${index} is not defined.`);
        }
    });
    return true; // Indicate success
}

// --- Game Logic Functions ---
function startNewRound() {
    console.log("Starting new round...");
    if (!drawCardsAndDisplay()) { // No argument needed now
        placeBetBtn.disabled = true;
        return;
    }

    humanTokensCurrentRound = 3;
    humanTokensSpan.textContent = humanTokensCurrentRound;
    humanScoreSpan.textContent = humanScore; // Reflects checkpoint bonuses
    aiScoreSpan.textContent = aiScore;     // Reflects checkpoint bonuses

    updateMapDisplay(); // Update map display at the start of the round

    // Reset UI elements
    aiBetDisplayP.textContent = "AI is thinking...";
    roundOutcomeMessageP.textContent = "Distribute your tokens and place your bet.";

    // Reset token inputs to 0 and enable them
    tokenInputs.forEach(input => {
        input.value = "0";
        input.disabled = false;
        // input.max is static "3" in HTML. Sum is validated by updateTokenDisplayAndValidation.
    });

    updateTokenDisplayAndValidation();

    // Removed cardChoiceRadios & tokenAmountRadios logic

    placeBetBtn.disabled = false; // Will be re-evaluated by updateTokenDisplayAndValidation
    nextRoundBtn.style.display = 'none';
    console.log("New round setup complete. Player can bet.");
}

function updateTokenDisplayAndValidation() {
    let currentTotalTokensPlaced = 0;
    tokenInputs.forEach(input => {
        let value = parseInt(input.value) || 0;
        if (value < 0) {
            value = 0;
            input.value = "0";
        }
        // Respect the static max="3" from HTML for individual bets.
        const staticMaxPerInput = parseInt(input.getAttribute('max')) || 3;
        if (value > staticMaxPerInput) {
            value = staticMaxPerInput;
            input.value = value;
        }
        currentTotalTokensPlaced += value;
    });

    totalTokensPlacedSpan.textContent = currentTotalTokensPlaced;
    availableTokensForBettingSpan.textContent = humanTokensCurrentRound;

    if (currentTotalTokensPlaced > humanTokensCurrentRound) {
        placeBetBtn.disabled = true;
        totalTokensPlacedSpan.style.color = 'red';
    } else if (currentTotalTokensPlaced === 0 && humanTokensCurrentRound > 0) {
        // Player must bet at least one token if they have tokens
        placeBetBtn.disabled = true;
        totalTokensPlacedSpan.style.color = '';
    } else if (currentTotalTokensPlaced === 0 && humanTokensCurrentRound === 0) {
        // Player has no tokens, can "bet" 0.
        placeBetBtn.disabled = false;
        totalTokensPlacedSpan.style.color = '';
    }
    else { // Valid bet amount
        placeBetBtn.disabled = false;
        totalTokensPlacedSpan.style.color = '';
    }
}

function updateMapDisplay() {
    const humanPercentage = (humanMapPosition / MAP_END_POSITION) * 100;
    const aiPercentage = (aiMapPosition / MAP_END_POSITION) * 100;

    // Cap percentage at 100 for marker positioning to prevent overflow from track
    humanMarker.style.left = `${Math.min(100, humanPercentage)}%`;
    aiMarker.style.left = `${Math.min(100, aiPercentage)}%`;

    humanMapPosText.textContent = `${humanMapPosition}/${MAP_END_POSITION}`;
    aiMapPosText.textContent = `${aiMapPosition}/${MAP_END_POSITION}`;

    // TODO: Add checkpoint markers visually to the track if desired
    // This could be done once in setup, or dynamically here if they change
}

function getPlayerBet() {
    const betsArray = tokenInputs.map(input => {
        let value = parseInt(input.value) || 0;
        if (value < 0) value = 0;
        const staticMaxPerInput = parseInt(input.getAttribute('max')) || 3;
        if (value > staticMaxPerInput) value = staticMaxPerInput; // Enforce HTML max per input
        return value;
    });

    const sumOfBets = betsArray.reduce((sum, current) => sum + current, 0);
    if (sumOfBets > humanTokensCurrentRound) {
        // This state should be prevented by updateTokenDisplayAndValidation disabling placeBetBtn
        console.error("Error: Player's total bet exceeds available tokens. Bet will be voided for safety.");
        return { betsArray: [0, 0, 0], error: true }; // Indicate error
    }
    return { betsArray };
}

function getAIBet() {
    // AI distributes its 3 conceptual tokens.
    // Simple AI: randomly picks one card, puts all 3 tokens on it.
    const aiBets = [0, 0, 0];
    const aiCardChoiceIndex = Math.floor(Math.random() * 3);
    aiBets[aiCardChoiceIndex] = 3;
    return { betsArray: aiBets };
}

function determineWinner(threeCardsArray) {
    let highestCasualties = -1;
    let winningIndices = [];

    if (!threeCardsArray || threeCardsArray.length !== 3) {
        console.error("determineWinner received invalid array:", threeCardsArray);
        return []; // Should not proceed if card data is incorrect
    }

    for (let i = 0; i < threeCardsArray.length; i++) {
        if (threeCardsArray[i].casualties > highestCasualties) {
            highestCasualties = threeCardsArray[i].casualties;
            winningIndices = [i]; // New highest, reset previous winners
        } else if (threeCardsArray[i].casualties === highestCasualties) {
            winningIndices.push(i); // Another card ties for highest
        }
    }
    return winningIndices;
}

function resolveRound() {
    const playerBet = getPlayerBet(); // Now includes tokensBetted
    const aiGeneratedBet = getAIBet(); // Now includes tokensBetted

    // --- Deduct Player's Wagered Tokens ---
    // playerBet is now { betsArray: [...] } or { betsArray: [...], error: true }
    if (playerBet.error) {
        roundOutcomeMessageP.textContent = "Error in your bet. Please adjust token distribution.";
        tokenInputs.forEach(input => input.disabled = false); // Re-enable inputs for correction
        // placeBetBtn should already be disabled by updateTokenDisplayAndValidation if sum is wrong,
        // but if error is for other reason (e.g. direct manipulation), ensure it's disabled or re-validate.
        updateTokenDisplayAndValidation(); // Refresh validation state which might disable placeBetBtn again
        return; // Stop further processing of the round
    }

    const totalPlayerTokensBet = playerBet.betsArray.reduce((sum, current) => sum + current, 0);

    // This check should be redundant if getPlayerBet and updateTokenDisplayAndValidation work correctly.
    if (totalPlayerTokensBet > humanTokensCurrentRound) {
        console.error("ResolveRound: Attempted to bet more tokens than available. This should have been caught earlier.");
        roundOutcomeMessageP.textContent = "Error: Bet exceeds available tokens. Please try again. No tokens deducted.";
        tokenInputs.forEach(input => input.disabled = false); // Re-enable inputs
        updateTokenDisplayAndValidation();
        return;
    }
    humanTokensCurrentRound -= totalPlayerTokensBet;
    humanTokensSpan.textContent = humanTokensCurrentRound; // Update UI immediately

    // 1. Reveal casualties
    currentCards.forEach((card, index) => {
        cardSlots[index].casualtyText.textContent = `Casualties: ${card.casualties}`;
        cardSlots[index].casualtyText.style.display = 'block';
    });

    // 2. Determine winning card(s)
    const winningCardIndices = determineWinner(currentCards);

    let outcomeMessages = []; // Use an array to build messages
    let humanMoveAmount = 0;  // Initialize movement for the round
    let aiMoveAmount = 0;      // Initialize movement for the round

    // 3. AI's Bet Display (show this before outcomes)
    let aiBetSummary = "AI bets: ";
    aiGeneratedBet.betsArray.forEach((bet, index) => {
        if (bet > 0) {
            aiBetSummary += `${bet} on Scenario ${index + 1}; `;
        }
    });
    if (aiGeneratedBet.betsArray.every(b => b === 0)) {
         aiBetSummary = "AI chose not to bet."; // Should not happen with current AI
    }
    aiBetDisplayP.textContent = aiBetSummary.trim();


    // 4. Player's outcome - Calculate net movement based on tokens bet on winning/losing cards
    let netHumanMove = 0;
    if (playerBet && playerBet.betsOnCards && playerBet.betsOnCards.length === 3) {
        for (let i = 0; i < 3; i++) {
            const tokensPlayerBetOnCard = playerBet.betsOnCards[i];
            if (tokensPlayerBetOnCard > 0) {
                if (winningCardIndices.includes(i)) {
                    netHumanMove += tokensPlayerBetOnCard; // Move forward by tokens bet on correct card
                } else {
                    netHumanMove -= tokensPlayerBetOnCard; // Move backward by tokens bet on incorrect card
                }
            }
        }
    }
    humanMoveAmount = netHumanMove;
    // Specific win/loss messages per card removed for now, net movement message will be primary.
    if (totalPlayerTokensBet > 0) {
        outcomeMessages.push(`You wagered a total of ${totalPlayerTokensBet} token(s).`);
    } else if (humanTokensCurrentRound === 0 && totalPlayerTokensBet === 0) { // Check if player had no tokens to bet
         outcomeMessages.push("You had no tokens to bet this round.");
    } else { // No tokens bet, but had tokens available (should be blocked by UI)
         outcomeMessages.push("You chose not to place any tokens.");
    }


    // 5. AI's outcome - Calculate net movement based on tokens bet on winning/losing cards
    let netAiMove = 0;
    const totalAiTokensWagered = aiGeneratedBet.betsOnCards.reduce((sum, bet) => sum + bet, 0);
    if (aiGeneratedBet && aiGeneratedBet.betsOnCards && aiGeneratedBet.betsOnCards.length === 3) {
        for (let i = 0; i < 3; i++) {
            const tokensAiBetOnCard = aiGeneratedBet.betsOnCards[i];
            if (tokensAiBetOnCard > 0) {
                if (winningCardIndices.includes(i)) {
                    netAiMove += tokensAiBetOnCard;
                } else {
                    netAiMove -= tokensAiBetOnCard;
                }
            }
        }
    }
    aiMoveAmount = netAiMove;
    // Messages about AI's specific card wins/losses can be inferred from its net movement.
    // The AI bet summary is already displayed.

    // 6. Announce winning card(s)
    if (winningCardIndices.length > 0) {
        const winnerText = winningCardIndices.map(idx => `Scenario ${idx + 1} (${currentCards[idx].casualties} casualties)`).join(' and ');
        outcomeMessages.push(`Highest casualty count was from: ${winnerText}.`);
    } else {
        outcomeMessages.push("No card had the highest casualties (this indicates an issue).");
    }

    // --- Update Map Positions ---
    const previousHumanMapPos = humanMapPosition; // Capture position before any movement this round
    const previousAiMapPos = aiMapPosition;

    // Calculate potential new positions
    let potentialNewHumanPos = previousHumanMapPos + humanMoveAmount;
    let potentialNewAiPos = previousAiMapPos + aiMoveAmount;

    // Apply Checkpoint "Safe Space" Logic for backward movement
    if (humanMoveAmount < 0) {
        let stoppedAtCheckpoint = false;
        for (const cp of CHECKPOINTS.slice().reverse()) {
            if (previousHumanMapPos >= cp && potentialNewHumanPos < cp) {
                potentialNewHumanPos = cp; // Stop at this checkpoint
                outcomeMessages.push(`You moved backward but stopped safely at checkpoint ${cp}.`);
                stoppedAtCheckpoint = true;
                break;
            }
        }
        if (!stoppedAtCheckpoint) { // If not stopped by a checkpoint, normal backward message
             outcomeMessages.push(`You moved backward ${Math.abs(humanMoveAmount)} spaces.`);
        }
    } else if (humanMoveAmount > 0) {
        outcomeMessages.push(`You moved forward ${humanMoveAmount} spaces.`);
    }

    if (aiMoveAmount < 0) {
        let stoppedAtCheckpointAi = false;
        for (const cp of CHECKPOINTS.slice().reverse()) {
            if (previousAiMapPos >= cp && potentialNewAiPos < cp) {
                potentialNewAiPos = cp; // AI stops at this checkpoint
                outcomeMessages.push(`AI moved backward but stopped safely at checkpoint ${cp}.`);
                stoppedAtCheckpointAi = true;
                break;
            }
        }
        if (!stoppedAtCheckpointAi) {
            outcomeMessages.push(`AI moved backward ${Math.abs(aiMoveAmount)} spaces.`);
        }
    } else if (aiMoveAmount > 0) {
        outcomeMessages.push(`AI moved forward ${aiMoveAmount} spaces.`);
    }

    // Update final map positions with clamping
    humanMapPosition = Math.max(MAP_START_POSITION, Math.min(potentialNewHumanPos, MAP_END_POSITION));
    aiMapPosition = Math.max(MAP_START_POSITION, Math.min(potentialNewAiPos, MAP_END_POSITION));

    // --- Checkpoint Bonus Logic (REMOVED) ---
    // CHECKPOINTS.forEach(cp => { ... });

    // Update scores (humanScore/aiScore are now only for tie-breaking if both reach end, or if we re-add other bonuses)
    // No direct score changes from checkpoints anymore.
    humanScoreSpan.textContent = humanScore;
    aiScoreSpan.textContent = aiScore;

    updateMapDisplay(); // Update map visuals

    roundOutcomeMessageP.innerHTML = outcomeMessages.join('<br>');

    // --- Game End Condition ---
    const humanReachedEnd = humanMapPosition >= MAP_END_POSITION;
    const aiReachedEnd = aiMapPosition >= MAP_END_POSITION;
    let gameOver = false;

    if (humanReachedEnd || aiReachedEnd) {
        gameOver = true;
        let finalMessage = "";
        if (humanReachedEnd && !aiReachedEnd) {
            finalMessage = "Congratulations! You reached the end first and won the game!";
        } else if (aiReachedEnd && !humanReachedEnd) {
            finalMessage = "The AI reached the end first. Better luck next time!";
        } else { // Both reached end in the same round
            if (humanMapPosition > aiMapPosition) { // Should not happen if both capped at MAP_END_POSITION
                finalMessage = "You both reached the end! You are slightly further ahead and win!";
            } else if (aiMapPosition > humanMapPosition) {
                finalMessage = "You both reached the end! AI is slightly further ahead and wins!";
            } else { // Exact tie on map position
                 finalMessage = `It's a TIE! Both reached ${MAP_END_POSITION}. `;
                 if (humanScore > aiScore) finalMessage += "You win on bonus score!";
                 else if (aiScore > humanScore) finalMessage += "AI wins on bonus score!";
                 else finalMessage += "And bonus scores are tied too! What a match!";
            }
        }
        roundOutcomeMessageP.innerHTML += `<br><strong>GAME OVER: ${finalMessage}</strong>`;
        placeBetBtn.disabled = true;
        nextRoundBtn.disabled = true; // Disable next round button permanently
        nextRoundBtn.style.display = 'inline-block'; // Keep it visible but disabled
    }

    // Update button states if game is not over
    if (!gameOver) {
        placeBetBtn.disabled = true;
        nextRoundBtn.style.display = 'inline-block';
        nextRoundBtn.disabled = false;
    }
    // cardChoiceRadios.forEach(radio => radio.disabled = true); // These are removed
    tokenInputs.forEach(input => input.disabled = true); // Disable token inputs after bet

    console.log("Round resolved (structural changes for distributed betting - movement logic next).");
}


// Event Listeners & Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeDeck();
    startNewRound(); // Start the first round
    console.log("Game initialized and first round started.");

    placeBetBtn.addEventListener('click', resolveRound);
    nextRoundBtn.addEventListener('click', startNewRound);

    tokenInputs.forEach(input => {
        input.addEventListener('input', updateTokenDisplayAndValidation);
    });
});
