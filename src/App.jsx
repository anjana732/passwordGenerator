import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "0123456789";
    if(character) str+= "~!@#$%^&*()_-+=[]{}?/<>,."

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random()*str.length + 1)     
      pass += str.charAt(char) 
    }
    setPassword(pass);
  },[length,character,number,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,character,number,passwordGenerator])

  useRef

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  })

  return (
    <>
    <div style={{backgroundColor: "gray"}}> 
      <h1>Password Generator</h1>
      <input 
      type='text'
      value={password}
      readOnly
      ref={passRef}
      ></input>
      <button onClick={copyPassword}>Copy</button><br></br>
      <input 
      type="range"
      min={0}
      max={100} 
      value={length}
      onChange={(e)=>{setLength(e.target.value)}}/>
      <label>Length : {length}</label>
      <input type="checkbox" 
      defaultChecked={number}
      onChange={()=>{
        setNumber((prev)=> !prev)
      }}/>
      <label>Number</label>
      <input type='checkbox'
      defaultChecked={character}
      onChange={()=>{
        setCharacter((prev)=> !prev)
      }}/>
      <label>Character</label>
    </div> 
    </>
  )
}

export default App
