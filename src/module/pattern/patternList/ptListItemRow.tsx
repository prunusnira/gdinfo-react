import React from "react";
import { Link } from "react-router-dom";
import { EachDiff } from "./patternData";
import { GridCell } from "./ptList.style";

interface Props {
    list: Array<EachDiff>;
}

const PTListItemRow = (props: Props) => {
    return (
        <>
            {props.list.map((diff, i) => {
                return (
                    <>
                        <GridCell>{diff.diff}</GridCell>
                        <GridCell>
                            <Link className="innerhref" to={diff.glink}>
                                {diff.glv}
                            </Link>
                        </GridCell>
                        <GridCell>
                            <Link className="innerhref" to={diff.blink}>
                                {diff.blv}
                            </Link>
                        </GridCell>
                        <GridCell>
                            <Link className="innerhref" to={diff.dlink}>
                                {diff.dlv}
                            </Link>
                        </GridCell>
                    </>
                );
            })}
        </>
    );
};

export default PTListItemRow;
