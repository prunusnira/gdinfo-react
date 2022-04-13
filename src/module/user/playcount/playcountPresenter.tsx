import React, { useState } from "react";
import CountTable from "./countTable";
import scrShot from "@/module/common/scrshot";
import { Button } from "@/styled/styledCommon";
import PlaycountData from "./playcountData";
import store from "@/mobx/store";

import txtPlayCountKo from "@/lang/user/playcount/txtPlayCount-ko";
import txtPlayCountJp from "@/lang/user/playcount/txtPlayCount-jp";
import txtPlayCountEn from "@/lang/user/playcount/txtPlayCount-en";
import { PCBtnWrapper, PCDesc, PCListWrapper, PCTitle } from "./playcountPresenter.style";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";

interface Props {
    userName: string;
    id: string;
    towerTitle: string;
    plist: Array<PlaycountData>;
    glist: Array<PlaycountData>;
    dlist: Array<PlaycountData>;
    mlist: Array<PlaycountData>;
}

const PlayCountPresenter = (props: Props) => {
    const [listData, setListData] = useState(props.mlist);
    const lang = store.language.lang;
    const txtPlayCount =
        lang === "ko" ? txtPlayCountKo : lang === "jp" ? txtPlayCountJp : txtPlayCountEn;

    return (
        <CommonLayout>
            <ContentLayout title={"Play Count"}>
                <PCDesc>
                    <Button
                        style={{ width: "100%" }}
                        onClick={() => scrShot("scrshot", `${props.id}_mybest.jpg`)}
                    >
                        {txtPlayCount.button.scrshot}
                    </Button>
                    {txtPlayCount.desc_1}
                    <span style={{ color: "#ff5555" }}>{txtPlayCount.desc_2}</span>
                    {txtPlayCount.desc_3}
                </PCDesc>
                <PCTitle>
                    <h4>Most Played List</h4>
                    <span>
                        Player:&nbsp;
                        <img
                            alt="titletower"
                            style={{ width: "30px" }}
                            src={`${process.env.PUBLIC_URL}/general-img/title/${props.towerTitle}.png`}
                        />
                        {props.userName}
                    </span>
                </PCTitle>
                <PCBtnWrapper>
                    <Button onClick={() => setListData(props.plist)}>
                        {txtPlayCount.button.pt}
                    </Button>
                    <Button onClick={() => setListData(props.mlist)}>
                        {txtPlayCount.button.music}
                    </Button>
                    <Button onClick={() => setListData(props.glist)}>
                        {txtPlayCount.button.gf}
                    </Button>
                    <Button onClick={() => setListData(props.dlist)}>
                        {txtPlayCount.button.dm}
                    </Button>
                </PCBtnWrapper>
                <PCListWrapper id={"scrshot"}>
                    <CountTable data={listData} />
                </PCListWrapper>
            </ContentLayout>
        </CommonLayout>
    );
};

export default PlayCountPresenter;
