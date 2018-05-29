import React, { Component } from 'react';
import { Input, Select } from 'antd';

import 'antd/dist/antd.css';
import './App.css';

import SearchResults from "./SearchResults";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPlay: 'hamlet',
      chosenPlay: 'hamlet',
      searchQuery: null
    };
  }

  changePlay = value => {
    this.setState({
      chosenPlay: value
    });
  };

  render() {
    const searchAfter = (
      <Select
        defaultValue="hamlet"
        className="playSelect"
        onChange={this.changePlay}>
        <Select.Option value="hamlet">Hamlet</Select.Option>
        <Select.Option value="measure">Measure for Measure</Select.Option>
        <Select.Option value="henryv">Henry V</Select.Option>
      </Select>
    );

    return (
      <div className="App">
        <div className="topHeader">
          <h1 className="title">shake-search</h1>
          <h3 className="desc">search shakespeare's plays</h3>
          <Input.Search
            className="search"
            placeholder="Search all lines"
            enterButton
            size="large"
            addonBefore={searchAfter}
            onSearch={value => this.setState(state => ({ searchQuery: value, searchPlay: state.chosenPlay }))}
          />
        </div>
        <div className="results">
          {this.state.searchQuery && (
            <SearchResults play={this.state.searchPlay} searchQuery={this.state.searchQuery} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
