import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenPlay: "Hamlet",
      results: []
    }
  }

  changePlay = elem => {
    this.setState({
      chosenPlay: elem.key
    });
  }

  playMenu = (
    <Menu onClick={this.changePlay}>
      <Menu.Item key="Hamlet">
        Hamlet
      </Menu.Item>
      <Menu.Item key="Measure for Measure">
        Measure for Measure
      </Menu.Item>
      <Menu.Item key="Henry V">
        Henry V
      </Menu.Item>
    </Menu>
  )

  render() {
    return (
      <div className="App">
        <Dropdown overlay={this.playMenu} trigger={['click']}>
          <div>{this.state.chosenPlay} <Icon type='down' /></div>
        </Dropdown>
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
