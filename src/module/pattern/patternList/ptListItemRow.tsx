import store from "@/mobx/store";
import { ThemedLink } from "@/styled/styledCommon";
import { observer } from "mobx-react";
import React from "react";
import { EachDiff } from "./patternData";
import { GridCell } from "./ptList.style";

interface Props {
    list: Array<EachDiff>;
}

const PTListItemRow = observer((props: Props) => {
    const { dark } = store;
    return (
        <>
            {props.list.map((diff, i) => {
                return (
                    <>
                        <GridCell>{diff.diff}</GridCell>
                        <GridCell>
                            <ThemedLink dark={dark.dark} className="innerhref" to={diff.glink}>
                                {diff.glv}
                            </ThemedLink>
                        </GridCell>
                        <GridCell>
                            <ThemedLink dark={dark.dark} className="innerhref" to={diff.blink}>
                                {diff.blv}
                            </ThemedLink>
                        </GridCell>
                        <GridCell>
                            <ThemedLink dark={dark.dark} className="innerhref" to={diff.dlink}>
                                {diff.dlv}
                            </ThemedLink>
                        </GridCell>
                    </>
                );
            })}
        </>
    );
});

export default PTListItemRow;
