const SCORE = require("../constant/score.json");

class Card {
  constructor(card) {
    const [value, suit] = card.split("");
    this.suit = suit;
    this.value = value;
    this.score = SCORE[value];
  }
}

module.exports = Card;
