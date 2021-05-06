import './EightPuzzle.css';
import {Select, MenuItem} from '@material-ui/core';

import {useEffect, useRef, useState } from 'react';

function goal(state){
  return state === '12345678*';
}

var startStates = [ '12345678*', '1234567*8', '12*453786', '*12453786', '8716*2543', '12345687*']

function EightPuzzle() {
  const canvas = useRef(null);
  const [puzzleState, setPuzzleState] = useState('12345678*');
  const [startState, setStartState] = useState(0);
  
  const updateStartState = (e) => {
    setStartState(e.target.value);
  }
  useEffect(() =>{
      setPuzzleState(startStates[startState]);
  }, [startState]);
  
  useEffect(() =>{
    const can = canvas.current;
    const ctx = can.getContext('2d');
    const width = can.clientWidth;
    const height = can.clientHeight;
    console.log(width + ' x ' + height);
    ctx.fillStyle='gray';
    ctx.fillRect(0,0,width, height);
    const pieceWidth = width/3;
    const pieceHeight = height/3;
    ctx.font = (pieceHeight * .8).toString()+ "px Arial" 
    for( let i = 0; i < puzzleState.length; i++){
      if(puzzleState[i] !== '*'){
        ctx.fillStyle = 'beige';
        ctx.fillRect(i%3 * pieceWidth + 2, Math.floor(i / 3) * pieceHeight + 2,pieceWidth - 4, pieceHeight - 4);
        ctx.fillStyle = 'black';
        ctx.strokeRect(i%3 * pieceWidth + 2, Math.floor(i / 3) * pieceHeight + 2,pieceWidth - 4, pieceHeight - 4);
        const textSize = ctx.measureText(puzzleState[i].toString());
        ctx.fillText(puzzleState[i].toString(), (i%3 + .5) * pieceWidth - (.5 * textSize.width), (Math.floor(i/3)+ .8) * pieceHeight) 
      }
    }
  }, [puzzleState]);
  return (
    <div className='eightpuzzle'>
      <canvas className='main-canvas' width='300px' height= '300px' ref={canvas}/>
      <div className='menu'>
        <h2> Eight Puzzle </h2>
        <div className='line-item'>
          <div flex="none">
            Start State: 
          </div>
          <Select flex="none" value={startState} onChange={updateStartState}>
            <MenuItem value={0}>Solved</MenuItem>
            <MenuItem value={1}>Very Easy</MenuItem>
            <MenuItem value={2}>Easy</MenuItem>
            <MenuItem value={3}>Doable</MenuItem>
            <MenuItem value={4}>Oh Boy</MenuItem>
            <MenuItem value={5}>Impossible</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default EightPuzzle;
