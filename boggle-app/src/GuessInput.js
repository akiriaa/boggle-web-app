import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import './GuessInput.css';

function GuessInput({ allSolutions, foundSolutions, correctAnswerCallback, remainder, setRemainder }) {

  const [labelText, setLabelText] = useState("Make your first guess!");
  const [input, setInput] = useState("");

  function evaluateInput() {
    if (foundSolutions.includes(input)) {
      setLabelText(input + " has already been found!");
    } else if (allSolutions.includes(input)) {
      // correctAnswerCallback(input);
      correctAnswerCallback(foundSolutions => foundSolutions.concat(input));
      setLabelText(input + " is correct!");

//       var idx = remainder.indexOf(input);
//       while (idx !== -1) {
//         remainder.splice(idx, 1);
//         setRemainder(remainder);
//         idx = remainder.indexOf(input);
//       }

    } else {
      setLabelText(input + " is incorrect!");
    }
  }

  function keyPress(e) {
    if (e.key === 'Enter') {
      e.target.value = "";
      evaluateInput()
    }
  }

  return (
    <div className="Guess-input">
      <div>
        {labelText}
      </div>
      <TextField onKeyPress={(e) => keyPress(e)} onChange={(event) => setInput(event.target.value)} />
    </div>
  );
}

export default GuessInput;