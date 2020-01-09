import React, {Component, Fragment} from 'react';
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line} from 'recharts';
import axios from 'axios';
import commonData from '../../Common/commonData';
import SkillRecord from './skillRecord';

interface Props {
    id: string,
    type: string
}

interface State {
    record: Array<SkillRecord>,
    winsize: number,
    length: number,
    gmin: number,
    gmax: number,
    dmin: number,
    dmax: number
}

class ProfileRecent extends Component<Props, State> {
    state: State = {
        record: [],
        winsize: 0,
        length: 0,
        gmin: 0,
        gmax: 0,
        dmin: 0,
        dmax: 0
    }

    componentWillMount() {
        axios.post(commonData.commonDataURL+"skillrecord/"+this.props.id)
        .then((res) => {
            const record = res.data.record;
            const length = record.length;

            // min max calc
            const minmax = this.getMinMax(record);

            this.setState({
                record: record,
                winsize: this.widthCalc(window.innerWidth),
                length: length,
                gmin: minmax[0],
                gmax: minmax[1],
                dmin: minmax[2],
                dmax: minmax[3]
            });
        });
    }

    getMinMax(record: Array<SkillRecord>) {
        let gmin = 0;
        let gmax = 0;
        let dmin = 0;
        let dmax = 0;

        record.forEach(e => {
            const gc = e.gskill;
            const dc = e.dskill;

            if(gmin === gmax && gmin === 0 && parseInt(gc) !== 0) {
                // 초기값 설정 - 0은 표시 안함
                gmin = parseInt(gc); gmax = parseInt(gc);
            }
            else if(gmin > parseInt(gc)) {
                gmin = parseInt(gc) - 100;
            }
            else if(gmax < parseInt(gc)) {
                gmax = parseInt(gc) + 100;
            }

            if(dmin === dmax && dmin === 0 && parseInt(dc) !== 0) {
                // 초기값 설정 - 0은 표시 안함
                dmin = parseInt(dc); dmax = parseInt(dc);
            }
            else if(dmin > parseInt(dc)) {
                dmin = parseInt(dc) - 100;
            }
            else if(dmax < parseInt(dc)) {
                dmax = parseInt(dc) + 100;
            }
        });

        return [gmin, gmax, dmin, dmax];
    }

    widthCalc(width: number) {
        let calc = 0;
        if(width < 768) calc = width * 0.38;
        else calc = width * 0.25;
        return calc;
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
                    pv:this.state.record[i].dskill});
            }
        }
        if(this.props.type === "dm") {
            return (
                <Fragment>
                    <LineChart
                        width={this.state.winsize}
                        height={200}
                        data={data} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="white" />
                            <YAxis domain={[this.state.dmin, this.state.dmax]} stroke="white" />
                            <Tooltip
                                cursor={true}
                                content={<CustomTooltip/>} />
                            <Line name="DM" type="monotone" dataKey="pv" stroke="#8884d8" />
                    </LineChart>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <LineChart
                        width={this.state.winsize}
                        height={200}
                        data={data} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="white" />
                            <YAxis domain={[this.state.gmin, this.state.gmax]} stroke="white" />
                            <Tooltip
                                cursor={true}
                                content={<CustomTooltip/>} />
                            <Line name="GF" type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </Fragment>
            )
        }
    }
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
        if(payload !== null) {
            return (
                <div>
                    <p>Date: {label}</p>
                    <p>Skill: {`${payload[0].value}`}</p>
                </div>
            );
        }
    }

    return null;
  };

export default ProfileRecent;