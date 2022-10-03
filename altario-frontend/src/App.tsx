import './App.css';
import TopMenu from './TopMenu';
import Code from './Code';
import Grid from './Grid';
import React ,{useCallback, useEffect, useRef, useState} from 'react';

function App() {

  class Letter {
    letter : string;
    
    constructor(letter:string){
      this.letter = letter;
    }

    async render(){
      const url = 'http://localhost:3000/?bias=' + this.letter;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      animateClock(true);
      setCode(data[0]);
      setGrid(data[1]);
    }      
  }

  const [grid, setGrid] = useState([
    
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""]
    ]);
  const [code, setCode] = useState("");
  const [gridStarted, changeGridStarted] = useState(false);
  const [clock, animateClock] = useState(false);
  const [timer, setTimer] = useState(0);

  const newLetter = useRef(new Letter(""));

  const getGrid = useCallback(
    async () => {
      try {
        await newLetter.current.render();
      }
      catch(error){
        console.log("Error:" + error);
      }
    },[]
  );

  function startTimer(){
    getGrid();
    if (timer === 0){
      setTimer(window.setInterval(() => {
        getGrid();
      }, 2000));
    }
  }

  useEffect(() => {
    return () => {
      if (timer !== 0){
        clearInterval(timer);
      }
    };
  }, [timer]);

  function setBias(input : string){
    newLetter.current.letter = input;
  }

  return (
    <div className="App center">
      <TopMenu changeBias={setBias} startTimer={startTimer} gridStarted={gridStarted} changeGridStarted={changeGridStarted} clock={clock}/>
      <Grid grid={grid}/>
      <Code code={code}/>
    </div>
  );
}

export default App;
