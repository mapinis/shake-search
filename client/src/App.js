import React, { Component } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenPlay: "hamlet",
      results: []
    }
  }

  changePlay = value => {
    this.setState({
      chosenPlay: value
    });
  }

  render() {

    searchAfter = (
      <Select defaultValue="hamlet" className="playSelect" onChange={this.changePlay}>
        <Select.Option value="hamlet">Hamlet</Select.Option>
        <Select.Option value="measure">Measure for Measure</Select.Option>
        <Select.Option value="henryv">Henry V</Select.Option>
      </Select>
    );

    return (
      <div className="App">
        <div className="searchSentence">

        </div>
        <div className="results">
          {this.state.results.length !== 0 && this.state.results}
          {this.state.results.length === 0 && (
            <div>Hit go to search</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
