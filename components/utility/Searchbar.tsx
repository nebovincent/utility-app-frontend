import React from "react";
import { GoSearch } from "react-icons/go";
import classes from "components/utility/Searchbar.module.css";
import { Props } from "types/types";
function Searchbar({ onSubmit, onChange, value, onFocus }: Props) {
  return (
    <>
      <div className={classes.search_container}>
        <form onSubmit={onSubmit}>
          <div className={classes.search__input_main_area}>
            <input
              type="text"
              className={classes.search__input}
              onChange={onChange}
              value={value}
              onFocus={onFocus}
            />
            <button className={classes.search__input_icon_area} type="submit">
              <GoSearch className={classes.search__input_icon} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Searchbar;
