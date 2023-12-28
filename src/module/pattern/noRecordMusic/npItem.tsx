import { INoRecord } from '@/data/INoRecord';
import { atomDarkmode } from '@/jotai/darkmode';
import CommonData from '@/module/common/commonData';
import { Anchor } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { NPItemImg, NPItemLeft, NPItemPattern, NPItemRow } from './npItem.style';

interface Props {
    list: Array<INoRecord>;
}

const NpItem = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <>
            {props.list.map((np, i) => (
                <NPItemRow key={`npitem${i}`}>
                    <NPItemLeft>
                        <NPItemImg
                            src={np.imgsrc}
                            onError={(e) => {
                                e.currentTarget.src = `${CommonData.jacketUrl}empty.jpg`;
                            }}
                        />
                        <img alt="pattern" style={{ width: '60px' }} src={np.pattern} />
                    </NPItemLeft>
                    <NPItemPattern>
                        <Anchor dark={dark} className="innerhref" href={np.link}>
                            {np.name}
                        </Anchor>
                        <span>
                                {np.lv} / {np.ver}
                            </span>
                    </NPItemPattern>
                </NPItemRow>
            ))}
        </>
    );
};

export default NpItem;
