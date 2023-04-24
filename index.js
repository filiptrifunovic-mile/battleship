// VIEW objekat zaduzen je za updejtovanje UI-a(informacije o tome da li je brod pogodjen/promasen itd.)
const view = {
  displayMessage: function (msg) {
    const message = document.getElementById("messageArea");
    message.innerHTML = msg;
  },
  displayHit: function (location) {
    const hit = document.getElementById(location);
    hit.setAttribute("class", "hit");
  },
  displayMiss: function (location) {
    const miss = document.getElementById(location);
    miss.setAttribute("class", "miss");
  },
};

// MODEL objekat drzi stanje igre, i prati brodove(gde su, koliko ih ima, koliko je potopljeno)
const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,
  ships: [
    {
      locations: ["06", "16", "26"],
      hits: ["", "", ""],
    },
    {
      locations: ["24", "34", "44"],
      hits: ["", "", ""],
    },
    {
      locations: ["10", "11", "12"],
      hits: ["", "", ""],
    },
  ],
  fire: function (guess) {
    for (let i = 0; i < this.numShips; i++) {
      const ship = this.ships[i];
      const locations = ship.locations;
      const index = locations.indexOf(guess);

      if (index >= 0) {
        // pogodak
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT");

        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipSunk++;
        }

        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed!");
    return false;
  },
  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
};

// CONTROLER objekat, zaduzen je da spoji delove aplikacije
const controller = {
  guesses: 0,
  processGuess: function (guess) {},
};

// pomocna funkcija koja ce proveriti da li je input od igraca validan
function parseGuess(guess) {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("Please enter letter and number on the board!");
  } else {
    const firstChar = guess.charAt(0);
    const row = alphabet.indexOf(firstChar);
    const column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("That isn't on board!");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      column < 0 ||
      column >= model.boardSize
    ) {
      alert("Thats off the board!");
    } else {
      return row + column;
    }
  }
  return null;
}
