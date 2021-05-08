import React, {useEffect, useState} from 'react';
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line} from 'recharts';
import axios from 'axios';
import CommonData from '../../Common/commonData';
import SkillRecord from './skillRecord';

interface Props {
    id: string,
    type: string
}

const ProfileRecent = (props: Props) => {
    const [record, setRecord] = useState(Array<SkillRecord>())
    const [winsize, setWinsize] = useState(0)
    const [length, setLength] = useState(0)
    const [gmin, setGMin] = useState(0)
    const [gmax, setGMax] = useState(0)
    const [dmin, setDMin] = useState(0)
    const [dmax, setDMax] = useState(0)
    const [lineData, setLineData] = useState(Array<any>())

    useEffect(() => {
        axios.post(`${CommonData.dataUrl}skillrecord/${props.id}`)
        .then((res) => {
            const record = JSON.parse(res.data.record);
            const length = record.length;

            // min max calc
            const minmax = getMinMax(record);

            setRecord(record)
            setWinsize(widthCalc(window.innerWidth))
            setLength(length)
            setGMin(minmax[0])
            setGMax(minmax[1])
            setDMin(minmax[2])
            setDMax(minmax[3])
        })

        const data = [];
        for(let i = 0; i < length; i++) {
            if(props.type === "gf") {
                data.push({
                    name: record[i].date,
                    uv: record[i].gskill
                });
            }
            else {
                data.push({
                    name: record[i].date,
                    pv: record[i].dskill
                });
            }
        }
        setLineData(data)
    }, [])

    const getMinMax = (record: Array<SkillRecord>) => {
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

    const widthCalc = (width: number) => {
        let calc = 0;
        if(width < 768) calc = width * 0.38;
        else calc = width * 0.25;
        return calc;
    }

    const resetGraph = () => {
        setRecord([])
    }

    
    if(props.type === "dm") {
        return (
            <>
                <LineChart
                    width={winsize}
                    height={200}
                    data={lineData} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="white" />
                        <YAxis domain={[dmin, dmax]} stroke="white" />
                        <Tooltip
                            cursor={true}
                            content={<CustomTooltip/>} />
                        <Line name="DM" type="monotone" dataKey="pv" stroke="#8884d8" />
                </LineChart>
            </>
        )
    }
    else {
        return (
            <>
                <LineChart
                    width={winsize}
                    height={200}
                    data={lineData} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="white" />
                        <YAxis domain={[gmin, gmax]} stroke="white" />
                        <Tooltip
                            cursor={true}
                            content={<CustomTooltip/>} />
                        <Line name="GF" type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </>
        )
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