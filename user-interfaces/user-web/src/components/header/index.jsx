import React from "react";
import SearchBar from "./upperHeader/SearchBar";
import CartIcon from "./upperHeader/CartIcon";
import Dropdwon from "./downHeader/Dropdown";
import NavigationMenu from "./downHeader/NavigationMenu";
import "./upperHeader/upperHeader.css";

const Header = ({ handleSearch, itemsOfCart }) => {
  return (
    <>
      <div className="Header">
        <div className="upper__header">
          <SearchBar handleSearch={handleSearch} />
          <CartIcon itemsOfCart={itemsOfCart} />
        </div>
        <div className="down__header">
          <Dropdwon
            options={["Select a platform", "Switch", "GameCube", "MS-DOS"]}
          />
          <NavigationMenu />
        </div>
      </div>
      <div className="headermargin"></div>
    </>
  );
};
export default Header;