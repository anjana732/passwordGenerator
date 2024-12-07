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

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789";
    if (character) str += "~!@#$%^&*()_-+=[]{}?/<>,."

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass);
  }, [length, character, number, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, character, number, passwordGenerator])

  useRef

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  })

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type='text'
            className="outline-none w-full py-1 px-3"
            value={password}
            readOnly
            ref={passRef}
          ></input>

          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={0}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={number}
              onChange={() => {
                setNumber((prev) => !prev)
              }} />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type='checkbox'
              defaultChecked={character}
              onChange={() => {
                setCharacter((prev) => !prev)
              }} />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
