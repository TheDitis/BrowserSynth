import React, {Component} from 'react';
import './App.css';
import { Oscillator1 } from '../Oscillator1/Oscillator1.js';
import { Oscillator2 } from "../Oscillator2/Oscillator2";
import {Filter1} from "../Filter1/Filter1";

let osc1Gain, osc2Gain, osc3Gain, filterNode1;

class App extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: true,
      isStarted: false,
      audioCtx: null,
    }
  }

  componentDidMount = () => {
    let audioCtx = new (window.AudioContext)();
    this.setState({isLoading: false, audioCtx: audioCtx});
    osc1Gain = audioCtx.createGain();
    osc2Gain = audioCtx.createGain();
    osc3Gain = audioCtx.createGain();
    filterNode1 = audioCtx.createBiquadFilter();
    let Master = audioCtx.createGain();
    osc1Gain.connect(filterNode1);
    osc2Gain.connect(filterNode1);
    osc3Gain.connect(filterNode1);
    filterNode1.connect(Master);
    Master.connect(audioCtx.destination);
  };

  setInputs() {
    if (! this.state.audioCtx == null) {
      osc1Gain = this.state.audioCtx.createGain();
      osc2Gain = this.state.audioCtx.createGain();
      this.setState({osc1gain: osc1Gain, osc2gain: osc2Gain});
      console.log(this.osc1Gain);
    }
  }

  render() {
    return (
        <div className="App">
          { this.state.isLoading ? (
              <header className="loadtext">Loading</header>
          ) : (
              <div>
                <div id={"oscillators"}>
                  <Oscillator1 audioCtx={this.state.audioCtx} outputNode={osc1Gain}/>
                  <Oscillator2 audioCtx={this.state.audioCtx} outputNode={osc2Gain} />
                </div>
                <div id={"filters"}>
                  <Filter1 filterNode={filterNode1}/>
                </div>
                <div id={"mainAnalyzer"}>
                  <svg id={"analyzerWindow"}>
                    <path d={""} stroke={"blue"}></path>
                  </svg>
                </div>
              </div>
          )}

        </div>
    );
  }


}
export default App;
