import React from "react";
import PlaycntRankData from "./playcntrankData";
import { PCRICnt, PCRIIcon, PCRINum, PCRIUser, PCRIWrapper } from "./playcntItem.style";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import { ThemedLink } from "@/styled/styledCommon";

interface Props {
    list: Array<PlaycntRankData>;
}

const PlayCntRankItem = observer((props: Props) => {
    const { dark } = store;

    return (
        <>
            {props.list.map((v, i) => {
                return (
                    <PCRIWrapper dark={dark.dark}>
                        <PCRINum>{v.index}</PCRINum>
                        <PCRIUser>
                            {v.towertitle !== "" && (
                                <PCRIIcon
                                    alt="titletower"
                                    src={`${process.env.PUBLIC_URL}/general-img/title/${v.towertitle}.png`}
                                />
                            )}
                            <ThemedLink dark={dark.dark} to={v.prlink}>
                                {v.name}
                            </ThemedLink>
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
});

export default PlayCntRankItem;
