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

// Card event listener
$(function() {
    // Display card symbol
    $('.card').click(showCard);
    
    // Add to list of open cards
    $('.card').click(addToOpen);

    // If there is already an open card in the list,
    // check for match
    $('.card').click(function() {
        if (openCards.length > 1) {
            // Cards match 
            if ($(openCards)[0].find('img').attr('alt') === $(this).find('img').attr('alt') &&
                !openCards[0].is($(this))) {
                
                // Add cards to finishedCards
                finishedCards.push(openCards[0]);
                finishedCards.push($(this));

                // Clear openCards
                while (openCards.length >= 1) {
                    openCards.shift();
                }
            }
        }
    });
})

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
    // openCards.push($(this).find('img').attr('alt'));
    openCards.push($(this));
}