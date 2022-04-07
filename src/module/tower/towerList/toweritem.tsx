import React from "react";
import { Link } from "react-router-dom";
import { TowerItemImg } from "./toweritem.style";
import TowerListData from "./towerlistData";

interface Props {
    list: Array<TowerListData>;
}

const TowerListImg = (props: Props) => {
    return (
        <>
            {props.list.map((tower, i) => {
                return (
                    <Link key={i} to={tower.link} data-testid="towerUrl">
                        <TowerItemImg alt="towerimg" src={tower.img} />
                    </Link>
                );
            })}
        </>
    );
};

export default TowerListImg;