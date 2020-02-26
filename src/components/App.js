import React from "react";
import axios from "axios";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import theme from "../theme";
import Sidebar from "./Sidebar";
import WeatherInfo from "./WeatherInfo";
import Layout from "./Layout";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap");

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "Stockholm",
      loading: true,
      error: null,
      currentWeather: null,
      forecastWeather: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    // skicka förfrågan om väderdata både för nutid och en prognos för 5 dagar
    const current = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.search},SE&units=metric&appid=fe1d784597de2d1c99c36ffe308256b7`
    );
    const forecast = axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.search},SE&units=metric&appid=fe1d784597de2d1c99c36ffe308256b7`
    );

    // vänta tills svar har kommit tillbaka från båda
    Promise.all([current, forecast])
      .then(res => {
        console.log("pa values", res);

        const current = res[0].data;
        const forecast = res[1].data;

        console.log("current", current);
        this.setState({
          loading: false,
          // spara väderdata för nutid
          currentWeather: current,
          // spara data för prognos, är en array för varje tid prognosen visar(var tredje timme 5 dagar framåt)
          forecastWeather: forecast.list
        });
        console.log("forecast", forecast);
      })
      .catch(err => {
        // om APIen skickar tillbaka ett error
        console.log("pa err", err.response || err);
        this.setState({
          loading: false,
          error: err.response || err
        });
      });
  }

  render() {
    if (this.state.loading) return <h1>Loading...</h1>;
    if (this.state.error && this.state.error.data) {
      console.log("Error: ", this.state.error);
      return <h1>Error: {this.state.error.data.message}</h1>;
    } else if (this.state.error) {
      console.log("Error: ", this.state.error);
      return <h1>Error: {this.state.error.message || ""}</h1>;
    }
    {
      /* ThemeProvider get applikationen ett tema som är definerat i src/theme.js ett tema för att enkelt kunna använda färger */
    }
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Layout>
            <Sidebar
              forecast={this.state.forecastWeather}
              weather={this.state.currentWeather}
            />
            <WeatherInfo
              search={this.state.search}
              handleSubmit={this.handleSubmit}
              updateSearch={e => this.setState({ search: e.target.value })}
              weather={this.state.currentWeather}
            />
          </Layout>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
