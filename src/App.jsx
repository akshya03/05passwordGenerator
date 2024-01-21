import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberAllowed)
        str += "0123456789";
      if(charactersAllowed)
        str += "!@$%^&*[]{}~`";

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random()*str.length+1);
        pass += str.charAt(char);
        
      }

      setPassword(pass);

    }, [length, numberAllowed, charactersAllowed, setPassword]);


  //directly done -> without using UseRef HOOK
  //here no highlight of copied text is done
  // const copyPasswordToClipboard = useCallback(()=>{
  //   window.navigator.clipboard.writeText(password);
  // }, [password]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();   //password is highlighted when clicked on COPY button
    passwordRef.current?.setSelectionRange(0,4);  //only range charaters are selected and copied
    window.navigator.clipboard.writeText(password);
  }, [password]);
  
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charactersAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-center text-white my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-sky-700 active:bg-sky-900"
            onClick={copyPasswordToClipboard}
            >copy</button>
          
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" 
              min={6}
              max={25}
              value={length}
              className='cursor-pointer'
              onChange={(e)=> {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
              defaultChecked = {numberAllowed}
              id='numberInput'
              onChange={()=> setNumberAllowed((prev)=> !prev)}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
              defaultChecked = {numberAllowed}
              id='characterInput'
              onChange={()=> setCharactersAllowed((prev)=> !prev)}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
