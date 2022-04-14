import store from "@/mobx/store";
import { observer } from "mobx-react";
import React from "react";
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line,
    ResponsiveContainer,
} from "recharts";
import useRecentGraph from "./useRecentGraph";

interface Props {
    id: string;
    type: string;
}

const ProfileRecent = observer((props: Props) => {
    const [lineData, min, max] = useRecentGraph(props.id, props.type);
    const { dark } = store;
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={dark.dark ? "white" : "black"} />
                <YAxis domain={[min, max]} stroke={dark.dark ? "white" : "black"} />
                <Tooltip cursor={true} content={<CustomTooltip />} />
                <Line name="DM" type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
});

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

export default ProfileRecent;
