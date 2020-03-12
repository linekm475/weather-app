import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { darkMode, lightMode } from "../theme";
import Sidebar from "./Sidebar";
import WeatherInfo from "./WeatherInfo";
import Layout from "./Layout";
import Overlay from "./Overlay";

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
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    handleSubmit(null);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

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

        // ta bort tidigare error om det finns
        setError(null);

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
        setSearch("");
        setIsLoading(false);
      });
  };

  {
    /* ThemeProvider get applikationen ett tema som är definerat i src/theme.js ett tema för att enkelt kunna använda färger */
  }
  return (
    <>
      <GlobalStyle isOpen={isOpen} />
      <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
        <BrowserRouter>
          <Layout>
            <Sidebar
              forecast={forecastWeather}
              weather={currentWeather}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
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
                    forecast={null}
                    city={city}
                    isLoading={isLoading}
                    error={error}
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
                    forecast={forecastWeather}
                    city={city}
                    isLoading={isLoading}
                    error={error}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                )}
              />
            </Switch>
            <Overlay
              isOpen={isOpen}
              onClick={() => setIsOpen(false)}
            />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
