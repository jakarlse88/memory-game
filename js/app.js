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
 * Flags
 * 
 */

let previousCardOpen = false;

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
    $('.card').click(function(e) {
        if (previousCardOpen) {
            // Cards match 
            if ($(openCards)[0].find('img').attr('alt') === $(this).find('img').attr('alt') &&
                !openCards[0].is($(this))) {
                console.log(`${$(openCards)[0].find('img').attr('alt')} and ${$(this).find('img').attr('alt')} are a match!`);

                // Add cards to finishedCards
                addToFinished($(this), openCards[0]);

                // Clear openCards
                clearOpen();
                previousCardOpen = false;
            } 
            // Cards do not match
            else {
                console.log(`card non-match`); // debug
                console.log($(this));

                hideCard(openCards[0]);
                hideCard($(this));

                previousCardOpen = false;
                // setTimeout(function() {
                //     // Hide cards
                //     hideCard($(this));
                //     hideCard(openCards[0]);
                    
                //     // Clear openCards
                //     clearOpen();    
                // }, 100);
            }
        } else {
            previousCardOpen = true;
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
    let existsInList = false;
    
    for (let i = 0; i < finishedCards.length; i++) {
        if ($(finishedCards[i]).find('img').attr('alt') === $(cardOne).find('img').attr('alt')||
            $(finishedCards[i]).find('img').attr('alt') === $(cardTwo).find('img').attr('alt')) {
            
                existsInList = true;
        }
    }
    
    if (!existsInList) {
        finishedCards.push(cardOne);
        finishedCards.push(cardTwo);
    }
}

// Clear list of "open" cards
function clearOpen() {
    while (openCards.length >= 1) {
        openCards.shift();
    }
}

// Hide card symbol
function hideCard(card) {
    card.children('.front').toggleClass('hide');
    card.children('.back').toggleClass('hide');
}