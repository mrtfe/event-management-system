import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [monsters, setMonsters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredList, setFilteredList] = new useState(monsters);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(function (response) {
        setMonsters(response.data);
      });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    filterMonsters();
    console.log(filteredList);
  };

  const filterMonsters = () => {
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchInput.toLowerCase)
    );
  };

  return (
    <div className="App">
      <h1>Monsters app</h1>
      <input
        type={"search"}
        placeholder={"search monster"}
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <div className="monsters-box">
        {monsters.map((monster) => {
          return (
            <h3 className="monster" key={monster.id}>
              {monster.name}
            </h3>
          );
        })}
      </div>
    </div>
  );
}

export default App;
