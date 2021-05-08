import './NineMen.css';
import {Select, MenuItem, Button} from '@material-ui/core';
import PriorityQueue from 'js-priority-queue';

import {useEffect, useRef, useState } from 'react';

function goal(state){
  return state === '123456789****';
}

function misplaced_tile(state){
  var count = 0;
  console.log(state);
  for(let i = 0; i < 9; i++){
    count += ((i+1).toString() === state[i])?0:1;
  }
  return count;
}


function manhattan_distance(state){
  var totalDist = 0;
  var i;
  for(i = 0; i < 10; i++){
    if(state[i] !== '*'){
      totalDist += Math.abs((parseInt(state[i],10) - 1) - i)
    }
  }
  for(; i < 13; i++){
    if(state[i] !== '*'){
      totalDist += 1 + Math.abs((parseInt(state[i],10)-1) - ((i-10) * 2 + 3 ));
    }
  }
  return totalDist;
}

//These functions are named after the direction the blank space moves
//They return null if move is invalid
function moveUp(state){
  var index = state.search(/\*/);
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
  logText = [];
  var visitedStates = new Set();
  visitedStates.add(startState);
  var queue = new PriorityQueue({ comparator: function(a, b) { return a[0] - b[0];}});
  queue.queue([heuristic(startState), 0, startState, []]);
  var currentState, previousStates, tempState, depth;
  var maxQueueSize = 0;
  var steps = 0;
  while(queue.length > 0){
    steps++;
    maxQueueSize = Math.max(maxQueueSize, queue.length);
    [, depth, currentState, previousStates] = queue.dequeue();
    console.log(previousStates);
    console.log(currentState);
    logText.push(<div>{currentState.substr(0,3)}</div>);
    logText.push(<div>{currentState.substr(3,3)}</div>);
    logText.push(<div>{currentState.substr(6)}</div>);
    logText.push(<div>Queue Size: {queue.length}</div>);
    logText.push(<div>Heuristic: {heuristic(currentState)}</div>);
    logText.push(<div>Depth: {depth}</div>);
    logText.push(<br/>);
    if(goal(currentState)){
      break;
    }
    for(let i = 0; i < 4; i++){
      tempState = operations[i](currentState);
      if( tempState != null && !visitedStates.has(tempState)){
        previousStates.push(currentState);
        queue.queue([depth+1 + heuristic(tempState), depth+1, tempState, previousStates]);
        visitedStates.add(tempState);
      }
    }
  }
  logText.push(<div>Solver finished in {steps} steps.</div>)
  logText.push(<div>Max Queue Size: {maxQueueSize}</div>)
}

const startStates = [ '123456789****', '12345678*9***', '123*5*7**9468', '*12453786', '*234567891***', '12345687*']
const heuristics = [misplaced_tile, manhattan_distance]

function NineMen() {
    const canvas = useRef(null);
            
  const [puzzleState, setPuzzleState] = useState('123456789****');
  const [startState, setStartState] = useState(0);
  const [algorithm, setAlgorithm] = useState(0);
  const [heuristic, setHeuristic] = useState(0);
  const [log, setLog] = useState(true);
  const [logUpdated, setLogUpdated] = useState(false);
  const [solutionStates, setSolutionStates] = useState([]);
  const [solutionIndex, setSolutionIndex] = useState(0);
  
  const updateStartState = (e) => {
    setStartState(e.target.value);
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
  
  
  //Here is the draw to canvas function that draws currentState
  useEffect(() =>{
    const can = canvas.current;
    const ctx = can.getContext('2d');
    const width = can.clientWidth;
    const height = can.clientHeight;
    ctx.fillStyle='gray';
    ctx.fillRect(0,0,width, height);
    const pieceWidth = width/10;
    const pieceHeight = height/2;
    ctx.font = (pieceHeight * .8).toString()+ "px Arial" 
    for( let i = 0; i < puzzleState.length; i++){
      //bottom row
      if(i < 10){
        if(puzzleState[i] !== '*'){
          ctx.fillStyle = 'beige';
          ctx.fillRect(i * pieceWidth + 2, pieceHeight + 2, pieceWidth - 4, pieceHeight - 4);
          ctx.fillStyle = 'black';
          ctx.strokeRect(i * pieceWidth + 2, pieceHeight + 2, pieceWidth - 4, pieceHeight - 4);
          const textSize = ctx.measureText(puzzleState[i].toString());
          ctx.fillText(puzzleState[i].toString(), (i + .5) * pieceWidth - (.5 * textSize.width), 1.8 * pieceHeight);
        }
        else{
          ctx.fillStyle = 'white';
          ctx.fillRect(i * pieceWidth + 2, pieceHeight + 2, pieceWidth - 4, pieceHeight - 4);
        }
      }
      //top row
      else{
        if(puzzleState[i] !== '*'){
          ctx.fillStyle = 'beige';
          ctx.fillRect((i-10) * (pieceWidth*2) + (pieceWidth * 3) + 2, 2, pieceWidth - 4, pieceHeight - 4);
          ctx.fillStyle = 'black';
          ctx.strokeRect((i-10) * (pieceWidth*2) + (pieceWidth * 3) + 2, 2, pieceWidth - 4, pieceHeight - 4);
          const textSize = ctx.measureText(puzzleState[i].toString());
          ctx.fillText(puzzleState[i].toString(), (i-10 + .25) * (pieceWidth*2) - (.5 * textSize.width)+ (pieceWidth * 3), .8 * pieceHeight);
        }
        else{
          ctx.fillStyle = 'white';
          ctx.fillRect((i-10) * (pieceWidth*2) + (pieceWidth * 3) + 2, 2, pieceWidth - 4, pieceHeight - 4);
        }
        
      }
    }
  }, [puzzleState]);
  
  //This return value dictates the layout of the page, including dropdown menus and buttons.
  return (
    <div className='ninemen'>
      <div className='menu'>
        <h2 className='page-title'> Nine Men </h2>
        <canvas className='main-canvas' width='500px' height='100px' ref={canvas}/>
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
        <div className='line-item'>
            <Button variant="contained" onClick={() => {if(algorithm){
                a_star(startStates[startState], heuristics[heuristic]);
              }
              else{
                a_star(startStates[startState], (state) => {return 0;})
              }
              setLogUpdated(!logUpdated);}} color="primary">Solve</Button>
            <Button variant="contained" onClick={() => { setLog(!log) }}>Log</Button>
        </div>
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

export default NineMen;
