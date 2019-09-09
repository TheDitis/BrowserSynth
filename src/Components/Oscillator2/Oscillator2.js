import React, {Component} from 'react';
import '../App/App.css';
import './Oscillator2.css';

export class Oscillator2 extends Component {
    constructor () {
        super();
        this.state = {
            oscObj: null,
            frequency: 500,
            gain: 100,
            type: "sine",
            audioCtx: null,
            outputNode: null,
            isPlaying: false
        };
    }

    async componentDidMount() {
        await this.setState({audioCtx: this.props.audioCtx, outputNode: this.props.outputNode});
        this.setup();
    }

    setup () {
        let audioCtx = this.state.audioCtx;
        // let gainNode = this.state.outputNode;
        if (audioCtx == null) {
        } else {
            // gainNode.connect(this.state.audioCtx.destination);
            this.createOscillator();
            this.init_controls();
        }
    }

    createOscillator() {
        let audioCtx = this.state.audioCtx;
        let osc = audioCtx.createOscillator();
        this.setState({oscObj: osc});
        let gainNode = this.state.outputNode;
        osc.connect(gainNode);
        this.setState({oscObj: osc});
        this.setParameters();
        this.play();
        // this.stop()
    }

    play() {
        let osc = this.state.oscObj;
        osc.start();
        this.setState({isPlaying: true});
    }

    stop() {
        let osc = this.state.oscObj;
        osc.stop();
        this.setState({isPlaying: false});
    }

    setParameters () {
        let osc = this.state.oscObj;
        let gainNode = this.state.outputNode;
        osc.frequency.value = this.state.frequency;
        gainNode.gain.value = this.state.gain;
        osc.type = this.state.type;
    }

    init_controls () {
        let freq = document.getElementById('osc2freq');
        let gain = document.getElementById("osc2gain");

        freq.addEventListener("input", this.changeFreq, false);
        gain.addEventListener("input", this.changeGain, false);
    }

    changeFreq = () => {
        let freq = document.getElementById('osc2freq').value;
        this.setState({frequency: freq});
        let osc = this.state.oscObj;
        osc.frequency.value = freq;
    };

    changeGain = () => {
        let gain = document.getElementById("osc2gain").value;
        this.setState({gain: gain});
        let gainNode = this.state.outputNode;
        gainNode.gain.value = gain;
    };

    setToSine = () => {
        let osc = this.state.oscObj;
        osc.type = "sine";
        this.setState({type: "sine"});
    };

    setToTri = () => {
        let osc = this.state.oscObj;
        osc.type = "triangle";
        this.setState({type: "triangle"});
    };

    setToSaw = () => {
        let osc = this.state.oscObj;
        osc.type = "sawtooth";
        this.setState({type: "sawtooth"});
    };

    render() {
        return (
            <div id={"osc2"} className={"oscillator"}>
                <div className={"waveformtype"}>
                    <h3>Waveform:</h3>
                    <button id={"sinebtn1"} className={"waveformbtn"} onClick={this.setToSine}>SINE</button>
                    <button id={"tribtn1"} className={"waveformbtn"} onClick={this.setToTri}>TRI</button>
                    <button id={"sawbtn1"} className={"waveformbtn"} onClick={this.setToSaw}>SAW</button>
                </div>
                <input type={"range"} className={"oscgain"} id={"osc2gain"} min={"0"} max={"100"} onChange={this.changeGain}/><br/>
                <input type={"range"} className={"oscfreq"} id={"osc2freq"} min={"20"} max={"2000"} onChange={this.changeFreq}/>
            </div>
        )
    }
}

// export default Oscillator1;