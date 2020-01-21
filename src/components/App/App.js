import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: "Hampus"
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Salem,SE&appid=fe1d784597de2d1c99c36ffe308256b7"
      )
      .then(res => {
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    return <h1>Hej</h1>;
  }
}

export default App;
