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
};
