import { atomDarkmode } from '@/jotai/darkmode';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useRecentGraph from './useRecentGraph';

interface Props {
    id: string;
    type: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
        if (payload !== null) {
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

const ProfileRecent = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);
    const { lineData, min, max } = useRecentGraph(props.id, props.type);
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={dark ? 'white' : 'black'} />
                <YAxis domain={[min, max]} stroke={dark ? 'white' : 'black'} />
                <Tooltip cursor={true} content={<CustomTooltip />} />
                <Line name="DM" type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ProfileRecent;
