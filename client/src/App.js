import React, { Component } from 'react';
import { Input, Select } from 'antd';
import { TrackDocument } from 'react-track';
import { calculateScrollY, getDocumentRect } from 'react-track/tracking-formulas'
import Fade from 'react-reveal/Fade';

import 'antd/dist/antd.css';
import './App.css';

import SearchResults from './SearchResults';
import ToTop from './ToTop'

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
        <Select.Option value="allswell">All's Well That Ends Well</Select.Option>
        <Select.Option value="cleopatra">Antony and Cleopatra</Select.Option>
        <Select.Option value="asyoulikeit">As You Like It</Select.Option>
        <Select.Option value="comedy_errors">The Comedy of Errors</Select.Option>
        <Select.Option value="coriolanus">Coriolanus</Select.Option>
        <Select.Option value="cymbeline">Cymbeline</Select.Option>
        <Select.Option value="hamlet">Hamlet</Select.Option>
        <Select.Option value="1henryiv">Henry IV, Part 1</Select.Option>
        <Select.Option value="2henryiv">Henry IV, Part 2</Select.Option>
        <Select.Option value="henryv">Henry V</Select.Option>
        <Select.Option value="1henryvi">Henry VI, Part 1</Select.Option>
        <Select.Option value="2henryvi">Henry VI, Part 2</Select.Option>
        <Select.Option value="3henryvi">Henry VI, Part 3</Select.Option>
        <Select.Option value="henryviii">Henry VIII</Select.Option>
        <Select.Option value="julius_caesar">Julius Caesar</Select.Option>
        <Select.Option value="john">King John</Select.Option>
        <Select.Option value="lear">King Lear</Select.Option>
        <Select.Option value="lll">Love's Labor Lost</Select.Option>
        <Select.Option value="macbeth">Macbeth</Select.Option>
        <Select.Option value="measure">Measure for Measure</Select.Option>
        <Select.Option value="merchant">The Merchant of Venice</Select.Option>
        <Select.Option value="merry_wives">The Merry Wives of Windsor</Select.Option>
        <Select.Option value="midsummer">A Midsummer Night's Dream</Select.Option>
        <Select.Option value="much_ado">Much Ado About Nothing</Select.Option>
        <Select.Option value="othello">Othello</Select.Option>
        <Select.Option value="pericles">Pericles, Prince of Tyre</Select.Option>
        <Select.Option value="richardii">Richard II</Select.Option>
        <Select.Option value="richardiii">Richard III</Select.Option>
        <Select.Option value="romeo_juliet">Romeo and Juliet</Select.Option>
        <Select.Option value="taming_shrew">Taming of the Shrew</Select.Option>
        <Select.Option value="tempest">The Tempest</Select.Option>
        <Select.Option value="timon">Timon of Athens</Select.Option>
        <Select.Option value="titus">Titus Andronicus</Select.Option>
        <Select.Option value="troilus_cressida">Troilus and Cressida</Select.Option>
        <Select.Option value="twelfth_night">Twelfth Night</Select.Option>
        <Select.Option value="two_gentlemen">Two Gentlemen of Verona</Select.Option>
        <Select.Option value="winters_tale">Winter's Tale</Select.Option>
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
        <TrackDocument formulas={[calculateScrollY, getDocumentRect]}>
          {(scrollY, rect) => (
            <div className="toTop">
              {scrollY / rect.height >= 0.9 &&
                <Fade>
                    <ToTop />
                </Fade>}
            </div>
          )}
        </TrackDocument>
      </div>
    );
  }
}

export default App;
