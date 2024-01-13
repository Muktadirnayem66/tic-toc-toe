/* eslint-disable react/prop-types */
import { useState } from "react";

const Square = ({value, onSquareClick})=>{
  return (
    <button className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg" onClick={onSquareClick}>

    {value}
    </button>
  )
}


const App = ({squares, onPlay, xIsNext}) => {


  const winner = calculateWinners(squares)
  let status

  if(winner){
    status = `Winner : ${winner}`
  }else{
    status = "Next Player " + (xIsNext? "X" : "O")
  }
  
  const handleClick = (i)=>{
    if(squares[i] ||calculateWinners(squares)){
      return
    }
    const nextSquares = squares.slice()
    if(xIsNext){
      nextSquares[i] = "X"
    }else{
      nextSquares[i] = "O"
    }
   onPlay(nextSquares)
  }

  return (
    <>
    <div>{status}</div>
    <div className="flex">
      <Square value={squares[0]} onSquareClick={()=>handleClick(0)} />
      <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
    </div>
    <div className="flex">
    <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
    </div>
    <div className="flex">
    <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
    </div>
      
    </>
  );
};

const Game = ()=>{
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [xIsNext, setXIsNext] = useState(true)
  const [currentMove, setCurrentMove] = useState(0)


  const currentSquare = history[currentMove]

  const handlePlay = (nextSquares)=>{
    setXIsNext(!xIsNext)
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)

  }

  const jumpTo = (move)=>{
    setCurrentMove(move)
    setXIsNext( move % 2 === 0)
  }

  const moves = history.map((squares, move)=>{
    let description
    if(move > 0){
      description = `Go to the move no. ${move}`
    }else{
      description = "Goto starting the game"
    }

    return (
      <li key={move} className="mb-1 bg-gray-300 ">
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
    })
  return (
    <div className="flex justify-center p-4">
      <div className="mr-16">
        <App 
          xIsNext={xIsNext}
          squares={currentSquare}
          onPlay = {handlePlay}

        />
      </div>
      <div >
        <ol >
          {moves}
        </ol>
      </div>


    </div>
  )
}


export default Game

const calculateWinners = (squars)=>{
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for(let i=0; i<lines.length; i++){
    const [a, b, c] = lines[i]
    if(squars[a] && squars[a] === squars[b] && squars[a] === squars[c]){
      return squars[a]
    }
  }
  return null
}