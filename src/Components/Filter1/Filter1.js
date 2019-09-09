import React, {Component} from 'react';
import '../App/App.css';
import './Filter1.css';


export class Filter1 extends Component {
    constructor() {
        super();
        this.state = {
            type: "lowpass",
            cutoff: "20000",
            Q: 1,
            filterNode: null
        }
    }

    componentDidMount() {
        this.setState({filterNode: this.props.filterNode});
    }

    changeCutoff = () => {
        let cutoff = document.getElementById("cutoff1").value;
        let filterNode = this.state.filterNode;
        filterNode.frequency.value = cutoff
    };

    changeResonance = () => {
        let Q = document.getElementById("Q1").value;
        let filterNode = this.state.filterNode;
        filterNode.Q.value = Q;
    };

    render() {
        return(
            <div id={"filter1"} className={"filter"}>
                <input type={"range"} className={"cutoff"} id={"cutoff1"} min={"20"} max={"20000"} onChange={this.changeCutoff}/><br/>
                <input type={"range"} className={"Q"} id={"Q1"} min={"0"} max={"20"} onChange={this.changeResonance}/>
            </div>
        )
    }
}