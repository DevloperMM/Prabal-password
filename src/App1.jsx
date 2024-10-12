import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

function App1() {
  const [length, setLength] = useState(10);
  const [numAllow, setNumAllow] = useState(true);
  const [charAllow, setCharAllow] = useState(false);
  const [pass, setPass] = useState("");

  const passRef = useRef(null);

  const handleClipping = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 24);
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "01234567890123456789";
    if (charAllow) str += "~!@#$%&{};/~!@#$%&{};/";

    for (let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }

    setPass(pass);
  }, [length, charAllow, numAllow, setPass]);

  useEffect(() => {
    passGen();
  }, [length, charAllow, numAllow, passGen]);

  return (
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 scale-110 text-white">
      <h1 className="text-center">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden m-4">
        <input
          type="text"
          value={pass}
          className="w-full py-1 px-3 text-orange-500"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button
          className="bg-blue-700 px-3 py-0.5 shrink-0"
          onClick={handleClipping}
        >
          copy
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-green-600 px-3 py-0.5 shrink-0 mb-2"
          onClick={passGen}
        >
          Generate
        </button>
      </div>
      <div className="flex text-sm gap-x-2 text-white justify-center">
        <div className="flex items-center gap-x-1">
          <label htmlFor="slider">Length: {length}</label>
          <input
            id="slider"
            type="range"
            min={6}
            max={24}
            value={length}
            className="cursor-pointer"
            onChange={(evt) => {
              setLength(evt.target.value);
            }}
          ></input>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            id="numIP"
            type="checkbox"
            defaultChecked={numAllow}
            onChange={() => {
              setNumAllow((prev) => !prev);
            }}
          />
          <label htmlFor="numIP">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllow}
            id="charIP"
            onChange={() => {
              setCharAllow((prev) => !prev);
            }}
          />
          <label htmlFor="charIP">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App1;
