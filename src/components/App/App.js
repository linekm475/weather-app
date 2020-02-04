import React from "react";
import axios from "axios";
import "./App.css";
import Sidebar from "../Sidebar/Sidebar";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import Layout from "../Layout/Layout";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "Stockholm",
      loading: true,
      error: null,
      currentWeather: {
        description: "",
        icon: "",
        minTemp: null,
        maxTemp: null,
        temp: null,
        pressure: null,
        humidity: null,
        windSpeed: null,
        windDir: null,
        country: "",
        name: "",
        feelsLike: null,
        rainfall: null
      }
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

        // checka ifall APIen skicka tillbaka data om nederbörd, annars är nederbörd 0
        let rainfall = 0;
        if (current.rain && (current.rain["3h"] || current.rain["3h"])) {
          rainfall = current.rain["3h"] || current.rain["3h"];
        }
        console.log("current", current);
        this.setState({
          loading: false,
          // spara väderdata för nutid
          currentWeather: {
            description: current.weather[0].description,
            icon: current.weather[0].icon,
            minTemp: current.main.temp_min,
            maxTemp: current.main.temp_max,
            temp: current.main.temp,
            pressure: current.main.pressure,
            humidity: current.main.humidity,
            windSpeed: current.wind.speed,
            windDeg: current.wind.deg,
            country: current.sys.country,
            name: current.name,
            feelsLike: current.main.feels_like,
            rainfall: rainfall
          },
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
    if (this.state.error) {
      console.log("Error: ", this.state.error);
      return <h1>Error: {this.state.error.data.message}</h1>;
    }
    return (
      <Layout>
        <Sidebar forecast={this.state.forecastWeather} />
        <WeatherInfo
          search={this.state.search}
          handleSubmit={this.handleSubmit}
          updateSearch={e => this.setState({ search: e.target.value })}
          weather={this.state.currentWeather}
        />
      </Layout>
    );
  }
}

export default App;
