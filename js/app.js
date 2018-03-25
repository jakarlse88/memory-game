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

// Clear list of "open" cards
function clearOpen() {
    while (openCards.length >= 1) {
        openCards.pop();
    }
}

// Hide card symbol
function hideCard(card) {
    // Mismatch animation
    $(card).children('.front').toggleClass('wobble-hor-bottom');
    // Clear mismatch animation for later re-use
    setTimeout(function() {
    $(card).children('.front').toggleClass('wobble-hor-bottom');
    }, 500);
    // Hide cards
    setTimeout(function() {
        $(card).children('.front').toggleClass('hide');
        $(card).children('.back').toggleClass('hide');
    }, 500);
}

// Check for game finish
// function checkFinished() {
//     // All cards matched
//     if (finishedCards.length === 16) {
//         clearInterval(timerId);
//         $('#seconds').text(timer);
//         $('.modal').css('display', 'block');
//     }
// }

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
        // >20 moves: 3 stars
        if (moveCounter >= 0 && moveCounter <= 20) {
            stars = 3;
        } else if (moveCounter >= 21 && moveCounter <= 40) { // 21-40 moves: 2 stars
            stars = 2;
            $('#thirdStar').replaceWith('<i class="far fa-star">');
            $('#modal-thirdStar').replaceWith('<i class="far fa-star">');
        } else {// 41+ moves: 1 star
            stars = 1;
            $('#secondStar').replaceWith('<i class="far fa-star">');
            $('#modal-secondStar').replaceWith('<i class="far fa-star">');
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
    $('.card').click(function() {
        // Validate that the card is face-down
        if ($(this).children('.front').hasClass('hide') &&
            !$(this).children('.back').hasClass('hide')) {
            // Show front/hide back of card, animate
            $(this).children('.front').toggleClass('hide');
            $(this).children('.back').toggleClass('hide');
            $(this).children('.front').toggleClass('flip-in-hor-bottom');
                
            incrementMoveCounter();
        }
    });

    // Add to list of open cards
    $('.card').click(function() {
        // Don't add the first-clicked card twice
        if (openCards.length <= 2 && !$(this).is(openCards[0])) {
            openCards.push(this);
        }
        console.log('openCards:');
        console.log(openCards);
    });

    // Card match/mismatch logic
    $('.card').click(function() {
        // Debug
        console.log(this);
        // A card is open
        if (openCards.length > 1) {
            // Cards match 
            if ($(openCards[0]).find('img').attr('alt') === $(this).find('img').attr('alt')) {

                // Match animation
                $(this).children('.front').toggleClass('jello-horizontal');
                $(openCards[0]).children('.front').toggleClass('jello-horizontal');

                // Add cards to finishedCards
                if (!$(this).hasClass('finished')) {
                    $(this).toggleClass('finished');
                    finishedCards.push(this);
                }

                if (!$(openCards[0]).hasClass('finished')) {
                    $(openCards[0]).toggleClass('finished');
                    finishedCards.push(openCards[0]);
                }
                
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
    });

    $('.card').click(function() {
        // All cards matched
        if (finishedCards.length === 16) {
            clearInterval(timerId);
            $('#seconds').text(timer);
            $('.modal').css('display', 'block');
        }
    });
})

// Game timer 
$(function () {
    $('.page-wrapper').one('click', startGameTimer);
})

// Reset button
$(function () {
    $('#reset-btn').on('click', function () {
        location.reload(true);
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