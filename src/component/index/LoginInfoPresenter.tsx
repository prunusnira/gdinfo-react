import { Link } from "react-router-dom";
import store from "@/mobx/store";

import txtIndexKo from "@/lang/index/txtIndex-ko";
import txtIndexJp from "@/lang/index/txtIndex-jp";
import txtIndexEn from "@/lang/index/txtIndex-en";
import React from "react";
import ProfileData from "../user/profile/profileData";
import { LIWrapper, LIRow, LIIcon, LIName, LIType, LIVal } from "./logininfoPresaenter.style";

type LoginInfoProps = {
    loading: boolean;
    data: ProfileData;
};

const LoginInfoPresenter = (props: LoginInfoProps) => {
    const { language } = store;
    const lang = language.lang;

    const txtIndex = lang === "ko" ? txtIndexKo : lang === "jp" ? txtIndexJp : txtIndexEn;

    if (props.loading) {
        const imgurl = `${process.env.PUBLIC_URL}/general-img/title/${props.data.titletower}.png`;
        return (
            <LIWrapper>
                <LIRow>({props.data.title})</LIRow>

                <LIRow>
                    {props.data.titletower !== "" && (
                        <LIIcon alt="titletower" className="towertitle35" src={imgurl} />
                    )}
                    <LIName>{props.data.name}</LIName>
                </LIRow>
                <LIRow>
                    <LIType>
                        <b>GF</b>
                    </LIType>
                    <LIVal>
                        <Link style={{ color: "white" }} to={`/skill/2/${props.data.id}/gf/1/1`}>
                            {props.data.gskill}
                        </Link>
                    </LIVal>
                    <LIType>
                        <b>DM</b>
                    </LIType>
                    <LIVal>
                        <Link style={{ color: "white" }} to={`/skill/2/${props.data.id}/dm/1/1`}>
                            {props.data.dskill}
                        </Link>
                    </LIVal>
                </LIRow>
            </LIWrapper>
        );
    } else {
        return (
            <LIWrapper>
                <Link to="/login">{txtIndex.self.login}</Link>
                {txtIndex.self.loginFirst}
            </LIWrapper>
        );
    }
};

export default LoginInfoPresenter;
