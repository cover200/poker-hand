const Hand = require("./class/Hand");

function main() {
  const player1 = new Hand("Player 1", ["KD", "TD", "9D", "JD", "QD"]);
  const player2 = new Hand("Player 2", ["QC", "QD", "2H", "5S", "4D"]);
  const result = player1.compare(player2);

  if (result === "tie") {
    console.log("tie");
  } else {
    const player1Win = result === "win";
    const winner = player1Win ? player1 : player2;
    console.log(`${winner.name} wins. - with ${winner.desc}`);
  }
}

main();
