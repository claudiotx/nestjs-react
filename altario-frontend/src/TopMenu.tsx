import './App.css';
import {ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type TopMenuProps = {
    changeBias: Function,
    startTimer: Function,
    gridStarted: boolean,
    changeGridStarted: Dispatch<SetStateAction<boolean>>,
    clock: boolean
}

export default function TopMenu(props : TopMenuProps) {
  
  const [disabled , inputDisable ] = useState(false);

  function handleChange(e : ChangeEvent){
    const target = e.target as HTMLInputElement;
    if(target){
        let value = target.value;
        value = value.replace(/[^A-Za-z]/ig, '')
        if( value !== ""){
            inputDisable(true);
            setTimeout(() => {
                inputDisable(false)
            }, 4000);
        }
        target.value = value;
        props.changeBias(value.toUpperCase());
    }
  }  

  return (
    
    <div className="topMenu">
        <div>
          <p>
              CHARACTER
          </p>  
          <input placeholder="character" onChange={(e)=> handleChange(e)} maxLength={1} disabled={disabled}>
          </input>
        </div>

        <div className='clock'>
          <div className={(props.clock)? "pointer animate": "pointer"}></div>
        </div>

        <div className='flex'>
          <button onClick={()=>props.startTimer()} disabled={props.gridStarted}>
              GENERATE 2D GRID
          </button>
        </div>
    </div>
  )
}
