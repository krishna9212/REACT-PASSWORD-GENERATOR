import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [btnclicked, setbtnclicked] = useState(false);
  const pasgenrator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallowed === true) {
      string += "0123456789";
    }

    if (charallowed) {
      string += "!`~#$%^&*()-_/\\|}{][,.<:>;'";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }
    setpassword(pass);
  }, [length, numallowed, charallowed, btnclicked]);
  const passwordRef = useRef(null);
  const copyPassword = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => pasgenrator(), [length, numallowed, charallowed, btnclicked]);

  return (
    <>
      <div className="main bg-violet-700 flex justify-center items-center h-screen w-sceeen flex-col gap-10 text-white  ">
        <div className="card bg-violet-600 h-[40%] w-[40%] p-6 flex flex-col  font-thin  gap-5">
          <div className="top bg-violet-500  uppercase text-center h-[18%] p-2 font-semibold">
            <h1>password generator</h1>
          </div>
          <div className="center h-[18%]   flex items-center justify-between ">
            <input
              type="text"
              value={password}
              className=" h-[100%] w-[85%] outline-none rounded-l-lg  p-3 bg-violet-300 font-light   "
              ref={passwordRef}
              readOnly
            />
            <button
              className="uppercase h-[100%] w-[15%]  rounded-r-lg bg-violet-700 active:bg-violet-800 font-normal transition-all duration-75   "
              onClick={() => copyPassword()}
            >
              copy
            </button>
          </div>
          <div className="bottom flex flex-row gap-10 pt-5  w-[100%]">
            <input
              type="range"
              name="range"
              id="range-lenght"
              max={100}
              min={8}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
              className=" w-[30%]"
            />
            <label htmlFor="range-lenght" className=" whitespace-nowrap">
              Length: {length}
            </label>

            <input
              type="checkbox"
              defaultChecked={numallowed}
              name="take-number"
              id="numcheck"
              onChange={() => {
                setnumallowed((prev) => !prev);
              }}
              className=""
            />
            <label htmlFor="numcheck">Numbers</label>
            <input
              type="checkbox"
              name="take-character"
              id="charcheck"
              className=""
              defaultChecked={numallowed}
              onChange={() => {
                setcharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charcheck">character</label>
          </div>
        </div>
        <button
          className="bg-black text-white p-3 rounded-lg uppercase w-[15%] transition-all duration-75 active:bg-gray-900"
          onClick={() => {
            setbtnclicked((prev) => !prev);
          }}
        >
          do it manually
        </button>
      </div>
    </>
  );
}
export default App;
