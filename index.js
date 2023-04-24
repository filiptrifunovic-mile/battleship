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
      locations: ["0", "0", "0"],
      hits: ["", "", ""],
    },
    {
      locations: ["0", "0", "0"],
      hits: ["", "", ""],
    },
    {
      locations: ["0", "0", "0"],
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
  generateShipLocations: function () {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },

  generateShip: function () {
    const direction = Math.floor(Math.random() * 2);
    let row;
    let col;
    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(
        Math.random() * (this.boardSize - (this.shipLength + 1))
      );
    } else {
      row = Math.floor(
        Math.random() * (this.boardSize - (this.shipLength + 1))
      );
      col = Math.floor(Math.random() * this.boardSize);
    }
    const newShipsLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipsLocations.push(row + "" + (col + i));
      } else {
        newShipsLocations.push(row + i + "" + col);
      }
    }
    return newShipsLocations;
  },
  collision: function (locations) {
    for (let i = 0; i < this.numShips; i++) {
      const ship = this.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },
};

// CONTROLER objekat, zaduzen je da spoji delove aplikacije
const controller = {
  guesses: 0,
  processGuess: function (guess) {
    const location = parseGuess(guess);
    if (location) {
      this.guesses++;
      const hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage(
          `You sank all my battleships, in ${this.guesses} guesses`
        );
        const fire = document.getElementById("fireButton");
        fire.setAttribute("disabled", true);
        fire.setAttribute("id", "fireButton2");
      }
    }
  },
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

//funkcija za poziv "fire" dugmeta prilikom klika, i pritiska enter dugmeta
function init() {
  const fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;

  const guessInput = document.getElementById("guessInput");
  guessInput.onkeydown = handleKeyPress;

  model.generateShipLocations();
}

function handleFireButton() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}

function handleKeyPress(e) {
  const fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;
