import { IEachDiff } from '@/data/pattern/IEachDiff';
import { atomDarkmode } from '@/jotai/darkmode';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React, { Fragment } from 'react';
import { GridCell } from './ptList.style';

interface Props {
    list: Array<IEachDiff>;
}

const PTListItemRow = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <>
            {props.list.map((diff, i) => (
                <Fragment key={`ptitem${i}`}>
                    <GridCell>{diff.diff}</GridCell>
                    <GridCell>
                        <ThemedLink
                            $dark={dark}
                            className="innerhref"
                            to={diff.glink}>
                            {diff.glv}
                        </ThemedLink>
                    </GridCell>
                    <GridCell>
                        <ThemedLink
                            $dark={dark}
                            className="innerhref"
                            to={diff.blink}>
                            {diff.blv}
                        </ThemedLink>
                    </GridCell>
                    <GridCell>
                        <ThemedLink
                            $dark={dark}
                            className="innerhref"
                            to={diff.dlink}>
                            {diff.dlv}
                        </ThemedLink>
                    </GridCell>
                </Fragment>
            ))}
        </>
    );
};

export default PTListItemRow;
