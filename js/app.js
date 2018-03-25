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

// Star rating
let stars = 3;

// Star ID
let starId;

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
    // Validate that the card is not already open
    let isAlreadyOpen;

    for (let i = 0; i < openCards.length; i++) {
        if ($(openCards[i]).find('img').attr('alt') === ($(this).find('img').attr('alt'))) {
            isAlreadyOpen = true;
        }
    }
    // Validate that the card is face-down
    if (!isAlreadyOpen) {
        if ($(this).children('.front').hasClass('hide') &&
            !$(this).children('.back').hasClass('hide')) {
            // Show front/hide back of card, animate
            $(this).children('.front').toggleClass('hide');
            $(this).children('.back').toggleClass('hide');
            $(this).children('.front').toggleClass('flip-in-hor-bottom');

            incrementMoveCounter();
        }
    }
}

// Add card to list of "open" cards
function addToOpen(e) {
    if (openCards.length <= 2) {
        openCards.push(this);
    }
}

// Add cards to list of "finished" cards
function addToFinished(card) {
    let existsInList = false;

    // Validate that card is not already in list
    for (let i = 0; i < finishedCards.length; i++) {
        if ($(finishedCards[i]).find('img').attr('alt') === $(this).find('img').attr('alt')) {
            existsInList = true;
        }
    }

    // Add card
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
    $(card).children('.front').toggleClass('wobble-hor-bottom');
    setTimeout(function() {
        $(card).children('.front').toggleClass('hide');
        $(card).children('.back').toggleClass('hide');
    }, 500);
}

// Check for card match
function checkForMatch(e) {
    // A card is open
    if (openCards.length > 1) {
        // Cards match 
        if ($(openCards[0]).find('img').attr('alt') === $(this).find('img').attr('alt') &&
            !$(this).is(openCards[0])) {

            // Match animation
            $(this).children('.front').toggleClass('jello-horizontal');
            $(openCards[0]).children('.front').toggleClass('jello-horizontal');

            // Add cards to finishedCards
            addToFinished(this);
            addToFinished(openCards[0]);

            // Clear openCards
            clearOpen();
        }
        // Cards do not match
        else {
            setTimeout(function () {
                hideCard(openCards[0]);
                hideCard(openCards[1]);
                clearOpen();
            }, 500);
        }
    }
}

// Check for game finish
function checkFinished() {
    // All cards matched
    if (finishedCards.length === 16) {
        clearInterval(timerId);
        $('#seconds').text(timer);
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
    timerId = setInterval(function () {
        $('#game-timer').text(++timer, )
    }, 1000);
}

// Update rating
function updateStars() {
    starId = setInterval(function () {
        // 0-20 seconds: 3 stars
        if (timer >= 0 && timer <= 20) {
            stars = 3;
        } else if (timer >= 21 && timer <= 40) { // 21-40 seconds: 2 stars
            stars = 2;
            $('#thirdStar').replaceWith('<i class="far fa-star">');
            $('#modal-secondStar').replaceWith('<i class="far fa-star">');
        } else {// 41-60 seconds: 1 star
            stars = 1;
            $('#secondStar').replaceWith('<i class="far fa-star">');
            $('#modal-thirdStar').replaceWith('<i class="far fa-star">');
        }
    }, 500);
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

// Game timer 
$(function () {
    $('.page-wrapper').one('click', startGameTimer);
})

// Reset button
$(function () {
    $('#reset-btn').on('click', function () {
        location.reload();
    })
})

// Play again button
$(function () {
    $('#playAgain-btn').on('click', function () {
        location.reload();
    })
})

// Rating tracker
$(function () {
    updateStars();
})

// Card container animation
$(function() {
    $('.card').toggleClass('bounce-in-top');
    $('.card').children('.back').toggleClass('bounce-in-top');
})