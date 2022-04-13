import React from "react";
import PTListItemRow from "./ptListItemRow";
import { PatternData } from "./patternData";
import { GridCellTop, GridTxtRow, PTListGrid, PTListInfo, PTListRow } from "./ptList.style";
import { Anchor } from "@/styled/styledCommon";
import store from "@/mobx/store";
import { observer } from "mobx-react";

interface Props {
    list: Array<PatternData>;
    openPopup: (mid: number) => void;
}

const PTListItem = observer((props: Props) => {
    const { dark } = store;

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
                                <Anchor
                                    dark={dark.dark}
                                    className="innerhref"
                                    onClick={() => props.openPopup(p.mid)}
                                >
                                    <GridTxtRow>{p.name}</GridTxtRow>
                                </Anchor>
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
                                <GridCellTop>G</GridCellTop>
                                <GridCellTop>B</GridCellTop>
                                <GridCellTop>D</GridCellTop>
                                <PTListItemRow list={p.difflist} />
                            </PTListGrid>
                        </PTListRow>
                    </>
                );
            })}
        </>
    );
});

export default PTListItem;
