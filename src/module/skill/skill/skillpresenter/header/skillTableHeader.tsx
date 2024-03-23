import { IProfile } from '@/data/user/IProfile';
import { atomDarkmode } from '@/jotai/darkmode';
import { skillPageVersion } from '@/module/common/version';
import { SkillHeader, SkillRow } from '@/module/skill/skill/skillpresenter/skillTableBody.style';
import { ItemCol, ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {
    updateTime: string;
    tableTxtGType: string;
    tableTxtDesc: string;
    user?: IProfile;
}

const SkillTableHeader = ({
                              updateTime,
                              tableTxtGType,
                              tableTxtDesc,
                              user,
                          }: Props) => {
    const dark = useAtomValue(atomDarkmode);
    const {
        order,
        ptype,
        userid,
        gtype,
        page,
    } = useParams<{ order: string, ptype: string, userid: string, gtype: string, page: string }>();

    return (
        <SkillHeader id="targetInfo">
            {ptype && (
                <SkillRow justifyContent={'center'}>
                    <h4>
                        <b>
                            GITADORA{' '}
                            {skillPageVersion(ptype)}
                            <br />
                            {tableTxtGType} {tableTxtDesc}
                            &nbsp;
                            {ptype !== '1000' && user ? (
                                <ThemedLink
                                    dark={dark}
                                    className="innerhref"
                                    to={`/profile/${userid}`}
                                >
                                    {user.name}
                                </ThemedLink>
                            ) : (
                                ''
                            )}
                        </b>
                    </h4>
                </SkillRow>
            )}
            <SkillRow>
                <ItemCol size={ptype !== '1000' ? 5: 10} style={{ textAlign: 'center' }}>
                    <b>sin.nira.one</b>
                </ItemCol>
                {ptype !== '1000' ?
                    <ItemCol size={5} style={{ textAlign: 'center' }}>
                        Last update: {updateTime}
                    </ItemCol>
                    :
                    <></>
                }
            </SkillRow>
        </SkillHeader>
    );
};

export default SkillTableHeader;