import React from 'react';
import {Link} from 'react-router-dom';
import './skillcolor.css';

interface Props {
	skill: number,
	link: string
}

const SingleSkillColorChanger = (props: Props) => {
	const color = (skill: number) => {
		let colorClass = "s0";

		if(skill < 1000) {
			colorClass = "s0";
		}
		else if(skill >= 1000 && skill < 1500) {
			colorClass = "s1";
		}
		else if(skill >= 1500 && skill < 2000) {
			colorClass = "s2";
		}
		else if(skill >= 2000 && skill < 2500) {
			colorClass = "s3";
		}
		else if(skill >= 2500 && skill < 3000) {
			colorClass = "s4";
		}
		else if(skill >= 3000 && skill < 3500) {
			colorClass = "s5";
		}
		else if(skill >= 3500 && skill < 4000) {
			colorClass = "s6";
		}
		else if(skill >= 4000 && skill < 4500) {
			colorClass = "s7";
		}
		else if(skill >= 4500 && skill < 5000) {
			colorClass = "s8";
		}
		else if(skill >= 5000 && skill < 5500) {
			colorClass = "s9";
		}
		else if(skill >= 5500 && skill < 6000) {
			colorClass = "s10";
		}
		else if(skill >= 6000 && skill < 6500) {
			colorClass = "s11";
		}
		else if(skill >= 6500 && skill < 7000) {
			colorClass = "s12";
		}
		else if(skill >= 7000 && skill < 7500) {
			colorClass = "s13";
		}
		else if(skill >= 7500 && skill < 8000) {
			colorClass = "s14";
		}
		else if(skill >= 8000 && skill < 8500) {
			colorClass = "s15";
		}
		else if(skill >= 8500 && skill < 9000) {
			colorClass = "color-text-flow";
		}
		else if(skill >= 9000 && skill < 9500) {
			colorClass = "color-text-flow";
		}
		else if(skill >= 9500) {
			colorClass = "color-text-flow";
		}

		return colorClass;
	}

	if(props.skill !== undefined) {
		return (
			<Link className={color(props.skill)}
				to={props.link}>
				<span style={{fontWeight: "bold"}}>{props.skill.toFixed(2)}</span>
			</Link>
		)
	}
	else {
		return (
			<Link className={color(0)}
				to={props.link}>
				<span style={{fontWeight: "bold"}}>0.00</span>
			</Link>
		)
	}
}

// 스킬페이지 테이블 왼쪽 컬러 - style 태그 용
export const skillTableColor = (skill: number) => {
	let color = "";
	if(skill < 2000) color = "#FFFFFF";
	else if(skill < 3000) color = "#FACC2E";
	else if(skill < 4000) color = "linear-gradient(#FACC2E, #FFFFFF)";
	else if(skill < 5000) color = "#FFFF00";
	else if(skill < 6000) color = "linear-gradient(#FFFF00, #FFFFFF)";
	else if(skill < 7000) color = "#33FF00";
	else if(skill < 8000) color = "linear-gradient(#33FF00, #FFFFFF)";
	else if(skill < 9000) color = "#3366FF";
	else if(skill < 10000) color = "linear-gradient(#3366FF, #FFFFFF)";
	else if(skill < 11000) color = "#FF00FF";
	else if(skill < 12000) color = "linear-gradient(#FF00FF, #FFFFFF)";
	else if(skill < 13000) color = "#FF0000";
	else if(skill < 14000) color = "linear-gradient(#FF0000, #FFFFFF)";
	else if(skill < 15000) color = "linear-gradient(#dd8844, #FFFFFF)";
	else if(skill < 16000) color = "linear-gradient(#888888, #dddddd)";
	else if(skill < 17000) color = "linear-gradient(#ffff99, #FFFFFF)";
	else if(skill < 18000) color = "linear-gradient(#FF0000, #FF8C00, #FFFF00, #80FF00)";
	else if(skill < 19000) color = "linear-gradient(#80FF00, #58ACFA, #0101DF)";
	else color = "linear-gradient(#5858FA, #FF0040)";
	return color;
}

// 스킬페이지 테이블 스샷용 컬러 - style 태그 용
export const skillTableColorFlat = (skill: number) => {
	var color = "";
	if(skill < 20000000) color = "background-color: #FFFFFF";
	else if(skill < 30000000) color = "background-color: #FACC2E";
	else if(skill < 40000000) color = "background: linear-gradient(to right, #FACC2E, #FFFFFF)";
	else if(skill < 50000000) color = "background-color: #FFFF00";
	else if(skill < 60000000) color = "background: linear-gradient(to right, #FFFF00, #FFFFFF)";
	else if(skill < 70000000) color = "background-color: #33FF00";
	else if(skill < 80000000) color = "background: linear-gradient(to right, #33FF00, #FFFFFF)";
	else if(skill < 90000000) color = "background-color: #3366FF";
	else if(skill < 100000000) color = "background: linear-gradient(to right, #3366FF, #FFFFFF)";
	else if(skill < 110000000) color = "background-color: #FF00FF";
	else if(skill < 120000000) color = "background: linear-gradient(to right, #FF00FF, #FFFFFF)";
	else if(skill < 130000000) color = "background-color: #FF0000";
	else if(skill < 140000000) color = "background: linear-gradient(to right, #FF0000, #FFFFFF)";
	else if(skill < 150000000) color = "background: linear-gradient(to right, #dd8844, #FFFFFF)";
	else if(skill < 160000000) color = "background: linear-gradient(to right, #888888, #dddddd)";
	else if(skill < 170000000) color = "background: linear-gradient(to right, #ffff99, #FFFFFF)";
	else if(skill < 180000000) color = "background: linear-gradient(to right, #FF0000, #FF8C00, #FFFF00, #80FF00)";
	else if(skill < 190000000) color = "background: linear-gradient(to right, #80FF00, #58ACFA, #0101DF)";
	else color = "background: linear-gradient(to right, #5858FA, #FF0040)";
	return color;
}

export default SingleSkillColorChanger;