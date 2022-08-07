import React, { useState, useContext } from "react";
import Container from "components/utility/Container";
import classes from "components/Weather/Weather.module.css";
import { GoSearch } from "react-icons/go";
import { WiCloud, WiDaySleetStorm } from "react-icons/wi";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
import PageLoader from "components/utility/PageLoader";

const Weather = () => {
  const authCtx = useContext(AuthContext);
  const [location, setLocation] = useState({
    input: "",
    resolvedAddress: "",
    temp: "",
    conditions: "",
    description: "",
  });

  const setLocationInputState = (e: any) => {
    setLocation({ ...location, input: e.target.value });
  };

  const checkWeather = async (e: any) => {
    e.preventDefault();
    authCtx.reqLoadingStateHandler();
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.input}?key=Q23NTSAX396M5L2SGT8BPM5CQ`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
      }
    );
    const res = await response.json();

    setLocation({
      ...location,
      resolvedAddress: res.resolvedAddress,
      temp: res.currentConditions.temp,
      conditions: res.currentConditions.conditions,
      description: res.description,
    });
    authCtx.reqLoadingStateResetHandler();
  };

  return (
    <>
      {authCtx.reqLoadingState ? (
        <PageLoader />
      ) : (
        <Container className={classes.weather__container_main}>
          <div className={classes.weather__main}>
            <h1>Weather Checker</h1>
            <div className={classes.weather__main_icon}>
              <WiCloud />
            </div>
            <p className={classes.weather__main_desc_p}>
              Input a location to view it&#39;s weather condition
              <br />
              <span>preferably `city &amp; country`</span>
              <br />
              <span>example: New York City, USA</span>
            </p>
            <div className={classes.formAndInfoWrapper}>
              <form onSubmit={checkWeather}>
                <div className={classes.search__input_main_area}>
                  <input
                    type="text"
                    className={classes.search__input}
                    onChange={setLocationInputState}
                    value={location.input}
                    onBlur={(e) => (e.target.value = "")}
                  />
                  <button
                    className={classes.search__input_icon_area}
                    type="submit"
                  >
                    <GoSearch className={classes.search__input_icon} />
                  </button>
                </div>
              </form>
              {location.resolvedAddress &&
                location.temp &&
                location.conditions &&
                location.description && (
                  <div className={classes.weather__info_container_wrapper}>
                    <Container className={classes.weather__info_container}>
                      <div>
                        <h2>{location.resolvedAddress}</h2>
                        <h4>Temperature: {location.temp} ℉</h4>
                        <h5>{location.conditions}</h5>
                        <p>{location.description}</p>
                      </div>
                      <div className={classes.weatherIcons_}>
                        <WiDaySleetStorm className={classes.weatherIcon} />
                      </div>
                    </Container>
                  </div>
                )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Weather;
