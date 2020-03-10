import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import theme from "../theme";
import Sidebar from "./Sidebar";
import WeatherInfo from "./WeatherInfo";
import Layout from "./Layout";
import Loading from "./Loading";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
  }

  body {
    background-color: white;
  }
`;

const App = () => {
  const [search, setSearch] = useState("Stockholm");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleSubmit(null);
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // inte klar
    }
  }, [isOpen]);

  const handleResize = e => {
    if (window.innerWidth > 950) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    // skicka förfrågan om väderdata både för nutid och en prognos för 5 dagar
    const current = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search},SE&units=metric&appid=fe1d784597de2d1c99c36ffe308256b7&lang=se`
    );
    const forecast = axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search},SE&units=metric&appid=fe1d784597de2d1c99c36ffe308256b7&lang=se`
    );

    // vänta tills svar har kommit tillbaka från båda
    Promise.all([current, forecast])
      .then(res => {
        const current = res[0].data;
        const forecast = res[1].data;
        console.log("current: ", current);
        console.log("forecast: ", forecast);

        // spara väderdata för nutid
        setCurrentWeather(current);
        // spara data för prognos, är en array för varje tid prognosen visar
        // (var tredje timme 5 dagar framåt)
        setForecastWeather(forecast.list);
        setCity(forecast.city.name);
      })
      .catch(err => {
        // om APIen skickar tillbaka ett error
        setError(err.response || err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (error && error.data) {
    return <h1>Error: {error.data.message}</h1>;
  } else if (error) {
    return <h1>Error: {error.message || ""}</h1>;
  }
  {
    /* ThemeProvider get applikationen ett tema som är definerat i src/theme.js ett tema för att enkelt kunna använda färger */
  }
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Sidebar
              forecast={forecastWeather}
              weather={currentWeather}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/current" />} />
              <Route
                path="/current"
                render={() => (
                  <WeatherInfo
                    search={search}
                    handleSubmit={handleSubmit}
                    updateSearch={e => setSearch(e.target.value)}
                    current={currentWeather}
                    city={city}
                    isLoading={isLoading}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                )}
              />
              <Route
                path="/f/:day"
                render={() => (
                  <WeatherInfo
                    search={search}
                    handleSubmit={handleSubmit}
                    updateSearch={e => setSearch(e.target.value)}
                    current={null}
                    city={city}
                    isLoading={isLoading}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                )}
              />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
