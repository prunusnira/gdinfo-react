import React from "react";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import { Button, ThemedLink } from "@/styled/styledCommon";

import txtSnapshotKo from "@/lang/user/snapshot/txtSnapshot-ko";
import txtSnapshotJp from "@/lang/user/snapshot/txtSnapshot-jp";
import txtSnapshotEn from "@/lang/user/snapshot/txtSnapshot-en";

interface Props {
    date: Array<string>;
    id: string;
    gtype: string;
}

const SnapshotItem = observer((props: Props) => {
    const lang = store.language.lang;
    const { dark } = store;

    const txtSnapshot =
        lang === "ko" ? txtSnapshotKo : lang === "jp" ? txtSnapshotJp : txtSnapshotEn;

    return (
        <>
            {props.date.map((d) => {
                return (
                    <ThemedLink
                        dark={dark.dark}
                        to={`/skill/snapshot/view/nr/${props.id}/${d}/${props.gtype}`}
                    >
                        <Button>{d}</Button>
                    </ThemedLink>
                );
            })}
        </>
    );
});

export default SnapshotItem;
