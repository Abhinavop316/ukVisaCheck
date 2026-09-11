import React from "react";
import Navbar from "./header/Navbar";
import NavigationMenu from "./header/NavigationMenu";
import "../styles/Head.css";

function Head({ searchQuery, setSearchQuery, onSearchSubmit }) {
  return (
    <div className="head-shell">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={onSearchSubmit}
      />
      <NavigationMenu />
    </div>
  );
}

export default Head;
