import './App.css';


export default function TopMenu(props : {code:string}) {
  return (
    <div className="center">
        <p className="live">
          <span className="red"></span>
          LIVE
        </p>
        <div className="code">
          YOUR CODE: {props.code}
        </div>
    </div>
  )
}
