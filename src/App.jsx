import { useEffect, useState } from "react";
import Die from "./components/dies/Die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

function App() {
  const [newDice, setNewDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(
    function () {
      const allHeld = newDice.every((die) => die.isHeld);
      const firstValue = newDice[0].value;
      const allSameValue = newDice.every((die) => die.value === firstValue);

      if (allHeld && allSameValue) {
        setTenzies(true);
        // console.log("You Won!");
      }
    },
    [newDice]
  );

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDie());
    }
    return arr;
  }

  function rollDice() {
    if (!tenzies) {
      setNewDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setNewDice(allNewDice);
    }
  }

  function holdDice(id) {
    setNewDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const newDiceArr = newDice.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{newDiceArr}</div>
      <button onClick={rollDice} className="roll-dice">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
