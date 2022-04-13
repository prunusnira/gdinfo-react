import React from "react";
import SnapshotItem from "./snapshotItem";
import store from "@/mobx/store";

import txtSnapshotKo from "@/lang/user/snapshot/txtSnapshot-ko";
import txtSnapshotJp from "@/lang/user/snapshot/txtSnapshot-jp";
import txtSnapshotEn from "@/lang/user/snapshot/txtSnapshot-en";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import { SnapshotListWrapper } from "./snapshotListPresenter.style";

interface Props {
    id: string;
    glist: Array<string>;
    dlist: Array<string>;
}

const SnapshotListPresenter = (props: Props) => {
    const lang = store.language.lang;
    const txtSnapshot =
        lang === "ko" ? txtSnapshotKo : lang === "jp" ? txtSnapshotJp : txtSnapshotEn;

    return (
        <CommonLayout>
            <ContentLayout title={"Snapshot List"}>
                <p>
                    {txtSnapshot.desc1}
                    <br />
                    <b style={{ color: "coral" }}>{txtSnapshot.desc2}</b>
                    <br />
                    {txtSnapshot.desc3}
                </p>
                <ContentLayout title={"GuitarFreaks"}>
                    <SnapshotListWrapper>
                        {(function () {
                            if (props.glist.length === 0) {
                                return <h3>LIST IS EMPTY</h3>;
                            } else {
                                return <SnapshotItem id={props.id} date={props.glist} gtype="gf" />;
                            }
                        })()}
                    </SnapshotListWrapper>
                </ContentLayout>
                <ContentLayout title={"DrumMania"}>
                    <SnapshotListWrapper>
                        {(function () {
                            if (props.dlist.length === 0) {
                                return <h3>LIST IS EMPTY</h3>;
                            } else {
                                return <SnapshotItem id={props.id} date={props.dlist} gtype="dm" />;
                            }
                        })()}
                    </SnapshotListWrapper>
                </ContentLayout>
            </ContentLayout>
        </CommonLayout>
    );
};

export default SnapshotListPresenter;
