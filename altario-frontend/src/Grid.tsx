import './App.css';

export default function Grid(props : {grid : string[][]}) {

    return (
    <div className="center">

      <div className="grid-container">
        {props.grid.map((row)=>
          row.map((letter,pos)=>
            <div className="grid-item" key={pos}>{letter}</div>
          )
        )}
      </div> 
    </div>
  )
}
