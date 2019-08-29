import React, {Component, Fragment} from 'react';
import {RadialBarChart, RadialBar, Text, XAxis} from 'recharts';

let data = [];
let skillType = 0;
let draw = 0;
let fill = 0;
let circle = 0;
let graph = [100, 100, 100, 100, 100];
let color = ["#333333", "#333333", "#333333", "#333333", "#333333"];
const style = {
    top: 0,
    left: 0,
    lineHeight: '24px',
};

class ProfileGraph extends Component {
    constructor(props) {
        super(props);
        this.resetGraph();

        skillType = parseInt(this.props.skill / 500);
        draw = this.props.skill % 500;
        fill = parseInt(draw / 100);
        circle = draw % 100;

        graph[fill] = circle;
        this.getColor(skillType, fill, color);

        data = [
            {uv: graph[0], fill: color[0]},
            {uv: graph[1], fill: color[1]},
            {uv: graph[2], fill: color[2]},
            {uv: graph[3], fill: color[3]},
            {uv: graph[4], fill: color[4]}
        ];
    }

    resetGraph() {
        graph = [100, 100, 100, 100, 100];
        color = ["#cccccc", "#cccccc", "#cccccc", "#cccccc", "#cccccc"];
    }

    getColor(skill, fill, colorArray) {
        if(skill < 2) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#ffffff";
            }
        }
        else if(skill < 3) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FACC2E";
            }
        }
        else if(skill < 4) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FACC2E";
            }
        }
        else if(skill < 5) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FFFF00";
            }
        }
        else if(skill < 6) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FFFF00";
            }
        }
        else if(skill < 7) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#33FF00";
            }
        }
        else if(skill < 8) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#33FF00";
            }
        }
        else if(skill < 9) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#7598FF";
            }
        }
        else if(skill < 10) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#7598FF";
            }
        }
        else if(skill < 11) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FF00FF";
            }
        }
        else if(skill < 12) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FF00FF";
            }
        }
        else if(skill < 13) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FF0000";
            }
        }
        else if(skill < 14) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FF0000";
            }
        }
        else if(skill < 15) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#dd8844";
            }
        }
        else if(skill < 16) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#888888";
            }
        }
        else if(skill < 17) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#ffff99";
            }
        }
        else if(skill < 18) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#FF8C00";
            }
        }
        else if(skill < 19) {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#80FF00";
            }
        }
        else {
            for(let i = 0; i <= fill; i++) {
                color[i] = "#5858FA";
            }
        }
    }

    render () {
        return (
            <Fragment>
                <RadialBarChart
                    width={200}
                    height={200}
                    cx={100}
                    cy={100}
                    innerRadius={0}
                    outerRadius={100}
                    barSize={20}
                    data={data}
                    startAngle={90}
                    endAngle={450}>
                    <RadialBar minAngle={15} /*label={{ position: 'insideStart', fill: '#333333' }}*/ background clockWise dataKey="uv" />
                    {/*<Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />*/}
                </RadialBarChart>
                <XAxis
                    label={{ value: this.props.skill, position: 'insideTop', offset: 10 }} >
                </XAxis>
            </Fragment>
        )
    }
}

export default ProfileGraph;