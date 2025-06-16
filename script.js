// Global constant for the master deck of cards
const masterDeck = [
    { scenario: "Downtown Apartment Fire", casualties: 12 },
    { scenario: "Highway Bus Crash", casualties: 35 },
    { scenario: "Train Derailment (Rural Area)", casualties: 75 },
    { scenario: "Food Poisoning Outbreak at Large Festival", casualties: 250 },
    { scenario: "Bridge Collapse During Rush Hour", casualties: 45 },
    { scenario: "Small Plane Crash (Suburban Area)", casualties: 4 },
    { scenario: "Stadium Stampede During Concert", casualties: 90 },
    { scenario: "Factory Explosion (Chemical Plant)", casualties: 22 },
    { scenario: "Amusement Park Ride Malfunction", casualties: 8 },
    { scenario: "Cruise Ship Capsizes in Storm", casualties: 450 },
    { scenario: "Tornado Hits Small Town", casualties: 110 },
    { scenario: "Earthquake in Major City (7.2 Richter)", casualties: 1200 },
    { scenario: "Volcano Eruption (Nearby Populated Area)", casualties: 550 },
    { scenario: "Major Freeway Pile-up (Foggy Conditions)", casualties: 18 },
    { scenario: "Building Collapse (Old Structure)", casualties: 28 },
    { scenario: "Ferry Sinking (Overcrowded)", casualties: 150 },
    { scenario: "Wildfire Engulfs Residential Area", casualties: 65 },
    { scenario: "Mining Accident (Cave-in)", casualties: 9 },
    { scenario: "Heatwave in Urban Area (Elderly Affected)", casualties: 210 },
    { scenario: "Blizzard Strands Motorists on Highway", casualties: 7 },
    { scenario: "Industrial Spill Contaminates Water Supply", casualties: 300 }
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

const cardChoiceRadios = document.querySelectorAll('input[name="card-choice"]');
const tokenAmountRadios = document.querySelectorAll('input[name="token-amount"]');
const placeBetBtn = document.getElementById('place-bet-btn');
const nextRoundBtn = document.getElementById('next-round-btn');

// Ensure the querySelector targets the <p> tag inside #ai-bet-display if one exists,
// or just the div itself if we're setting its textContent directly.
// Based on HTML, there's no <p> tag, so we'll select the div.
// Correction: HTML has <p>AI is thinking...</p>, so target that.
// If it's just one <p>, this is fine. If more, might need an ID on the <p>.
const aiBetDisplayP = document.getElementById('ai-bet-display').querySelector('p'); // Assuming one <p> for AI's bet text
const roundOutcomeMessageP = document.getElementById('round-outcome-message'); // This is a <p> element

// Game State Variables
let humanScore = 0;
let aiScore = 0;
let humanTokensCurrentRound = 3; // Player starts with 3 tokens each round
let deck = [];
let currentCards = []; // Array to hold the 3 cards in play

// --- Utility Functions ---
function initializeDeck() {
    deck = [...masterDeck]; // Shallow copy
    // Optional: Shuffle the deck. For example:
    // deck.sort(() => Math.random() - 0.5);
    console.log("Deck initialized with " + deck.length + " cards.");
}

function drawCardsAndDisplay(numCardsToDraw) {
    if (deck.length < numCardsToDraw) {
        initializeDeck(); // Reshuffle if not enough cards
        // Potentially add a message to UI about reshuffling
        console.log("Deck was low, reshuffled.");
        if (deck.length < numCardsToDraw) {
            // This should only happen if masterDeck has fewer than numCardsToDraw
            console.error("Not enough cards in masterDeck to draw required number.");
            alert("Error: Not enough unique cards available to continue the game!");
            return false; // Indicate failure
        }
    }

    currentCards = []; // Clear previous round's cards
    for (let i = 0; i < numCardsToDraw; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        currentCards.push(deck.splice(randomIndex, 1)[0]);
    }

    // Display cards
    currentCards.forEach((card, index) => {
        if (cardSlots[index]) {
            cardSlots[index].scenarioText.textContent = card.scenario;
            cardSlots[index].casualtyText.textContent = 'Casualties: ???';
            cardSlots[index].casualtyText.style.display = 'none'; // Initially hidden
        }
    });
    return true; // Indicate success
}

// --- Game Logic Functions ---
function startNewRound() {
    console.log("Starting new round...");
    if (!drawCardsAndDisplay(3)) {
        // Failed to draw cards, perhaps an alert was shown. Stop further round setup.
        placeBetBtn.disabled = true; // Disable betting if game cannot proceed
        return;
    }

    humanTokensCurrentRound = 3;
    humanTokensSpan.textContent = humanTokensCurrentRound;
    humanScoreSpan.textContent = humanScore;
    aiScoreSpan.textContent = aiScore;

    // Reset UI elements
    aiBetDisplayP.textContent = "AI is thinking..."; // Reset AI display
    roundOutcomeMessageP.textContent = "Place your bet for the current scenarios."; // Reset outcome message

    // Set default radio button selections
    if (cardChoiceRadios.length > 0) cardChoiceRadios[0].checked = true;
    if (tokenAmountRadios.length > 0) tokenAmountRadios[0].checked = true;

    // Enable radio buttons and place bet button
    cardChoiceRadios.forEach(radio => radio.disabled = false);
    tokenAmountRadios.forEach(radio => {
        radio.disabled = parseInt(radio.value) > humanTokensCurrentRound;
    });
    placeBetBtn.disabled = false;

    nextRoundBtn.style.display = 'none'; // Hide next round button
    console.log("New round setup complete. Player can bet.");
}

function getPlayerBet() {
    const chosenCardInput = document.querySelector('input[name="card-choice"]:checked');
    const chosenTokenInput = document.querySelector('input[name="token-amount"]:checked');

    let cardIndex = 0;
    if (chosenCardInput) {
        cardIndex = parseInt(chosenCardInput.value) - 1; // Convert 1-based HTML value to 0-based index
    } else {
        // Default to first card if somehow none is checked (should not happen with 'checked' in HTML)
        if (cardChoiceRadios.length > 0) cardChoiceRadios[0].checked = true;
    }

    let tokensBet = 0;
    if (chosenTokenInput) {
        tokensBet = parseInt(chosenTokenInput.value);
    } else {
        // Default to 1 token if somehow none is checked (should not happen)
        if (tokenAmountRadios.length > 0) tokenAmountRadios[0].checked = true;
        tokensBet = 1;
    }

    // Validate token amount against available tokens
    if (humanTokensCurrentRound === 0) {
        tokensBet = 0;
    } else if (tokensBet > humanTokensCurrentRound) {
        tokensBet = humanTokensCurrentRound; // Cap bet at available tokens
        // Update radio button to reflect this forced change (optional, but good UX)
        document.querySelector(`input[name="token-amount"][value="${tokensBet}"]`).checked = true;
    }

    return { cardIndex, tokens: tokensBet };
}

function getAIBet() {
    // AI randomly chooses one of the three cards (index 0, 1, or 2)
    const aiCardChoiceIndex = Math.floor(Math.random() * 3);
    // AI randomly chooses to bet 1, 2, or 3 tokens
    const aiTokensBet = Math.floor(Math.random() * 3) + 1;

    return { cardIndex: aiCardChoiceIndex, tokens: aiTokensBet };
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
    const playerBet = getPlayerBet();
    const aiGeneratedBet = getAIBet(); // Renamed to avoid conflict if we store AI bet globally

    // 1. Reveal casualties
    currentCards.forEach((card, index) => {
        cardSlots[index].casualtyText.textContent = `Casualties: ${card.casualties}`;
        cardSlots[index].casualtyText.style.display = 'block';
    });

    // 2. Determine winning card(s)
    const winningCardIndices = determineWinner(currentCards);

    let outcomeMessages = []; // Use an array to build messages

    // 3. AI's Bet Display (show this before outcomes)
    aiBetDisplayP.textContent = `AI bet ${aiGeneratedBet.tokens} token(s) on Scenario ${aiGeneratedBet.cardIndex + 1}.`;

    // 4. Player's outcome
    if (playerBet.tokens > 0) {
        if (winningCardIndices.includes(playerBet.cardIndex)) {
            humanScore += playerBet.tokens;
            outcomeMessages.push(`You bet ${playerBet.tokens} on Scenario ${playerBet.cardIndex + 1} and WON!`);
        } else {
            outcomeMessages.push(`You bet ${playerBet.tokens} on Scenario ${playerBet.cardIndex + 1} and lost.`);
        }
        humanTokensCurrentRound -= playerBet.tokens; // Player "spends" tokens
        if(humanTokensCurrentRound < 0) humanTokensCurrentRound = 0; // Safety, though getPlayerBet should prevent this.
    } else {
        outcomeMessages.push("You chose not to bet any tokens this round.");
    }

    // 5. AI's outcome
    if (winningCardIndices.includes(aiGeneratedBet.cardIndex)) {
        aiScore += aiGeneratedBet.tokens;
        outcomeMessages.push(`AI won its bet of ${aiGeneratedBet.tokens} token(s).`);
    } else {
        outcomeMessages.push(`AI lost its bet.`);
    }

    // 6. Announce winning card(s)
    if (winningCardIndices.length > 0) {
        const winnerText = winningCardIndices.map(idx => `Scenario ${idx + 1} (${currentCards[idx].casualties} casualties)`).join(' and ');
        outcomeMessages.push(`Highest casualty count was from: ${winnerText}.`);
    } else {
        outcomeMessages.push("No card had the highest casualties (this indicates an issue).");
    }

    // Update scores and token display
    humanScoreSpan.textContent = humanScore;
    aiScoreSpan.textContent = aiScore;
    humanTokensSpan.textContent = humanTokensCurrentRound; // Show tokens left *after* betting for the round

    roundOutcomeMessageP.innerHTML = outcomeMessages.join('<br>');

    // Update button states
    placeBetBtn.disabled = true;
    cardChoiceRadios.forEach(radio => radio.disabled = true);
    tokenAmountRadios.forEach(radio => radio.disabled = true);

    nextRoundBtn.style.display = 'inline-block'; // Or 'block' if it's full width
    nextRoundBtn.disabled = false;
    console.log("Round resolved.");
}


// Event Listeners & Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeDeck();
    startNewRound(); // Start the first round
    console.log("Game initialized and first round started.");

    placeBetBtn.addEventListener('click', resolveRound);
    nextRoundBtn.addEventListener('click', startNewRound);
});
