/*
 *
 * Data
 * 
 */

// List holding all cards
const cards = [
    'kanji_1.svg',
    'kanji_2.svg',
    'kanji_3.svg',
    'kanji_4.svg',
    'kanji_5.svg',
    'kanji_6.svg',
    'kanji_7.svg',
    'kanji_8.svg',
    'kanji_1.svg',
    'kanji_2.svg',
    'kanji_3.svg',
    'kanji_4.svg',
    'kanji_5.svg',
    'kanji_6.svg',
    'kanji_7.svg',
    'kanji_8.svg'
    ];

const cardHTML = [];

/*
 *
 * Logic
 * 
 */

// Display cards to page
$(function() {
    // Shuffle "deck"
    shuffle(cards);

    // Create card HTML
    createCardHTML(cards);

    // Add each card to page
    let counter = 0;

    $('.card').each(function() {
        $(this).children(".front").prepend(cardHTML[counter]);
        counter++;
    });
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

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
        cardHTML[i] = `<img/symbols/${array[i]}>`;
    }
}