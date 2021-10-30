import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import {GAME_STATE} from './game_state_enum.js';
import RandomGrid from './randomGrid.js';

// Collaborator: Fareed Balogun @02895579


function App() {
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [size, setSize] = useState(3);
  
  useEffect(() =>{
    const wordList = require('./wordlist.json');
    let tempSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tempSolutions);
  }, [grid]);
  
  useEffect(() =>{
    if(gameState === GAME_STATE.INPROG){
      if(size!==-11111){
        setGrid(RandomGrid(size));
      }
      setFoundSolutions([]);
    }
  }, [gameState, size]);
  
  function correctAnswers(answer){
    console.log("Correct:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }
  
  return (
    <div className="App">
      
      <img src={logo}  width="25%" height="25%" class="logo" alt="Bison Boggle Logo" /> 

      <ToggleGameState gameState={gameState}
                        setGameState = {(state) => setGameState(state)}
                        setSize = {(state) => setSize(state)}
                        setTotalTime = {(state) => setTotalTime(state)}
                        numFound = {foundSolutions.length}
                        theGrid = {JSON.stringify(grid)}
                        setGrid = {(state) => setGrid(state)}
      />
      {gameState === GAME_STATE.INPROG &&
          <div>
            <Board board = {grid} />
            <GuessInput allSolutions = {allSolutions}
                     foundSolutions = {foundSolutions}
                     correctAnswersCallback = {(answer) => correctAnswers(answer)}/>
            <FoundSolutions headerText="Solutions you've found" words={foundSolutions}/>
          </div>
      }
      {
        gameState === GAME_STATE.END &&
          <div>
            <Board board = {grid}/>
            <SummaryResults words = {foundSolutions} totalTime={totalTime}/>
            <FoundSolutions headerText="Missed Words [wordsize>3]: " words = {allSolutions}/>
          </div>
      }
    </div>
  );
}

export default App;