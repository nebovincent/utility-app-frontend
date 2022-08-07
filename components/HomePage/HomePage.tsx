import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navigation from "components/utility/Navigation";
import classes from "components/HomePage/HomePage.module.css";
import Circle from "components/utility/Circle";
import {
  FiCheckSquare,
  FiEdit3,
  FiCloud,
  FiMapPin,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";

import { FaUsersCog, FaUserCheck, FaEnvelope } from "react-icons/fa";
import Container from "components/utility/Container";
import AuthContext from "context/auth-context";

const HomePage = () => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.userloggedin) {
      setUserIsLoggedIn(true);
    }
    const timer = setTimeout(() => {
      setUserIsLoggedIn(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [router.query.userloggedin]);

  const authCtx = useContext(AuthContext);
  return (
    <Container className={classes.main__container}>
      <div className={classes.main}>
        <div className={classes.intro}>
          {userIsLoggedIn && (
            <p className={classes.userloggin}>You are now logged in....</p>
          )}
          <h2>
            Welcome to this random utility website designed and developed by
            <br />
            Vincent <span>Nebo</span>
            <br />
          </h2>
          <div className={classes.intro__dev}>
            <Link href="mailto:nebov3@gmail.com">
              <a>
                <FaEnvelope className={classes.features__icon} />
              </a>
            </Link>
            <Link href="mailto:nebov3@gmail.com">
              <a>
                <p>nebov3@gmail.com</p>
              </a>
            </Link>
          </div>
          {!authCtx.isLoggedIn && (
            <div className={classes.features__user_access}>
              <Link href="/Auth/User/LoginPage">
                <a>
                  <div className={classes.features__user_access_item}>
                    <p>LOGIN</p>
                    <FaUserCheck className={classes.features__icon} />
                  </div>
                </a>
              </Link>
              <Link href="/Auth/User/RegisterPage">
                <a>
                  <div className={classes.features__user_access_item}>
                    <p>REGISTER</p>
                    <FaUsersCog className={classes.features__icon} />
                  </div>
                </a>
              </Link>
            </div>
          )}

          <div className={classes.features__desc_main}>
            <Link href="/Todos/TodoPage">
              <a>
                <div className={classes.features__desc_main_item}>
                  <FiCheckSquare className={classes.features__icon} />
                  <p>Todos</p>
                </div>
              </a>
            </Link>
            <Link href="/Notes/NotesPage">
              <a>
                <div className={classes.features__desc_main_item}>
                  <FiEdit3 className={classes.features__icon} />
                  <p>Notes</p>
                </div>
              </a>
            </Link>
            <Link href="/Weather/WeatherPage">
              <a>
                <div className={classes.features__desc_main_item}>
                  <FiCloud className={classes.features__icon} />
                  <p>Weather</p>
                </div>
              </a>
            </Link>

            <Link href="/Map/MapPage">
              <a>
                <div className={classes.features__desc_main_item}>
                  <FiMapPin className={classes.features__icon} />
                  <p>Map</p>
                </div>
              </a>
            </Link>

            <Link href="/Clock/ClockPage">
              <a>
                <div className={classes.features__desc_main_item}>
                  <FiClock className={classes.features__icon} />
                  <p>Clock</p>
                </div>
              </a>
            </Link>

            <Link href="/Currencies/CurrenciesPage">
              <a>
                <div className={classes.features__desc_main_item}>
                  <FiDollarSign className={classes.features__icon} />
                  <p>Currencies</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={classes.circle1}>
          <div className={classes.circle2}>
            <div className={classes.circle3} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
