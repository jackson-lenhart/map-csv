import React from "react";
import { render } from "react-dom";
import map from "lodash/map";

import players from "../data/reduced-players.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      searchResults: [],
      image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  search() {
    this.setState({ image: "" });
    const searchResults = players.filter(player => {
      return player.nameLast === this.state.value;
    });
    this.setState({ searchResults });
  }

  getImage(e) {
    const name = e.target.textContent;
    const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyC2vZ79256ceRtz0lHD7Ho4F54iHgFjlvE&cx=006487370009656248558:_e6qghe4glg&searchType=image&q=${name}`;
    const img = fetch(url).then(res => {
      return res.json();
    }).then(res => {
      this.setState({
        image: (
          <img src={res.items[0].link} alt="poop"/>
        )
      });
    });
  }

  //resize image

  render() {
    const style = {
      container: {
        textAlign: "center",
        paddingTop: "100px"
      }
    };

    let searchResultsHtml = "";
    if (this.state.searchResults.length > 0) {
      searchResultsHtml = this.state.searchResults.map((item, index) => {
        return (
          <p key={index} onClick={this.getImage}>{item.nameFirst} {item.nameLast}</p>
        );
      });
    }

    return (
      <div style={style.container}>
        <input type="text" onChange={this.handleChange}/>
        <button onClick={this.search}>Search</button>
        <br/>
        {this.state.image}
        {searchResultsHtml}
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));

//api key: AIzaSyC2vZ79256ceRtz0lHD7Ho4F54iHgFjlvE
//https://www.googleapis.com/customsearch/v1?key=AIzaSyC2vZ79256ceRtz0lHD7Ho4F54iHgFjlvE&cx=006487370009656248558:_e6qghe4glg&q=${lastName}
