import React from "react";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import { Button, ThemedLink } from "@/styled/styledCommon";

interface Props {
    date: Array<string>;
    id: string;
    gtype: string;
}

const SnapshotItem = observer((props: Props) => {
    const { dark } = store;

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
