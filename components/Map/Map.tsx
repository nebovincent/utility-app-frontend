import React from "react";
import classes from "components/Map/Map.module.css";
import Container from "components/utility/Container";
import { GoSearch } from "react-icons/go";
import { BiGlobe } from "react-icons/bi";
import Script from "next/script";
import { server } from "config/index";

const Map = () => {
  return (
    <>
      <Container className={classes.map__container_main}>
        <div className={classes.map__main}>
          <div className={classes.map__main_icon}>
            <BiGlobe />
          </div>
          <p className={classes.map__main_desc_p}>
            Input a location/Address here
          </p>
          <div className={classes.formAndInfoWrapper}>
            <form>
              <div className={classes.search__input_main_area}>
                <input className={`${classes.search__input}`} />
                <button
                  className={classes.search__input_icon_area}
                  type="submit"
                >
                  <GoSearch className={classes.search__input_icon} />
                </button>
              </div>
            </form>

            <Container className={classes.map__info_container}>
              <div id="map"></div>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Map;
