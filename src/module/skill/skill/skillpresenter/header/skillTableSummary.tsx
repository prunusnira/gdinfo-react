import { atomDarkmode } from '@/jotai/darkmode';
import { SkillBody } from '@/module/skill/skill/skillpresenter/skillTableBody.style';
import { ItemCol, ItemRow } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React, { ReactNode } from 'react';

interface Props {
    statLeftTitle: string;
    statLeft: ReactNode;
    statMidTitle: string;
    statMid: ReactNode;
    statRightTitle: string;
    statRight: ReactNode;
}

const SkillTableSummary = ({
                               statLeftTitle,
                               statLeft,
                               statMidTitle,
                               statMid,
                               statRightTitle,
                               statRight,
                           }: Props) => {
    const dark = useAtomValue(atomDarkmode);

    return (
        <SkillBody dark={dark}>
            <ItemRow
                style={{
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    color: 'white',
                }}
                keepDirHor={true}
            >
                <ItemCol
                    size={3}
                    style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    {statLeftTitle}
                    <br />
                    {statLeft}
                </ItemCol>
                <ItemCol
                    size={3}
                    style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    {statMidTitle}
                    <br />
                    {statMid}
                </ItemCol>
                <ItemCol
                    size={3}
                    style={{
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    {statRightTitle}
                    <br />
                    {statRight}
                </ItemCol>
            </ItemRow>
        </SkillBody>
    )
}

export default SkillTableSummary