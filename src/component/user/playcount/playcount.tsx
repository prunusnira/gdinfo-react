import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import PlayCountPresenter from "./playcountPresenter";
import useUserData from "@/component/common/useUserData";
import usePlayCount from "./usePlayCount";

interface MatchProps {
    id: string;
}

const PlayCount = observer(() => {
    const { id } = useParams<MatchProps>();
    const [userName, profileLink, titleTower] = useUserData(id);
    const { plist, glist, dlist, mlist } = usePlayCount(id);

    return (
        <PlayCountPresenter
            userName={userName}
            id={id}
            towerTitle={titleTower}
            plist={plist}
            glist={glist}
            dlist={dlist}
            mlist={mlist}
        />
    );
});

export default PlayCount;
