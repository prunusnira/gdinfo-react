import React from "react";
import { Link } from "react-router-dom";
import { Icon, ItemCol, ItemRow } from "@/styled/styledCommon";
import PlaycntRankData from "./playcntrankData";
import { PCRICnt, PCRIIcon, PCRILink, PCRINum, PCRIUser, PCRIWrapper } from "./playcntItem.style";

interface Props {
    list: Array<PlaycntRankData>;
}

const PlayCntRankItem = (props: Props) => {
    return (
        <>
            {props.list.map((v, i) => {
                return (
                    <PCRIWrapper>
                        <PCRINum>{v.index}</PCRINum>
                        <PCRIUser>
                            {v.towertitle !== "" && (
                                <PCRIIcon
                                    alt="titletower"
                                    src={`${process.env.PUBLIC_URL}/general-img/title/${v.towertitle}.png`}
                                />
                            )}
                            <PCRILink to={v.prlink}>{v.name}</PCRILink>
                        </PCRIUser>
                        <PCRICnt>G {v.gfcnt}</PCRICnt>
                        <PCRICnt>+</PCRICnt>
                        <PCRICnt>D {v.dmcnt}</PCRICnt>
                        <PCRICnt>=</PCRICnt>
                        <PCRICnt>{v.allcnt}</PCRICnt>
                    </PCRIWrapper>
                );
            })}
        </>
    );
};

export default PlayCntRankItem;
