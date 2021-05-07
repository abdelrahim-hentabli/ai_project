import './EightPuzzle.css';
import {Select, MenuItem} from '@material-ui/core';
import PriorityQueue from 'js-priority-queue';

import {useEffect, useRef, useState } from 'react';

function goal(state){
  return state === '12345678*';
}

function misplaced_tile(state){
  var count = 0;
  for(let i = 0; i < 8; i++){
    count += ((i+1).toString() === state[i])?0:1;
  }
  return count;
}


function manhattan_distance(state){
  var totalDist = 0;
  for(let i = 0; i < 9; i++){
    if(state[i] !== '*'){
      totalDist += Math.abs((parseInt(state[i],10) - 1)%3 - (i%3)) + Math.abs(Math.floor((parseInt(state[i],10) - 1)/3) - Math.floor(i/3));
    }
  }
  return totalDist;
}

//These functions are named after the direction the blank space moves
//They return null if move is invalid
function moveUp(state){
  var index = state.search(/\*/);
  var output = state;
  if(index === -1){
    console.log('Error: Invalid State');
    return null;
  }
  else{
    if(index < 3){
      return null;
    }
    else{
      return state.substring(0, index-3) + '*' + state.substring(index-2, index) + state[index-3] + state.substring(index+1);
    }
  }
}
function moveDown(state){
  var index = state.search(/\*/);
  if(index === -1){
    console.log('Error: Invalid State');
    return null;
  }
  else{
    if(index > 5){
      return null;
    }
    else{
      return state.substring(0, index) + state[index+3] + state.substring(index+1, index+3) + '*' + state.substring(index+4);
    }
  }
}
function moveRight(state){
  var index = state.search(/\*/);
  if(index === -1){
    console.log('Error: Invalid State');
    return null;
  }
  else{
    if(index % 3 === 2){
      return null;
    }
    else{
      return state.substring(0, index) + state[index+1] + '*' + state.substring(index+2);
    }
  }
}
function moveLeft(state){
  var index = state.search(/\*/);
  if(index === -1){
    console.log('Error: Invalid State');
    return null;
  }
  else{
    if(index % 3 === 0){
      return null;
    }
    else{
      return state.substring(0, index-1) + '*' + state[index-1]  + state.substring(index+1);      
    }
  }
}

var logText = [];

const operations = [moveLeft, moveUp, moveRight, moveDown];


function a_star(startState, heuristic){
  var visitedStates = new Set();
  visitedStates.add(startState);
  var queue = new PriorityQueue({ comparator: function(a, b) { return a[0] - b[0];}});
  queue.queue([0, startState]);
  var currentState;
  var currentCost ;
  var tempState;
  while(queue.length > 0 && !goal(currentState)){
    [currentCost, currentState] = queue.dequeue();
    logText.push(<div>{currentState.substr(0,3)}</div>);
    logText.push(<div>{currentState.substr(3,3)}</div>);
    logText.push(<div>{currentState.substr(6)}</div>);
    for(let i = 0; i < 4; i++){
      tempState = operations[i](currentState); 
      if( tempState != null && !visitedStates.has(tempState)){
        queue.queue([currentCost + heuristic(tempState), tempState]);
        visitedStates.add(tempState);
      }
    }
  }
}

const startStates = [ '12345678*', '1234567*8', '12*453786', '*12453786', '8716*2543', '12345687*']
const heuristics = [misplaced_tile, manhattan_distance]

function EightPuzzle() {
  const canvas = useRef(null);
            
  const [puzzleState, setPuzzleState] = useState('12345678*');
  const [startState, setStartState] = useState(0);
  const [algorithm, setAlgorithm] = useState(0);
  const [heuristic, setHeuristic] = useState(0);
  const [done, setDone] = useState(false);
  const [log, setLog] = useState(true);
  
  const updateStartState = (e) => {
    setStartState(e.target.value);
    //a_star(startStates[startState], heuristics[heuristic]);
  }
  
  const updateAlgorithm = (e) => {
    setAlgorithm(e.target.value);
  }
  
  const updateHeuristic = (e) => {
    setHeuristic(e.target.value);
  }
  
  useEffect(() =>{
      setPuzzleState(startStates[startState]);
  }, [startState]);
  
  useEffect(() =>{
    const can = canvas.current;
    const ctx = can.getContext('2d');
    const width = can.clientWidth;
    const height = can.clientHeight;
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
      <canvas className='main-canvas' width='300px' height='300px' ref={canvas}/>
      <div className='menu'>
        <h2 className='page-title'> Eight Puzzle </h2>
        <div className='line-item'>
          <div>
            Start State: 
          </div>
          <Select value={startState} onChange={updateStartState}>
            <MenuItem value={0}>Solved</MenuItem>
            <MenuItem value={1}>Very Easy</MenuItem>
            <MenuItem value={2}>Easy</MenuItem>
            <MenuItem value={3}>Doable</MenuItem>
            <MenuItem value={4}>Oh Boy</MenuItem>
            <MenuItem value={5}>Impossible</MenuItem>
          </Select>
        </div>
        <div className='line-item'>
          <div>
            Algorithm: 
          </div>
          <Select value={algorithm} onChange={updateAlgorithm}>
            <MenuItem value={0}>Uniform Cost Search</MenuItem>
            <MenuItem value={1}>A*</MenuItem>
          </Select>
        </div>
        {algorithm === 1 &&
          <div className='line-item'>
            <div>
              Heuristic: 
            </div>
            <Select value={heuristic} onChange={updateHeuristic}>
              <MenuItem value={0}>Misplaced Tile</MenuItem>
              <MenuItem value={1}>Manhattan Distance</MenuItem>
            </Select>
          </div>
        }
      </div>
      {log && 
      <div className='log-container'>
        <div className='log'>
          {logText}
        </div>
      </div>
      }
    </div>
  );
}

export default EightPuzzle;
