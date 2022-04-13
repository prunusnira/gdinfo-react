import React from "react";
import SingleSkillColorChanger from "@/module/common/skillcolor";

import RecentData from "./recentData";
import { observer } from "mobx-react";
import store from "@/mobx/store";

import txtProfileKo from "@/lang/user/profile/txtProfile-ko";
import txtProfileJp from "@/lang/user/profile/txtProfile-jp";
import txtProfileEn from "@/lang/user/profile/txtProfile-en";
import TxtCommonKo from "@/lang/common/txtCommon-ko";
import TxtCommonJp from "@/lang/common/txtCommon-jp";
import TxtCommonEn from "@/lang/common/txtCommon-en";
import {
    RecentUserRow,
    RecentSkillRow,
    UpdateTime,
    UserName,
    UserNameCol,
    UserSkillCol,
    EmptyUser,
    RecentSkillCol,
    RecentSkillType,
} from "./recentTableDiv.style";
import { ThemedLink } from "@/styled/styledCommon";

interface Props {
    isMain: boolean;
    list: Array<RecentData>;
}

const RecentTableDiv = observer((props: Props) => {
    const lang = store.language.lang;
    const { dark } = store;

    const txtProfile = lang === "ko" ? txtProfileKo : lang === "jp" ? txtProfileJp : txtProfileEn;

    const TxtCommon = lang === "ko" ? TxtCommonKo : lang === "jp" ? TxtCommonJp : TxtCommonEn;

    const mapdata = props.list.map((user, i) => {
        const date = new Date().getTime() - user.uptimelong;
        const hour = date / 60000 / 60;
        const min = (date / 60000) % 60;

        return (
            <RecentUserRow key={"recent" + i}>
                <UserNameCol>
                    <UserName>
                        {user.titletower !== "" && (
                            <img
                                alt="titletower"
                                className="towertitle35"
                                style={{ marginRight: "5px" }}
                                src={`${process.env.PUBLIC_URL}/general-img/title/${user.titletower}.png`}
                            />
                        )}
                        {user.opencount === "Y" ? (
                            <ThemedLink dark={dark.dark} to={"/profile/" + user.id}>
                                {user.name !== "" ? `${user.name}` : `(NO NAME)`}
                            </ThemedLink>
                        ) : (
                            <EmptyUser dark={dark.dark}>{txtProfile.table1.emptyname}</EmptyUser>
                        )}
                    </UserName>
                    <UpdateTime>
                        {`${Math.floor(hour)}${TxtCommon.other.hrs} ${Math.floor(min)}${
                            TxtCommon.other.mins
                        }`}
                    </UpdateTime>
                </UserNameCol>
                <UserSkillCol>
                    <RecentSkillRow>
                        <RecentSkillType>GF</RecentSkillType>
                        <RecentSkillCol>
                            <SingleSkillColorChanger
                                skill={user.gskill}
                                link={
                                    user.opencount === "Y" ? `/skill/2/${user.id}/gf/1/1` : "#none"
                                }
                            />
                        </RecentSkillCol>
                    </RecentSkillRow>
                    <RecentSkillRow>
                        <RecentSkillType>DM</RecentSkillType>
                        <RecentSkillCol>
                            <SingleSkillColorChanger
                                skill={user.dskill}
                                link={
                                    user.opencount === "Y" ? `/skill/2/${user.id}/dm/1/1` : "#none"
                                }
                            />
                        </RecentSkillCol>
                    </RecentSkillRow>
                </UserSkillCol>
            </RecentUserRow>
        );
    });

    return <>{mapdata}</>;
});

export default RecentTableDiv;
