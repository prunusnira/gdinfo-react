import React from "react";
import { Link } from "react-router-dom";
import PTListItemRow from "./ptListItemRow";
import { PatternData } from "./patternData";
import { GridCellTop, GridTxtRow, PTListGrid, PTListInfo, PTListRow } from "./ptList.style";

interface Props {
    list: Array<PatternData>;
}

const PTListItem = (props: Props) => {
    return (
        <>
            {props.list.map((p, i) => {
                return (
                    <>
                        <PTListRow>
                            <PTListInfo>
                                {/* 자켓 */}
                                <img
                                    alt="jacket-img"
                                    style={{ width: "85px", height: "85px" }}
                                    src={p.jacket}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src =
                                            process.env.PUBLIC_URL + "/general-img/empty.jpg";
                                    }}
                                />
                                <Link className="innerhref" to={p.link}>
                                    <GridTxtRow>{p.name}</GridTxtRow>
                                </Link>
                                <span style={{ color: "red" }}>
                                    {(function () {
                                        switch (p.removed) {
                                            case 1:
                                                return <b>(removed in TB)</b>;
                                            case 2:
                                                return <b>(removed in TBRE)</b>;
                                            case 3:
                                                return <b>(removed in MX)</b>;
                                            case 4:
                                                return <b>(removed in EX)</b>;
                                            case 5:
                                                return <b>(removed in NX)</b>;
                                            case 6:
                                                return <b>(removed in HV)</b>;
                                        }
                                    })()}
                                </span>
                            </PTListInfo>
                            <PTListGrid>
                                <GridCellTop>#</GridCellTop>
                                <GridCellTop>GUITAR</GridCellTop>
                                <GridCellTop>BASS</GridCellTop>
                                <GridCellTop>DRUM</GridCellTop>
                                <PTListItemRow list={p.difflist} />
                            </PTListGrid>
                        </PTListRow>
                    </>
                );
            })}
        </>
    );
};

export default PTListItem;
