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
    let readerPlayer = 1; // Player 1 starts as the Reader
    let guesserPlayer = 2; // Player 2 starts as the Guesser
    let player1Score = 0;
    let player2Score = 0;

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
    const player1ScoreSpan = document.getElementById('player1-score');
    const player2ScoreSpan = document.getElementById('player2-score');
    const drawCardBtn = document.getElementById('draw-card-btn');
    // const answerOptionsDiv = document.getElementById('answer-options'); // Not strictly needed if buttons are manipulated directly

    function updateScores() {
        player1ScoreSpan.textContent = player1Score;
        player2ScoreSpan.textContent = player2Score;
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
        readerInfoDiv.textContent = `Player ${readerPlayer} is the Reader. Player ${guesserPlayer} guesses.`;
        drawCardBtn.disabled = false;
        hideAllScenarios();
        hideAnswerButtons();
        revealAreaDiv.style.display = 'none';
    }

    function drawCard() {
        if (cards.length === 0) {
            readerInfoDiv.textContent = "No more cards! Game Over.";
            if (player1Score > player2Score) {
                revealAreaDiv.textContent = `Player 1 Wins! ${player1Score} to ${player2Score}`;
            } else if (player2Score > player1Score) {
                revealAreaDiv.textContent = `Player 2 Wins! ${player2Score} to ${player1Score}`;
            } else {
                revealAreaDiv.textContent = `It's a Tie! ${player1Score} to ${player2Score}`;
            }
            revealAreaDiv.style.display = 'block';
            drawCardBtn.disabled = true;
            hideAllScenarios();
            hideAnswerButtons();
            return;
        }

        const cardIndex = Math.floor(Math.random() * cards.length);
        currentCard = cards[cardIndex];
        cards.splice(cardIndex, 1); // Remove card from deck so it's not drawn again

        console.log("Drawn card:", currentCard);
        hideAllScenarios(); // Clear previous card
        hideAnswerButtons();
        revealAreaDiv.style.display = 'none';
        questionAreaDiv.style.display = 'block'; // Show the question area

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
        drawCardBtn.disabled = true;
        readerInfoDiv.textContent = `Player ${guesserPlayer} is guessing. (Reader: Player ${readerPlayer})`;
    }

    function handleAnswer(choice) {
        if (!currentCard) return; // No card active

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

        revealAreaDiv.innerHTML = `The Guesser chose: ${choice}.<br>`;
        if (correct) {
            revealAreaDiv.innerHTML += "Correct! ";
            if (guesserPlayer === 1) {
                player1Score++;
            } else {
                player2Score++;
            }
        } else {
            if (currentCard.type === 'Coconut') {
                revealAreaDiv.innerHTML += "Incorrect! That's a Death by Coconut! -1 point. ";
                if (guesserPlayer === 1) {
                    player1Score = Math.max(0, player1Score - 1);
                } else {
                    player2Score = Math.max(0, player2Score - 1);
                }
            } else { // AorB card incorrect
                revealAreaDiv.innerHTML += "Incorrect. ";
            }
        }
        updateScores(); // Update scores after potential penalty or gain
        revealAreaDiv.innerHTML += `The answer was ${correctAnswerText}.<br>Explanation: ${currentCard.explanation}`;
        revealAreaDiv.style.display = 'block';

        hideAnswerButtons();

        // Switch roles
        let temp = readerPlayer;
        readerPlayer = guesserPlayer;
        guesserPlayer = temp;

        if (cards.length === 0) {
            drawCard(); // This will trigger the game over condition
        } else {
            readerInfoDiv.textContent = `Player ${readerPlayer} is the Reader. Player ${guesserPlayer} guesses. Click "Draw Card".`;
            drawCardBtn.disabled = false;
        }
        currentCard = null; // Reset current card after handling answer
    }

    // Event Listeners
    drawCardBtn.addEventListener('click', drawCard);
    btnA.addEventListener('click', () => handleAnswer('A'));
    btnB.addEventListener('click', () => handleAnswer('B'));
    btnMore.addEventListener('click', () => handleAnswer('More'));
    btnLess.addEventListener('click', () => handleAnswer('Less'));

    // Initialize Game
    setupGame();
});
