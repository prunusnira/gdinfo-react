import React, {Component, Fragment} from 'react';
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line} from 'recharts';
import axios from 'axios';

class ProfileRecent extends Component {
    state = {
        record: [],
        winsize: 0,
        length: 0
    }

    componentWillMount() {
        axios.post("https://gitadora.info/d/skillrecord/"+this.props.id)
        .then((res) => {
            const record = res.data.record;
            const length = record.length;
            this.setState({
                record: record,
                winsize: window.innerWidth * 0.38,
                length: length
            });
        });
    }

    resetGraph() {
        this.setState({
            record: []
        });
    }

    render () {
        const data = [];
        for(let i = 0; i < this.state.length; i++) {
            if(this.props.type === "gf") {
                data.push({name:this.state.record[i].date,
                    uv:this.state.record[i].gskill});
            }
            else {
                data.push({name:this.state.record[i].date,
                    uv:this.state.record[i].dskill});
            }
        }
        return (
            <Fragment>
                <LineChart
                    width={this.state.winsize}
                    height={200}
                    data={data} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="white" />
                        <YAxis domain stroke="white" />
                        <Tooltip
                            cursor={true}
                            content={<CustomTooltip/>} />
                        <Line name="DM" type="monotone" dataKey="pv" stroke="#8884d8" />
                        <Line name="GF" type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </Fragment>
        )
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div>
                <p>Date: {label}</p>
                <p>Skill: {`${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
  };

export default ProfileRecent;