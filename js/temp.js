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

// Card containers
const containers = document.getElementsByClassName('card');

// Lists of "open" and "finished" cards
const openCards = [];
const finishedCards = [];

// Display cards to page
displayCards();

// Card event listener
for (let i = 0; i < containers.length; i++) {
  containers[i].addEventListener('click', function(e) {
    // Access card
    const card = this;

    // Display card's symbol
    showCard(card);

    // Add to list of open cards
    addToOpen(card);
    console.log(`openCards.length: ${openCards.length}`);

    // If list of open cards already contains a card,
    // check to see it matches current
    if (openCards.length > 1) {
      if (openCards[0].firstElementChild.firstElementChild.alt === card.firstElementChild.firstElementChild.alt) {
        addToFinished(openCards[0], card);
        clearOpen();
      } else {
        hideCard(openCards[0]);
        hideCard(card);
        clearOpen();
      }
    }
  });
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
  // console.log(cardHTML);

  for (let i = 0; i < containers.length; i++) {
    containers[i].firstElementChild.innerHTML = cardHTML[i];
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

// Show clicked card's symbol
function showCard(card) {
  console.log(`In showCard(), arg. card: ${card}`);
  if (card.firstElementChild.classList.contains('hide') &&
      !card.lastElementChild.classList.contains('hide')) {
    card.firstElementChild.classList.remove('hide');
    card.lastElementChild.classList.add('hide');
  }
}

// Hide given card
function hideCard(card) {
  console.log(`In hideCard(), arg. card: ${card}`);
  if (!card.firstElementChild.classList.contains('hide') &&
      card.lastElementChild.classList.contains('hide')) {
        card.firstElementChild.classList.add('hide');
        card.lastElementChild.classList.remove('hide');
      }
}

// Add card to list of openc cards
function addToOpen(card) {
  openCards.push(card);
}

// Add cards to list of finished cards
function addToFinished(firstCard, secondCard) {
  finishedCards.push(firstCard);
  finishedCards.push(secondCard);
}

// Clear list of open cards
function clearOpen() {
  while (openCards.length >= 1) {
    openCards.shift();
  }
}
