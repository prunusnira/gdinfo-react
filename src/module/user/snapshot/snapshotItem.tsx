import { atomDarkmode } from '@/jotai/darkmode';
import { Button, ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';

interface Props {
    date: Array<string>;
    id: string;
    gtype: string;
}

const SnapshotItem = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);

    return (
        <>
            {props.date.map((d) => (
                <ThemedLink
                    dark={dark}
                    to={`/skill/snapshot/view/nr/${props.id}/${d}/${props.gtype}`}
                >
                    <Button>{d}</Button>
                </ThemedLink>
            ))}
        </>
    );
};

export default SnapshotItem;
