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
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.search},SE&units=metric&appid=fe1d784597de2d1c99c36ffe308256b7`
      )
      .then(res => {
        console.log(res.data);
        let rainfall = 0;
        if (res.data.rain && (res.data.rain["3h"] || res.data.rain["3h"])) {
          rainfall = res.data.rain["3h"] || res.data.rain["3h"];
        }
        this.setState({
          loading: false,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          minTemp: res.data.main.temp_min,
          maxTemp: res.data.main.temp_max,
          temp: res.data.main.temp,
          pressure: res.data.main.pressure,
          humidity: res.data.main.humidity,
          windSpeed: res.data.wind.speed,
          windDeg: res.data.wind.deg,
          country: res.data.sys.country,
          name: res.data.name,
          feelsLike: res.data.main.feels_like,
          rainfall: rainfall
        });
      })
      .catch(err => {
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
        <Sidebar
          search={this.state.search}
          handleSubmit={this.handleSubmit}
          updateSearch={e => this.setState({ search: e.target.value })}
          icon={this.state.icon}
          temp={this.state.temp}
          description={this.state.description}
          rainfall={this.state.rainfall}
        />
        <WeatherInfo
          icon={this.state.icon}
          temp={this.state.temp}
          description={this.state.description}
          rainfall={this.state.rainfall}
          feelsLike={this.state.feelsLike}
          country={this.state.country}
          name={this.state.name}
          windSpeed={this.state.windSpeed}
          windDeg={this.state.windDeg}
          pressure={this.state.pressure}
          humidity={this.state.humidity}
        />
      </Layout>
    );
  }
}

export default App;
