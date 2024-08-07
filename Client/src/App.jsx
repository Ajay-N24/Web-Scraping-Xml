import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <form className="flex flex-col gap-3 items-center min-h-screen w-full px-96 max-[1250px]:px-56 max-md:px-10 bg-slate-400">
        <input
          type="text"
          name="Domain-Name"
          id="Domain-Name"
          className="w-full border-2 border-slate-500 h-10 px-2"
        />
        <input
          type="submit"
          value="Start Scraping"
          className="cursor-pointer bg-green-300 w-full py-3 rounded-lg"
        />
      </form>
    </>
  );
}

export default App;
