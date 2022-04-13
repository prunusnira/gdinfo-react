import React from "react";
import MusicDataType from "./musicData";
import store from "@/mobx/store";

import txtMusicKo from "@/lang/pattern/music/txtmusic-ko";
import txtMusicJp from "@/lang/pattern/music/txtmusic-jp";
import txtMusicEn from "@/lang/pattern/music/txtmusic-en";
import {
    ItemCont,
    ItemDiff,
    ItemDiffWrapper,
    ItemOuter,
    ItemRank,
    ItemTitle,
    ItemWrapper,
    MusicItemWrapper,
} from "./popupMusicItem.style";
import { observer } from "mobx-react";
import { ThemedLink } from "@/styled/styledCommon";

interface Props {
    list: Array<MusicDataType>;
    type: number;
}

const PopupMusicItem = observer((props: Props) => {
    const lang = store.language.lang;
    const { dark } = store;

    const txtMusic = lang === "ko" ? txtMusicKo : lang === "jp" ? txtMusicJp : txtMusicEn;

    return (
        <>
            {props.list.map((music, i) => {
                if (
                    (props.type === 0 && (i === 0 || i === 1 || i === 2 || i === 3)) ||
                    (props.type === 1 && (i === 4 || i === 5 || i === 6 || i === 7)) ||
                    (props.type === 2 && (i === 8 || i === 9 || i === 10 || i === 11))
                ) {
                    if (music.lv !== "0.00") {
                        return (
                            <MusicItemWrapper>
                                <ItemDiffWrapper>
                                    <ItemDiff>
                                        {music.diff}&nbsp;{music.lv}
                                    </ItemDiff>
                                    <ItemRank>
                                        <ThemedLink
                                            dark={false}
                                            className="innerhref"
                                            to={music.ranklink}
                                        >
                                            Pattern Ranking
                                        </ThemedLink>
                                    </ItemRank>
                                </ItemDiffWrapper>
                                <ItemOuter>
                                    <ItemWrapper>
                                        <ItemTitle>{txtMusic.count}</ItemTitle>
                                        <ItemCont>
                                            {music.cleartime} / {music.playtime}
                                        </ItemCont>
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        <ItemTitle>{txtMusic.combo}</ItemTitle>
                                        <ItemCont>{music.combo}</ItemCont>
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        <ItemTitle>{txtMusic.score}</ItemTitle>
                                        <ItemCont>{music.score}</ItemCont>
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        <ItemTitle>{txtMusic.rate}</ItemTitle>
                                        <ItemCont>{music.rate}%</ItemCont>
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        <ItemTitle>{txtMusic.skill}</ItemTitle>
                                        <ItemCont>{music.skill}</ItemCont>
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        <ItemTitle>{txtMusic.rank}</ItemTitle>
                                        <ItemCont>
                                            <img
                                                alt="rankimg"
                                                className="skillrank-img"
                                                src={music.rank}
                                            />
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: music.fc,
                                                }}
                                            ></span>
                                        </ItemCont>
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        {music.clearmeter !== "" && (
                                            <>
                                                <ItemTitle>Clear Meter</ItemTitle>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: music.clearmeter,
                                                    }}
                                                ></span>
                                            </>
                                        )}
                                    </ItemWrapper>
                                    <ItemWrapper>
                                        <ItemTitle>{txtMusic.oldrate}</ItemTitle>
                                        NX: {music.ratenx}% / EX: {music.rateex}% / MX:{" "}
                                        {music.ratemx}% / TBRE: {music.ratetbre}% / TB:{" "}
                                        {music.ratetb}%
                                    </ItemWrapper>
                                </ItemOuter>
                            </MusicItemWrapper>
                        );
                    } else {
                        return <></>;
                    }
                }
            })}
        </>
    );
});

export default PopupMusicItem;
