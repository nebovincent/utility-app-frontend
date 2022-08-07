import React, { useState, useEffect } from "react";

import "normalize.css";
import styled from "styled-components";

import { timezones as tz } from "./data/timezones";
import LocationDisplay from "./LocationDisplay";
import PlaceInput from "./PlaceInput";
import classes from "./Clock.module.css";
import PaginationComponent from "components/utility/PaginationComponent";

function lsTest() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

const Title = styled.h1`
  color: #e3e3e3;
  font-weight: lighter;
  font-size: 2em;
  text-align: center;
`;

const Footer = styled.footer`
  color: lightgray;
  font-size: 0.8em;
  /* background: black; */
  margin-top: 1em;
  text-align: center;
  padding: 1em;
`;

const Container = styled.section`
  margin: 0 auto;
  max-width: 800px;
  padding: 2em;
`;

const FooterLink = styled.a`
  color: lightgray;
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

const Header = styled.header`
  opacity: ${(props) => (props.showHeader ? 1 : 0)};
  transition: opacity 1s ease-in;
`;

export default function Clock() {
  const [clocks, setClocks] = useState([]);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (lsTest() === true) {
      const hasClocksInStorage =
        localStorage.getItem("clocks") &&
        JSON.parse(localStorage.getItem("clocks")).length > 0;
      const storedClocks = hasClocksInStorage
        ? JSON.parse(localStorage.getItem("clocks"))
        : null;
      if (hasClocksInStorage) {
        setClocks(storedClocks);
      }
    } else {
      console.log("localStorage not available");
    }
  }, []);

  useEffect(() => {
    if (lsTest() === true) {
      localStorage.setItem("clocks", JSON.stringify(clocks));
    } else {
    }
  }, [clocks]);

  const addClock = (city) => {
    setClocks([city, ...clocks]);
  };

  const removeClock = (id) => {
    setClocks(
      clocks.filter((city) => city.fields.geonameid !== parseInt(id, 10))
    );
  };

  // trying pagination
  // for paginationComponent
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clocks?.slice(indexOfFirstItem, indexOfLastItem);
  const numberOfPages = clocks?.length && clocks?.length / itemsPerPage;

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const forwardPages = () => {
    setCurrentPage(7);
  };
  //change page
  console.log(currentItems.length, "current items");
  // for paginationComponent
  // trying pagination

  return (
    <div className={classes.container__wrapper}>
      <Container>
        <Header showHeader={showHeader}>
          <Title>World Clock</Title>
          <PlaceInput addClock={addClock} />
        </Header>
        {clocks &&
          currentItems.map((city) => (
            <LocationDisplay
              key={city.id}
              removeClock={removeClock}
              city={city}
            />
          ))}
      </Container>

      {clocks.length > 0 && (
        <PaginationComponent
          className={classes.pagination_main}
          itemsPerPage={itemsPerPage}
          totalItems={clocks?.length || 0}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
          forwardPages={forwardPages}
          numberOfPages={numberOfPages}
        />
      )}

      <Footer>
        <FooterLink></FooterLink>
      </Footer>
    </div>
  );
}
