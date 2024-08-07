import { useState } from "react";
import "./App.css";

function App() {
  const [link, setLink] = useState();
  const [data, setData] = useState();
  const saveData = async () => {
    console.log(link);
    const response = await fetch("http://localhost:3000/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urli: link,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (!json.success) {
      alert("Invalid Link");
    } else {
      setData(json.message);
    }
  };
  const onsubmit = (e) => {
    e.preventDefault();
    saveData();
    console.log(data);
  };

  return (
    <div className="flex flex-col min-h-screen gap-20">
      <form
        className="flex flex-col gap-3 items-center w-full px-96 max-[1250px]:px-56 max-md:px-10"
        onSubmit={onsubmit}
      >
        <input
          type="text"
          name="Domain-Name"
          id="Domain-Name"
          className="w-full border-2 border-slate-500 h-10 px-2"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {console.log(data)}
        <input
          type="submit"
          value="Start Scraping"
          className="cursor-pointer bg-green-300 w-full py-3 rounded-lg"
        />
      </form>
      <div className="min-h-screen w-full">
        <div className="grid grid-cols-1 pt-10 mx-64 gap-5">
          {data &&
            data.map((item, index) => {
              return (
                <div
                  className="flex items-center justify-start gap-3 p-5 border-2"
                  key={index}
                >
                  <div className="flex flex-col justify-center items-start">
                    <h1 className="font-bold text-xl">{item.title}</h1>
                    <p className="text-start">
                      We partner with experienced reputed B2B service providers
                      who know how to transform spaces with expert care.
                    </p>
                  </div>
                  <div>
                    <img src={item.imageSrc} alt="" width={400} height={400} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
