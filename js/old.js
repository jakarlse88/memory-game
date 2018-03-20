// All of the cards
const listOfCards = [{
    name: 'One',
    image: 'kanji_1.svg',
    id: 'one'
  },
  {
    name: 'Two',
    image: 'kanji_2.svg',
    id: 'two'
  },
  {
    name: 'Three',
    image: 'kanji_3.svg',
    id: 'three'
  },
  {
    name: 'Four',
    image: 'kanji_4.svg',
    id: 'four'
  },
  {
    name: 'Five',
    image: 'kanji_5.svg',
    id: 'five'
  },
  {
    name: 'Six',
    image: 'kanji_6.svg',
    id: 'six'
  },
  {
    name: 'Seven',
    image: 'kanji_7.svg',
    id: 'seven'
  },
  {
    name: 'Eight',
    image: 'kanji_8.svg',
    id: 'eight'
  },
  {
    name: 'One',
    image: 'kanji_1.svg',
    id: 'one_2'
  },
  {
    name: 'Two',
    image: 'kanji_2.svg',
    id: 'two_2'
  },
  {
    name: 'Three',
    image: 'kanji_3.svg',
    id: 'three_2'
  },
  {
    name: 'Four',
    image: 'kanji_4.svg',
    id: 'four_2'
  },
  {
    name: 'Five',
    image: 'kanji_5.svg',
    id: 'five_2'
  },
  {
    name: 'Six',
    image: 'kanji_6.svg',
    id: 'six_2'
  },
  {
    name: 'Seven',
    image: 'kanji_7.svg',
    id: 'seven_2'
  },
  {
    name: 'Eight',
    image: 'kanji_8.svg',
    id: 'eight_2'
  }
];

// All of the card things
function cardEvents() {
  flipCard();
  displayCards();
}

// Display cards on the page
function displayCards() {
  // Shuffle the list of cards using the provided "shuffle" method below
  shuffle(listOfCards);

  // Loop through each card and create its HTML
  const cardHTML = [];

  for (let i = 0; i < listOfCards.length; i++) {
    cardHTML.push('<img src="img/symbols/' + listOfCards[i].image + '"' +
      ' id="' + listOfCards[i].id + '"' +
      ' alt="' + listOfCards[i].name + '">');
  }
  console.log(cardHTML);

  // Add each card's HTML to the page
  const cardContainers = document.getElementsByClassName('card');
  console.log(cardContainers);

  for (let i = 0; i < cardContainers.length; i++) {
    cardContainers[i].firstElementChild.innerHTML = cardHTML[i];
  }

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Show/hide card on click
function flipCard() {
  const cards = document.getElementsByClassName('card');

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function(evt) {

      if (this.firstElementChild.classList.contains('hide')) {
        this.firstElementChild.classList.remove('hide');
      } else {
        this.firstElementChild.classList.add('hide');
      }

      if (this.lastElementChild.classList.contains('hide')) {
        this.lastElementChild.classList.remove('hide');
      } else {
        this.lastElementChild.classList.add('hide');
      }
    });
  }
}

// Invoke events
cardEvents();

/* ---------------------------------------------------------------------------*/

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
