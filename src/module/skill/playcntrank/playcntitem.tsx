import { IPlayCountRank } from '@/data/IPlayCountRank';
import { atomDarkmode } from '@/jotai/darkmode';
import { ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { PCRICnt, PCRIIcon, PCRINum, PCRIUser, PCRIWrapper } from './playcntItem.style';

interface Props {
    list: Array<IPlayCountRank>;
}

const PlayCntRankItem = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);

    return (
        <>
            {props.list.map((v, i) => (
                <PCRIWrapper
                    $dark={dark}
                    key={`playcountItem${i}`}>
                    <PCRINum>{v.index}</PCRINum>
                    <PCRIUser>
                        {v.towertitle !== '' && (
                            <PCRIIcon
                                alt="titletower"
                                src={`${process.env.PUBLIC_URL}/general-img/title/${v.towertitle}.png`}
                            />
                        )}
                        <ThemedLink
                            $dark={dark}
                            to={v.prlink}>
                            {v.name}
                        </ThemedLink>
                    </PCRIUser>
                    <PCRICnt>G {v.gfcnt}</PCRICnt>
                    <PCRICnt>+</PCRICnt>
                    <PCRICnt>D {v.dmcnt}</PCRICnt>
                    <PCRICnt>=</PCRICnt>
                    <PCRICnt>{v.allcnt}</PCRICnt>
                </PCRIWrapper>
            ))}
        </>
    );
};

export default PlayCntRankItem;
