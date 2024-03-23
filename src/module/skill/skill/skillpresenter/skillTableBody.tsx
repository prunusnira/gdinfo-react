import { IProfile } from '@/data/user/IProfile';
import { ISkillItem } from '@/data/skill/ISkillItem';
import { atomDarkmode } from '@/jotai/darkmode';
import Pager from '@/module/common/pager';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
    SkillBody,
    SkillRow,
    SkillTableOuterSH,
    SkillTableWrapper,
    SkillTableWrapperSH,
} from './skillTableBody.style';
import SkillTableNR from './skillTableNR';
import SkillTableSH from './skillTableSH';

interface Props {
    // share table
    share: boolean;

    // 스킬표 상단 데이터
    updateTime: string;

    visibleLarge: boolean;
    visibleLeft: boolean;
    visibleRight: boolean;
    allpage: number;

    user?: IProfile;
    skillTable1: Array<ISkillItem>;
    skillTable2: Array<ISkillItem>;

    // popup
    openPopup: (mid: number) => void;
}

const SkillTableBody = (props: Props) => {
    const {
        order,
        ptype,
        userid,
        gtype,
        page,
    } = useParams<{order: string, ptype: string, userid: string, gtype: string, page: string}>();

    const dark = useAtomValue(atomDarkmode);

    return (
        <SkillBody $dark={dark}>
            {props.share && props.visibleLarge && (
                <SkillTableWrapperSH>
                    <SkillTableOuterSH>
                        <SkillTableSH
                            list={props.skillTable1}
                            openPopup={props.openPopup}
                        />
                    </SkillTableOuterSH>
                </SkillTableWrapperSH>
            )}
            {props.share && props.visibleLeft && (
                <SkillTableWrapperSH>
                    <SkillRow justifyContent={'center'}>
                        <h4>HOT</h4>
                    </SkillRow>
                    <SkillTableOuterSH>
                        <SkillTableSH
                            list={props.skillTable1}
                            openPopup={props.openPopup}
                        />
                    </SkillTableOuterSH>
                </SkillTableWrapperSH>
            )}
            {props.share && props.visibleRight && (
                <SkillTableWrapperSH>
                    <SkillRow justifyContent={'center'}>
                        <h4>Other</h4>
                    </SkillRow>
                    <SkillTableOuterSH>
                        <SkillTableSH
                            list={props.skillTable2}
                            openPopup={props.openPopup}
                        />
                    </SkillTableOuterSH>
                </SkillTableWrapperSH>
            )}
            {!props.share && props.visibleLarge && (
                <SkillTableWrapper>
                    <SkillTableNR
                        list={props.skillTable1}
                        openPopup={props.openPopup}
                    />
                </SkillTableWrapper>
            )}
            {!props.share && props.visibleLeft && (
                <SkillTableWrapper>
                    <SkillRow justifyContent={'center'}>
                        <h4>HOT</h4>
                    </SkillRow>
                    <SkillTableNR
                        list={props.skillTable1}
                        openPopup={props.openPopup}
                    />
                </SkillTableWrapper>
            )}
            {!props.share && props.visibleRight && (
                <SkillTableWrapper>
                    <SkillRow justifyContent={'center'}>
                        <h4>Other</h4>
                    </SkillRow>
                    <SkillTableNR
                        list={props.skillTable2}
                        openPopup={props.openPopup}
                    />
                </SkillTableWrapper>
            )}
            <div
                id="skillEmpty"
                style={{ width: '100%', textAlign: 'center' }}
            ></div>
            {page && ptype && userid && gtype && (
                <SkillRow>
                    <Pager
                        cpage={parseInt(page, 10)}
                        allpage={props.allpage}
                        baseUrl={`/skill/${ptype}/${userid}/${gtype}/`}
                        afterUrl={`/${order}${window.location.search}`}
                    />
                </SkillRow>
            )}
        </SkillBody>
    );
};

export default SkillTableBody;
