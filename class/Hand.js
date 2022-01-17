const Card = require("./Card");
const SCORE = require("../constant/score.json");
const RANK = require("../constant/rank.json");

class Hand {
  constructor(name, cards) {
    this.name = name;
    this.cards = cards
      .map((card) => new Card(card))
      .sort((a, b) => b.score - a.score);
    this.rank = 1;
    this.calculateScore();
    this.desc = RANK[this.rank];
  }

  calculateScore() {
    const isFlush = this.isFlush();
    const isStraight = this.isStraight();
    // straight flush
    if (isFlush && isStraight) {
      this.rank = 9;
      return;
    }

    const values = {};
    for (const card of this.cards) {
      values[card.value] = values[card.value] + 1 || 1;
    }

    // four of a kind
    if (this.isFourOfAKind(values)) {
      this.rank = 8;
      return;
    }

    const isThreeOfAKind = this.isThreeOfAKind(values);
    const isPair = this.isPair(values);
    // full house
    if (isThreeOfAKind && isPair) {
      this.rank = 7;
    }
    // flush
    else if (isFlush) {
      this.rank = 6;
    }
    // straight
    else if (isStraight) {
      this.rank = 5;
    }
    // three of a kind
    else if (isThreeOfAKind) {
      this.rank = 4;
    }
    // two pairs
    else if (this.isTwoPairs(values)) {
      this.rank = 3;
    }
    // pair
    else if (isPair) {
      this.rank = 2;
    }
  }

  isFlush() {
    const firstSuit = this.cards[0].suit;
    const restCards = this.cards.slice(1);
    return restCards.every(({ suit }) => suit === firstSuit);
  }

  isStraight() {
    let currentScore = this.cards[0].score;
    let consecutiveValue = true;

    for (let i = 1; i < 5 && consecutiveValue; i++) {
      const currentCard = this.cards[i];
      currentScore = currentScore - 1;
      consecutiveValue = currentCard.score === currentScore;
    }
    return consecutiveValue;
  }

  isFourOfAKind(values) {
    const value = Object.entries(values).find(([value, count]) => count === 4);
    this.fourOfAKindCard = value?.[0];
    return !!value;
  }

  isThreeOfAKind(values) {
    const value = Object.entries(values).find(([value, count]) => count === 3);
    this.threeOfAKindCard = value?.[0];
    return !!value;
  }

  isTwoPairs(values) {
    const [lowerPair, higherPair] = Object.entries(values).filter(
      ([_, count]) => count === 2
    );
    this.higherPairCard = higherPair?.[0] ?? lowerPair?.[0];
    this.lowerPairCard = higherPair && lowerPair?.[0];
    return !!(lowerPair && higherPair);
  }

  isPair(values) {
    const value = Object.entries(values).find(([value, count]) => count === 2);
    this.higherPairCard = value?.[0];
    return !!value;
  }

  compare(opponentHand) {
    if (this.rank !== opponentHand.rank) {
      return this.rank > opponentHand.rank
        ? "win"
        : this.rank < opponentHand.rank
        ? "lose"
        : "tie";
    }

    // high card || flush
    if ([1, 6].includes(this.rank)) {
      return this.compareRestCard(this.cards, opponentHand.cards);
    }
    // straight || straight flush
    else if ([5, 9].includes(this.rank)) {
      const ownCard = this.cards.slice(0, 1);
      const opponentCard = opponentHand.cards.slice(0, 1);
      return this.compareRestCard(ownCard, opponentCard);
    }
    // three of a kind || full house || four of a kind
    else if ([4, 7, 8].includes(this.rank)) {
      const ownRankedValue = this.fourOfAKindCard ?? this.threeOfAKindCard;
      const oppositeRankedValue =
        opponentHand.fourOfAKindCard ?? opponentHand.threeOfAKindCard;
      const ownScore = SCORE[ownRankedValue];
      const opponentScore = SCORE[oppositeRankedValue];
      return ownScore > opponentScore ? "win" : "lose";
    }
    // pair || two pair
    else if ([2, 3].includes(this.rank)) {
      if (
        this.higherPairCard === opponentHand.higherPairCard &&
        this.lowerPairCard === opponentHand.lowerPairCard
      ) {
        const ownCards = this.cards.filter(
          ({ value }) =>
            value !== this.higherPairCard && value !== this.lowerPairCard
        );
        const opponentCards = opponentHand.cards.filter(
          ({ value }) =>
            value !== opponentHand.higherPairCard &&
            value !== opponentHand.lowerPairCard
        );
        return this.compareRestCard(ownCards, opponentCards);
      }

      const ownScore = SCORE[this.higherPairCard] + SCORE[this.lowerPairCard];
      const opponentScore =
        SCORE[opponentHand.higherPairCard] + SCORE[opponentHand.lowerPairCard];
      return ownScore > opponentScore ? "win" : "lose";
    }
  }

  compareRestCard(ownCards, opponentCards) {
    const length = ownCards.length;
    for (let i = 0; i < length; i++) {
      const ownScore = ownCards[i].score;
      const opponentScore = opponentCards[i].score;
      if (ownScore !== opponentScore) {
        return ownScore > opponentScore ? "win" : "lose";
      }
    }
    return "tie";
  }
}

module.exports = Hand;
