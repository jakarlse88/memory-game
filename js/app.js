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
                addToFinished($(this), openCards[0]);

                // Clear openCards
                clearOpen();
            } 
            // Cards do not match
            else if ($(openCards)[0].find('img').attr('alt') !== $(this).find('img').attr('alt') ||
            openCards[0].is($(this))) { 
                // Hide cards
                if (!$(this).children('.front').hasClass('hide') &&
                    $(this).children('.back').hasClass('hide')) {
                        $(this).children('.front').toggleClass('hide');
                        $(this).children('.back').toggleClass('hide');
                    }
                if (!openCards[0].children('.front').hasClass('hide') &&
                openCards[0].children('.back').hasClass('hide')) {
                    openCards[0].children('.front').toggleClass('hide');
                    openCards[0].children('.back').toggleClass('hide');
                }

                // Clear openCards
                clearOpen();
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
    openCards.push($(this));
}

// Add cards to list of "finished" cards
function addToFinished(cardOne, cardTwo) {
    finishedCards.push(cardOne);
    finishedCards.push(cardTwo);
}

// Clear list of "open" cards
function clearOpen() {
    while (openCards.length >= 1) {
        openCards.shift();
    }
}