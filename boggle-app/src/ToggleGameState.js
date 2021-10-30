import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './game_state_enum.js';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import './ToggleGameState.css';

function ToggleGameState({gameState, setGameState, setSize, setTotalTime}) {
  const [buttonText, setButtonText] = useState("Start a new game!");
  const [startTime, setStartTime] = useState(0);
//   const [boardSize, setBoardSize] = useState(3);
//   const [leaderBoard, setLeaderBoard] = useState([]);
//   const [input, setInput] = useState("");
  //const [deltaTime, setDeltaTime] = useState(0);
  
  let d = 0;
  

  function updateGameState(endTime) {
    
      if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
        setStartTime(Date.now());
        setGameState(GAME_STATE.INPROG);
        setButtonText("End game");
    } else if (gameState === GAME_STATE.INPROG) {
        d = (endTime - startTime)/ 1000.0;
        setTotalTime(d); 
        //setDeltaTime(d); 
        setGameState(GAME_STATE.END);
        setButtonText("Start a new game!");
    }
  }
  
  const handleChange = (event) => {
    setSize(event.target.value);
  };
  
   return (
    <div className="Toggle-game-state">
      <Button variant="outlined" onClick={() => updateGameState(Date.now())} >
        {buttonText}
      </Button>

      { (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED)  &&
        <div className="Input-select-size">
        <FormControl >
       
        <Select
          labelId="sizelabel"
          id="sizemenu"
        
       
          onChange={handleChange}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
         <FormHelperText>Set Grid Size</FormHelperText>
        </FormControl>
       </div>
      }
    </div>
  );
}

export default ToggleGameState;