// Requiring module
const assert = require("assert");
const Hand = require("../class/Hand");

describe("Poker hand - First test", () => {
  const getDescription = (winner) =>
    `${winner.name} wins. - with ${winner.desc}`;

  describe("flush vs other", () => {
    const player1 = new Hand("Player 1", ["2S", "7S", "AS", "KS", "4S"]);

    it("high card", () => {
      const player2 = new Hand("Player 2", ["2H", "7D", "AC", "KC", "TS"]);
      const isPlayer1Win = player1.compare(player2) === "win";
      const winner = isPlayer1Win ? player1 : player2;

      assert.equal(getDescription(winner), "Player 1 wins. - with flush");
    });

    it("pair", () => {
      const player2 = new Hand("Player 2", ["2H", "2D", "AC", "KC", "TS"]);
      const isPlayer1Win = player1.compare(player2) === "win";
      const winner = isPlayer1Win ? player1 : player2;

      assert.equal(getDescription(winner), "Player 1 wins. - with flush");
    });

    it("two pairs", () => {
      const player2 = new Hand("Player 2", ["2H", "2D", "QC", "KC", "QS"]);
      const isPlayer1Win = player1.compare(player2) === "win";
      const winner = isPlayer1Win ? player1 : player2;

      assert.equal(getDescription(winner), "Player 1 wins. - with flush");
    });

    it("three of a kind", () => {
      const player2 = new Hand("Player 2", ["2H", "2D", "2C", "KC", "TS"]);
      const isPlayer1Win = player1.compare(player2) === "win";
      const winner = isPlayer1Win ? player1 : player2;

      assert.equal(getDescription(winner), "Player 1 wins. - with flush");
    });

    it("straight", () => {
      const player2 = new Hand("Player 2", ["6H", "7D", "9C", "5C", "8S"]);
      const isPlayer1Win = player1.compare(player2) === "win";
      const winner = isPlayer1Win ? player1 : player2;

      assert.equal(getDescription(winner), "Player 1 wins. - with flush");
    });

    it("flush", () => {
      const player2 = new Hand("Player 2", ["2H", "7H", "AH", "KH", "4H"]);
      assert.equal(player1.compare(player2), "tie");
    });

    it("full house", () => {
      const player2 = new Hand("Player 2", ["JS", "9D", "JC", "9C", "9S"]);
      const isPlayer1Win = player1.compare(player2) === "win";
      const winner = isPlayer1Win ? player1 : player2;

      assert.equal(getDescription(winner), "Player 2 wins. - with full house");
    });

    it("four of a kind", () => {
      const player2 = new Hand("Player 2", ["3H", "3D", "3C", "KC", "3S"]);
      const isPlayer1Win = player1.compare(player2) === "win";
      const winner = isPlayer1Win ? player1 : player2;

      assert.equal(
        getDescription(winner),
        "Player 2 wins. - with four of a kind"
      );
    });

    it("straight flush", () => {
      const player2 = new Hand("Player 2", ["3C", "5C", "4C", "2C", "6C"]);
      const isPlayer1Win = player1.compare(player2) === "win";
      const winner = isPlayer1Win ? player1 : player2;

      assert.equal(
        getDescription(winner),
        "Player 2 wins. - with straight flush"
      );
    });
  });
});
