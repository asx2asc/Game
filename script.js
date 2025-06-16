document.addEventListener('DOMContentLoaded', () => {
    // Card Data
    const cards = [
        // AorB Cards
        {
            type: 'AorB',
            scenarioA: 'Being killed by a shark.',
            scenarioB: 'Being killed by a vending machine.',
            answer: 'B', // Vending machines are surprisingly dangerous
            explanation: 'Roughly 2-4 people die from vending machines per year in the US (they fall on them when trying to shake them). Shark fatalities are rarer, averaging about 1 per year globally in recent years, though it varies.'
        },
        {
            type: 'AorB',
            scenarioA: 'Dying from a bee sting.',
            scenarioB: 'Dying from a dog attack.',
            answer: 'A', // Bee stings (anaphylaxis) cause more deaths in the US.
            explanation: 'In the U.S., bee, wasp, and hornet stings account for around 50-100 deaths per year. Deaths from dog attacks are lower, typically 30-50 per year.'
        },
        {
            type: 'AorB',
            scenarioA: 'Being dealt a Royal Flush in a game of poker (5 card draw).',
            scenarioB: 'Winning an Olympic gold medal.',
            answer: 'B', // Odds for Royal Flush are ~1 in 650,000. Many more Olympic medals awarded.
            explanation: 'The odds of being dealt a Royal Flush are approximately 1 in 649,740. The number of Olympic gold medals awarded is in the hundreds every 2 years (Summer/Winter). More people have won gold medals than have been dealt a royal flush on the first hand.'
        },
        {
            type: 'AorB',
            scenarioA: 'The population of New York City.',
            scenarioB: 'The number of active Facebook users.',
            answer: 'B',
            explanation: 'Facebook has billions of active users, far exceeding NYC\'s population of ~8.5 million.'
        },
        {
            type: 'AorB',
            scenarioA: 'Dying from an asteroid impact (global catastrophe).',
            scenarioB: 'Dying in a car accident during a 500-mile trip.',
            answer: 'B', // Car accidents are far more common.
            explanation: 'The lifetime risk of dying in a car accident is around 1 in 107. The risk of dying from a global asteroid impact is estimated at 1 in 700,000 to 1 in 1.6 million, though these are very rough, long-term estimates.'
        },
        // Coconut Cards (vs. Death by Coconut - estimated odds 1 in 250 million)
        {
            type: 'Coconut',
            coconutScenario: 'Winning the Powerball Grand Prize (US lottery).',
            answerMoreLikely: false, // Powerball odds are worse, e.g., 1 in 292 million
            explanation: 'The odds of winning the Powerball jackpot are approximately 1 in 292.2 million, making it less likely than dying from a falling coconut (estimated at 1 in 250 million, though this is a very rough estimate).'
        },
        {
            type: 'Coconut',
            coconutScenario: 'Being struck by lightning in your lifetime.',
            answerMoreLikely: true, // Odds of being struck by lightning in a lifetime (US) ~1 in 15,300
            explanation: 'The odds of being struck by lightning in an 80-year lifetime in the U.S. are about 1 in 15,300. This is far more likely than death by coconut.'
        },
        {
            type: 'Coconut',
            coconutScenario: 'Becoming President of the United States.',
            answerMoreLikely: true, // ~45 presidents out of ~330 million people. Odds are low but better than coconuts.
            explanation: 'There have been 46 presidents of the United States. With a US population of over 330 million, the odds are very low, but still significantly higher than the estimated 1 in 250 million chance of dying from a coconut.'
        },
        {
            type: 'Coconut',
            coconutScenario: 'Dating a millionaire.',
            answerMoreLikely: true, // There are millions of millionaires in the US alone.
            explanation: 'There are over 20 million millionaires in the U.S. alone. While not everyone will date one, the probability is vastly higher than death by coconut.'
        },
        {
            type: 'Coconut',
            coconutScenario: 'Being a victim of a shark attack (not necessarily fatal).',
            answerMoreLikely: true, // Non-fatal shark attacks are more common than coconut deaths.
            explanation: 'The odds of a non-fatal shark attack are estimated to be around 1 in 11.5 million for surfers, and lower for general beachgoers, but still much more probable than the 1 in 250 million chance of death by coconut.'
        }
        // Add more diverse cards
    ];

    let currentCard = null; // Will store the card object, not just index
    let humanScore = 0;
    let aiScore = 0;
    let isHumanTurnToGuess = true; // true for human, false for AI

    // DOM Elements
    const readerInfoDiv = document.getElementById('reader-info');
    const questionAreaDiv = document.getElementById('question-area'); // To hide/show all questions
    const scenarioADiv = document.getElementById('scenario-a');
    const scenarioBDiv = document.getElementById('scenario-b');
    const coconutScenarioDiv = document.getElementById('coconut-scenario');
    const btnA = document.getElementById('btn-a'); // Text: A
    const btnB = document.getElementById('btn-b'); // Text: B
    const btnMore = document.getElementById('btn-more'); // Text: More Likely
    const btnLess = document.getElementById('btn-less'); // Text: Less Likely
    const revealAreaDiv = document.getElementById('reveal-area');
    const player1ScoreSpan = document.getElementById('player1-score'); // Will be updated to humanScoreSpan later if needed by ID
    const player2ScoreSpan = document.getElementById('player2-score'); // Will be updated to aiScoreSpan later if needed by ID
    const drawCardBtn = document.getElementById('draw-card-btn');
    // const answerOptionsDiv = document.getElementById('answer-options'); // Not strictly needed if buttons are manipulated directly

    function updateScores() {
        player1ScoreSpan.textContent = humanScore; // HTML ID is player1-score
        player2ScoreSpan.textContent = aiScore;   // HTML ID is player2-score
    }

    function hideAllScenarios() {
        scenarioADiv.style.display = 'none';
        scenarioBDiv.style.display = 'none';
        coconutScenarioDiv.style.display = 'none';
        questionAreaDiv.style.display = 'none'; // Hide the whole area
    }

    function hideAnswerButtons() {
        btnA.style.display = 'none';
        btnB.style.display = 'none';
        btnMore.style.display = 'none';
        btnLess.style.display = 'none';
    }

    function setupGame() {
        updateScores();
        isHumanTurnToGuess = true; // Human starts
        readerInfoDiv.textContent = "Your turn to guess. Click 'Draw Card'.";
        drawCardBtn.disabled = false;
        hideAllScenarios();
        hideAnswerButtons();
        revealAreaDiv.style.display = 'none';
    }

    function drawCard() {
        if (cards.length === 0) {
            readerInfoDiv.textContent = "Game Over!";
            // Final winner text is already fine
            if (humanScore > aiScore) {
                revealAreaDiv.textContent = `Human Wins! ${humanScore} to ${aiScore}`;
            } else if (aiScore > humanScore) {
                revealAreaDiv.textContent = `AI Wins! ${aiScore} to ${humanScore}`;
            } else {
                revealAreaDiv.textContent = `It's a Tie! ${humanScore} to ${aiScore}`;
            }
            revealAreaDiv.style.display = 'block';
            drawCardBtn.disabled = true;
            hideAllScenarios();
            hideAnswerButtons();
            return;
        }

        const cardIndex = Math.floor(Math.random() * cards.length);
        currentCard = cards[cardIndex];
        cards.splice(cardIndex, 1); // Remove card from deck

        console.log("Drawn card:", currentCard);
        hideAllScenarios();
        hideAnswerButtons();
        revealAreaDiv.style.display = 'none';
        questionAreaDiv.style.display = 'block';
        drawCardBtn.disabled = true; // Disable until choice is made or AI has chosen

        if (isHumanTurnToGuess) {
            readerInfoDiv.textContent = "Your turn: Read the scenarios and make your choice.";
            if (currentCard.type === 'AorB') {
                scenarioADiv.textContent = "A: " + currentCard.scenarioA;
                scenarioBDiv.textContent = "B: " + currentCard.scenarioB;
                scenarioADiv.style.display = 'block';
                scenarioBDiv.style.display = 'block';
                btnA.style.display = 'inline-block';
                btnB.style.display = 'inline-block';
            } else if (currentCard.type === 'Coconut') {
                coconutScenarioDiv.textContent = currentCard.coconutScenario;
                coconutScenarioDiv.style.display = 'block';
                btnMore.style.display = 'inline-block';
                btnLess.style.display = 'inline-block';
            }
        } else { // AI's turn
            readerInfoDiv.textContent = "AI is thinking...";
            // Display the question for AI too (optional, but good for transparency)
             if (currentCard.type === 'AorB') {
                scenarioADiv.textContent = "A: " + currentCard.scenarioA;
                scenarioBDiv.textContent = "B: " + currentCard.scenarioB;
                scenarioADiv.style.display = 'block';
                scenarioBDiv.style.display = 'block';
            } else if (currentCard.type === 'Coconut') {
                coconutScenarioDiv.textContent = currentCard.coconutScenario;
                coconutScenarioDiv.style.display = 'block';
            }
            // AI makes a guess after a short delay for effect
            setTimeout(() => {
                const aiGuess = getAIGuess(currentCard.type);
                handleAnswer(aiGuess, false); // Pass AI's guess and isHumanGuess = false
            }, 1500); // 1.5 second delay
        }
    }

    function handleAnswer(choice, isHumanGuess) { // Added isHumanGuess parameter
        if (!currentCard) return;

        let correct = false;
        let correctAnswerText = "";

        if (currentCard.type === 'AorB') {
            correct = (choice === currentCard.answer);
            correctAnswerText = currentCard.answer === 'A' ? currentCard.scenarioA : currentCard.scenarioB;
        } else if (currentCard.type === 'Coconut') {
            if (choice === 'More' && currentCard.answerMoreLikely) correct = true;
            if (choice === 'Less' && !currentCard.answerMoreLikely) correct = true;
            correctAnswerText = currentCard.answerMoreLikely ? "More Likely" : "Less Likely";
        }

        const chosenBy = isHumanGuess ? "You" : "AI";
        revealAreaDiv.innerHTML = `${chosenBy} chose: ${choice}.<br>`;

        if (correct) {
            revealAreaDiv.innerHTML += "Correct! +1 point. ";
            if (isHumanGuess) {
                humanScore++;
            } else {
                aiScore++;
            }
        } else {
            if (currentCard.type === 'Coconut') {
                revealAreaDiv.innerHTML += "Incorrect! That's a Death by Coconut! -1 point. ";
                if (isHumanGuess) {
                    humanScore = Math.max(0, humanScore - 1);
                } else {
                    aiScore = Math.max(0, aiScore - 1);
                }
            } else { // AorB card incorrect
                revealAreaDiv.innerHTML += "Incorrect. No points gained or lost. ";
            }
        }
        updateScores(); // Update scores after potential penalty or gain
        revealAreaDiv.innerHTML += `The answer was ${correctAnswerText}.<br>Explanation: ${currentCard.explanation}`;
        revealAreaDiv.style.display = 'block';

        hideAnswerButtons();
        isHumanTurnToGuess = !isHumanTurnToGuess; // Toggle turn

        if (cards.length === 0) {
            drawCard(); // This will trigger the game over condition (and update readerInfoDiv)
        } else {
            if (isHumanTurnToGuess) {
                readerInfoDiv.textContent = "Your turn to guess. Click 'Draw Card'.";
            } else {
                readerInfoDiv.textContent = "AI's turn next. Click 'Draw Card'.";
            }
            drawCardBtn.disabled = false; // Allow drawing next card
        }
        currentCard = null; // Reset current card after handling answer
    }

    // Event Listeners
    drawCardBtn.addEventListener('click', drawCard); // drawCard now handles turn logic
    btnA.addEventListener('click', () => handleAnswer('A', true)); // True for human guess
    btnB.addEventListener('click', () => handleAnswer('B', true)); // True for human guess
    btnMore.addEventListener('click', () => handleAnswer('More', true)); // True for human guess
    btnLess.addEventListener('click', () => handleAnswer('Less', true)); // True for human guess

    // Initialize Game
    setupGame();

    function getAIGuess(cardType) {
        if (cardType === 'AorB') {
            return Math.random() < 0.5 ? 'A' : 'B';
        } else if (cardType === 'Coconut') {
            return Math.random() < 0.5 ? 'More' : 'Less';
        }
        return null; // Should not happen with current card data
    }
});
