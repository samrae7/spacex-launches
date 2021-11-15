import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import fetchLaunches from "./client/fetchLaunches";
import ListItem from "./components/list-item/ListItem";
import NameFilter from "./components/name-filter/NameFilter";

export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  details: string;
};

function App() {
  const [items, setItems] = useState([] as Launch[]);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchLaunches();
      setItems(items);
    };
    getItems();
    return () => setItems([]);
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!items.length) {
      return;
    }
    let sortedItems;
    const sortType = event.target.value;
    if (sortType === "launchname") {
      sortedItems = [...items].sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      sortedItems = [...items].sort((a, b) =>
        a.date_utc < b.date_utc ? 1 : -1
      );
    }
    setItems(sortedItems);
  };

  function filterItems(event: ChangeEvent<HTMLInputElement>) {
    const userInput = event.target.value;
    if (userInput.length < 2) {
      setItems(items);
    }
    setFilterInput(userInput.toLowerCase());
  }

  function nameMatchesUserInput(launch: Launch) {
    return launch.name.toLowerCase().includes(filterInput.toLowerCase());
  }

  return (
    <div className="App">
      <main>
        <select onChange={handleSelectChange} name="sort" id="sort-select">
          <option value="">--Sort by--</option>
          <option value="launchname">Name</option>
          <option value="launchdate">Date</option>
        </select>
        <NameFilter handleUserInput={filterItems} />
        <ul>
          {items.filter(nameMatchesUserInput).map((item, i) => (
            <li key={item.id}>
              <ListItem {...item} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
