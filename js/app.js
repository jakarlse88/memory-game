/*
 *
 * Data
 * 
 */

// Array containing all cards
const cards = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8'
];

// Array containing card HTML
const cardHTML = [];

// Array containing "open" cards
const openCards = [];

// Array containing "finished" cards
const finishedCards = [];

// Move counter
let moveCounter = 0;

// Game timer
let timer = 0;

// Timer ID
let timerId;

/*
 *
 * Functions
 * 
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create card HTML
function createCardHTML(array) {
    for (let i = 0; i < cards.length; i++) {
        cardHTML[i] = `<img src="img/symbols/kanji_${array[i]}.svg"
                        alt="${array[i]}">`;
    }
}

// Display card symbol
function showCard(e) {
    if ($(this).children('.front').hasClass('hide') &&
        !$(this).children('.back').hasClass('hide')) {
            $(this).children('.front').toggleClass('hide');
            $(this).children('.back').toggleClass('hide');
    }
}

// Add card to list of "open" cards
function addToOpen(e) {
    openCards.push(this);
}

// Add cards to list of "finished" cards
function addToFinished(card) {
    let existsInList = false;

    for (let i = 0; i < finishedCards.length; i++) {
        if ($(finishedCards[i]).find('img').attr('alt') === $(this).find('img').attr('alt')) {
            existsInList = true;
        }
    }

    if (!existsInList) {
        finishedCards.push(card);
    }
}

// Clear list of "open" cards
function clearOpen() {
    while (openCards.length >= 1) {
        openCards.pop();
    }
}

// Hide card symbol
function hideCard(card) {
    $(card).children('.front').toggleClass('hide');
    $(card).children('.back').toggleClass('hide');
}

// Check for card match
function checkForMatch(e) {
    // A card is open
    if (openCards.length > 1) {
        // Cards match 
        if ($(openCards[0]).find('img').attr('alt') === $(this).find('img').attr('alt') &&
            !$(this).is(openCards[0])) {

            // Add cards to finishedCards
            addToFinished(this);
            addToFinished(openCards[0]);

            // Clear openCards
            clearOpen();
        }
        // Cards do not match
        else {
            setTimeout(function() {
                hideCard(openCards[0]);
                hideCard(openCards[1]);
                clearOpen();
            }, 500);
        }
    }
    incrementMoveCounter();
}

// Check for game finish
function checkFinished() {
    // All cards matched
    if (finishedCards.length === 16) {
        clearInterval(timerId);
        $('.modal').css('display', 'block');
    }
}

// Increment and display moveCounter
function incrementMoveCounter() {
    $('#move-counter').text(++moveCounter);
}

// Adds each card to the page
function addCardsToPage() {
    let counter = 0;

    // Loop through each card container and add card HTML
    $('.card').each(function () {
        $(this).children(".front").prepend(cardHTML[counter]);
        counter++;
    });
}

// Game timer 
function startGameTimer() {
    timerId = setInterval(function() {
        $('#game-timer').text(++timer)}, 1000);
}

/*
 *
 * Logic
 * 
 */

// Display cards to page
$(function () {
    shuffle(cards);

    createCardHTML(cards);

    addCardsToPage();
})

// Card event listener
$(function () {
    // Display card symbol
    $('.card').click(showCard);

    // Add to list of open cards
    $('.card').click(addToOpen);

    // Card match/mismatch logic
    $('.card').click(checkForMatch);

    $('.card').click(checkFinished);
})

// Modal close button event listener
$(function () {
    $('#closeBtn').click(function() {
        $('.modal').css('display', 'none');
    });
})

// Game timer 
$(function() {
    $('#start-btn').one('click', startGameTimer);
})

// Reset button
$(function() {
    $('#reset-btn').on('click', function() {
        location.reload();
    })
})

// Play again button
$(function() {
    $('#playAgain-btn').on('click', function() {
        location.reload();
    })
})