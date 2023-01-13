import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(function (response) {
        setMonsters(response.data);
        console.log(response.data);
      });
  }, []);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMonsters(data);
  //       console.log(data);
  //     })

  //     .catch((err) => console.log("error occured"));
  // }, []);

  return (
    <div className="App">
      <h1>Monsters app</h1>
      <input
        type={"search"}
        placeholder={"search monster"}
        onChange={() => {
          console.log("search changed");
        }}
      />
      <div className="monsters-box">
        <p>monster list</p>
        {monsters.map((monster) => {
          return (
            <div className="monster" key={monster.id}>
              {monster.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
