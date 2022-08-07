import React, { useState, useContext } from "react";
import { FiAlignRight, FiAlignLeft } from "react-icons/fi";
import classes from "components/utility/Navigation.module.css";
import Card from "components/utility/Card";
import UtilContext from "context/util-context";
import AuthContext from "context/auth-context";
import { FaNodeJs } from "react-icons/fa";
import Link from "next/link";
import Container from "components/utility/Container";
import { Props } from "types/types";
import Image from "next/image";
import nextConfig from "next.config";

const Navigation = (props: Props) => {
  const utilCtx = useContext(UtilContext);
  const authCtx = useContext(AuthContext);
  // const myLoader = ({ src, width, quality }: Props) => {
  //   return `${nextConfig?.env?.backend_url}/${src}?w=${width}&q=${
  //     quality || 75
  //   }`;
  // };

  return (
    <>
      <Container className={classes.main__container}>
        <main className={classes.main}>
          <div className={classes.menu__container}>
            <Link href="/">
              <a>
                <div className={classes.logo__container}>
                  <FaNodeJs />
                </div>
              </a>
            </Link>

            <div
              onClick={utilCtx.showMenu}
              className={classes.mobileMenuDropDown_icons}
            >
              {!utilCtx.showMenuState && <FiAlignRight />}
              {utilCtx.showMenuState && <FiAlignLeft />}
            </div>
            <div className={classes.largerScreenNav_main_area}>
              <ul>
                <Link href="/">
                  <li>Home</li>
                </Link>

                <Link href="/Todos/TodoPage">
                  <li>Todos</li>
                </Link>

                <Link href="/Notes/NotesPage">
                  <li>Notes</li>
                </Link>

                <Link href="/Weather/WeatherPage">
                  <li>Weather</li>
                </Link>

                <Link href="/Map/MapPage">
                  <li>Map</li>
                </Link>

                <Link href="/Clock/ClockPage">
                  <li>Clock</li>
                </Link>

                <Link href="/Currencies/CurrenciesPage">
                  <li>Currency</li>
                </Link>

                {!authCtx.isLoggedIn && (
                  <>
                    <Link href="/Auth/User/LoginPage">
                      <li>Login</li>
                    </Link>

                    <Link href="/Auth/User/RegisterPage">
                      <li>Register</li>
                    </Link>
                  </>
                )}

                {authCtx.isLoggedIn && authCtx.userRole === "admin" && (
                  <Link href="/Auth/Admin/UsersPage">
                    <li>Admin-(Users)</li>
                  </Link>
                )}
                {authCtx.isLoggedIn && (
                  <Link href="/Auth/User/UserProfile/ProfilePage">
                    <li>Profile</li>
                  </Link>
                )}
                {authCtx.isLoggedIn && (
                  <li onClick={authCtx.onLogout}>Log out</li>
                )}
              </ul>
            </div>
          </div>
          {utilCtx.showMenuState && (
            <div className={classes.menu__dropdown_main_mobile}>
              <Card className={classes.menu__dropdown_card}>
                <ul>
                  <Link href="/">
                    <li>Home</li>
                  </Link>
                  <Link href="/Todos/TodoPage">
                    <li>Todos</li>
                  </Link>
                  <Link href="/Notes/NotesPage">
                    <li>Notes</li>
                  </Link>
                  <Link href="/Weather/WeatherPage">
                    <li>Weather</li>
                  </Link>
                  <Link href="/Map/MapPage">
                    <li>Map</li>
                  </Link>
                  <Link href="/Clock/ClockPage">
                    <li>World Clock</li>
                  </Link>
                  <Link href="/Currencies/CurrenciesPage">
                    <li>Currency</li>
                  </Link>

                  {!authCtx.isLoggedIn && (
                    <Link href="/Auth/User/LoginPage">
                      <li>Login</li>
                    </Link>
                  )}
                  {!authCtx.isLoggedIn && (
                    <Link href="/Auth/User/RegisterPage">
                      <li>Register</li>
                    </Link>
                  )}

                  {authCtx.isLoggedIn && (
                    <Link href="/Auth/User/UserProfile/ProfilePage">
                      <li>Profile</li>
                    </Link>
                  )}

                  {authCtx.isLoggedIn && authCtx.userRole === "admin" && (
                    <Link href="/Auth/Admin/UsersPage">
                      <li>Admin-(Users)</li>
                    </Link>
                  )}

                  {authCtx.isLoggedIn && (
                    <li onClick={authCtx.onLogout}>Log out</li>
                  )}
                </ul>
              </Card>
            </div>
          )}
        </main>
      </Container>
    </>
  );
};

export default Navigation;
