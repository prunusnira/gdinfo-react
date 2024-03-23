import { IPlayCount } from '@/data/IPlayCount';
import { atomLanguage } from '@/jotai/language';
import txtPlayCountEn from '@/lang/user/playcount/txtPlayCount-en';
import txtPlayCountJp from '@/lang/user/playcount/txtPlayCount-jp';
import txtPlayCountKo from '@/lang/user/playcount/txtPlayCount-ko';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { CountJacket, CountMusic, CountPattern, CountPlay, CountWrapper } from './countTable.style';

interface Props {
    data: Array<IPlayCount>;
}

const CountTable = (props: Props) => {
    const lang = useAtomValue(atomLanguage);

    const txtPlayCount =
        lang === 'ko' ? txtPlayCountKo : lang === 'jp' ? txtPlayCountJp : txtPlayCountEn;

    return (
        <>
            {props.data.map((d, i) => (
                <CountWrapper key={`count${i}`}>
                    <CountJacket
                        alt="jacket-img"
                        src={d.jacket}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                                `${process.env.PUBLIC_URL}/general-img/empty.jpg`;
                        }}
                    />
                    {d.pattern !== '' && <CountPattern alt="pattern-type" src={d.pattern} />}
                    <CountMusic>
                        {d.number}. {d.name}
                    </CountMusic>
                    <CountPlay>
                        {d.count} {txtPlayCount.table.time}
                    </CountPlay>
                </CountWrapper>
            ))}
        </>
    );
};

export default CountTable;
