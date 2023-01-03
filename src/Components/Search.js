import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchQuery = input.trim();
    const spinner = document.querySelector(".js-spinner");
    spinner.classList.remove("hidden");

    try {
      const payload = {
        title: searchQuery,
        username: JSON.parse(localStorage.getItem("user")).email,
      };
      await axios.post("http://localhost:8080/api/search", payload);
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`
      );

      const searchResults = document.querySelector(".js-search-results");
      response.data.query.search?.forEach((result) => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

        searchResults.insertAdjacentHTML(
          "beforeend",
          `<div class="result-item">
                <h3 class="result-title">
                  <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
                </h3>
                <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
                <span class="result-snippet">${result.snippet}</span><br>
              </div>`
        );
      });
    } catch (err) {
      console.log(err);
      alert("Failed to search wikipedia");
    } finally {
      spinner.classList.add("hidden");
    }
  };
  return (
    <div>
      <header class="header">
        <img
          class="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/657px-Wikipedia-logo-v2.svg.png"
          alt="Wikipedia Logo"
        />

        <form class="search-form js-search-form">
          <input
            placeholder="Type a keyword and press Enter to search"
            type="search"
            class="search-input js-search-input"
            autofocus
            onChange={handleChange}
          />
          <button onClick={handleSubmit}> Search</button>
        </form>
      </header>

      <div class="loading-indicator">
        <div class="sk-chase js-spinner hidden">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      </div>
      <section class="search-results js-search-results">
        <div class="result-item"></div>
      </section>
    </div>
  );
};
export default Search;
