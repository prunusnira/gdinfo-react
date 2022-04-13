import React from "react";
import { useParams } from "react-router-dom";
import ClearTablePresenter from "./clearTablePresenter";
import useClearTable from "./useClearTable";
import useUserData from "@/module/common/useUserData";

interface MatchProps {
    userid: string;
}

const ClearTable = () => {
    const { userid } = useParams<MatchProps>();
    const glist = useClearTable(userid, "gf");
    const dlist = useClearTable(userid, "dm");
    const { userName, profileLink, titleTower } = useUserData(userid);

    return (
        <ClearTablePresenter
            profileLink={profileLink}
            titleTower={titleTower}
            userName={userName}
            glist={glist}
            dlist={dlist}
        />
    );
};

export default ClearTable;
