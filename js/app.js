// Card data
const listOfCards = [
  {
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

// Event listener for card
function cardEvents(evt) {
  // "Open" and "finished" cards
  const finishedCards = [];
  const openCards = [];

  // Show clicked card's symbol and add to list of open cards
  showCard(evt);
  // Add clicked card to open cards list
  addToList(openCards, evt.target);

  // A card is already open
  if (openCards.length > 1) {
    // Open cards match
    if (openCards[0].name === openCards[1].name) {
      addToList(finishedCards, openCards[0]);
      addToList(finishedCards, openCards[1]);

      openCards.shift();
      openCards.shift();
    } else {
      // No match; hide cards...
      const firstCard = document.querySelector(openCards[0].id);
      firstCard.firstElementChild.classList.add('hide');
      firstCard.lastElementChild.classList.remove('hide');

      const secondCard = document.querySelector(openCards[1].id);
      secondCard.lastElementChild.classList.add('hide');
      secondCard.lastElementChild.classList.remove('hide');

      // ... and clear list of opens
      openCards.shift();
      openCards.shift();
    }

    // Increment and display move counter
    incrementMoves();

    // If all cards are matched, display message with final score
    if (finishedCards.length === 15) {
      // Access modal, close button
      const modal = document.querySelector('#winModal');
      const closeBtn = document.querySelector('#closeBtn');

      // Close window on button click
      closeBtn.addEventListener('click', function(evt) {
        modal.style.display = 'none';
      });

      // Close window on click anywhere outside modal
      window.addEventListener('click', function(evt)) {
        if (event.target != modal) {
          modal.style.display = 'none';
        }
      };
    }
  }
}

// Show clicked card's symbol
function showCard(evt) {
  if (this.firstElementChild.classList.contains('hide') &&
      !this.lastElementChild.classList.contains('hide')) {
    this.firstElementChild.classList.remove('hide');
    this.lastElementChild.classList.add('hide');
  }
}

// Hide specified card's symbol
// TODO: implement
function hideCard(evt) {
}

// Add given card to given list
function addToList(list, card) {
  list.push(card.id);
}

// Increment move counter and publish
function incrementMoves() {
  const container = document.querySelector('#moves').firstElementChild;
  let moves = parseInt(container.innerText);
  moves++;
  container.innerText = moves;
}
