import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const API_ID = "e075e462";
  const API_KEY = "c3e8dbc0c89fbfc3fd96e3eb2f956782";
  const [allRecipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('');
  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const getData = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const finalData = await getData.json();
    setRecipe(finalData.hits);

  };
  const updateSearch = e => {
    setSearch(e.target.value)
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div>
    <div className="App">
      <div className="header">
      <h2 className="text-center mt-5 h2style">CookBook</h2>
      <form onSubmit={getSearch} className="form">
        <input type="text" className="input" value={search} placeholder= "Input ingredients you want to use eg. chicken, broccoli..."onChange={updateSearch}></input>
        <button type="submit" className="search">Search</button>
      </form></div>
      <div className="d-flex justify-content-around flex-wrap">
        {allRecipe.map((r) => (
          <Recipe
            key={r.recipe.label}
            title={r.recipe.label}
            label={r.recipe.label}
            calory={r.recipe.calories}
            image={r.recipe.image}
            ingredients={r.recipe.ingredients}
            url={r.recipe.url}
            totalWeight={r.recipe.totalWeight}
            servings={r.recipe.yield}
          />
        ))}
      </div>
    </div>
    </div>
  );


}

export default App;
