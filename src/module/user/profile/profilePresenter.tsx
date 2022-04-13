import React, { useState } from "react";
import ProfileBoard from "./profileBoard";
import ProfileRecent from "./profileRecent";
import SingleSkillColorChanger from "@/module/common/skillcolor";
import { Button, Icon, ThemedLink } from "@/styled/styledCommon";
import ProfileData from "./profileData";
import ModalInfoOpen from "./modalInfoOpen";
import ModalComment from "./modalComment";
import store from "@/mobx/store";

import txtProfileKo from "@/lang/user/profile/txtProfile-ko";
import txtProfileJp from "@/lang/user/profile/txtProfile-jp";
import txtProfileEn from "@/lang/user/profile/txtProfile-en";
import {
    UISkill,
    UIName,
    UITitle,
    UIComment,
    UISkillMore,
    UISkillTitle,
    UISkillBox,
    UISkillBoxVal,
    UISkillBoxVer,
    UISkillWrapper,
    GraphWrapper,
    ProfileDetailGrid,
    DetailGridVal,
    PlaycountDesc,
    ButtonFlex,
    ProfButton,
    GraphRow,
    GraphType,
    ProfileWrapper,
} from "./profilePresenter.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import { observer } from "mobx-react";

interface Props {
    isInfoOpen: boolean;
    openUserInfo: string;
    updateOpenValue: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    submitOpen: (id: string, open: string) => void;
    setInfoDlgClose: () => void;

    comment: string;
    nextComment: string;
    isCommentOpen: boolean;
    submitComment: () => void;
    closeComment: () => void;
    setNextComment: (s: string) => void;

    isOwnAccount: boolean;
    profileData: ProfileData;
    id: string;

    setCommentDlgOpen: () => void;
    infoUpdate: () => void;
    setInfoDlgOpen: () => void;
}

const ProfilePresenter = observer((props: Props) => {
    const [oldSkill, setOldSkill] = useState(false);
    const lang = store.language.lang;
    const { dark } = store;

    const txtProfile = lang === "ko" ? txtProfileKo : lang === "jp" ? txtProfileJp : txtProfileEn;

    return (
        <CommonLayout>
            <ProfileWrapper>
                <ContentLayout title={txtProfile.profile} isHalf>
                    <UITitle>
                        ({props.profileData.title === "" ? "No Title" : props.profileData.title})
                    </UITitle>
                    <UIName>
                        {props.profileData.titletower !== "" && (
                            <Icon
                                alt="titletower"
                                src={`${process.env.PUBLIC_URL}/general-img/title/${props.profileData.titletower}.png`}
                            />
                        )}

                        {props.profileData.name === "" ? "(No Name)" : props.profileData.name}
                    </UIName>
                    <UIComment>{props.comment}</UIComment>
                    {props.isOwnAccount && (
                        <Button onClick={props.setCommentDlgOpen}>
                            {txtProfile.button.changecomment}
                        </Button>
                    )}
                    <UISkillWrapper show={true}>
                        <UISkill>
                            <UISkillTitle>GF SKILL</UISkillTitle>
                            <UISkillBox>
                                <UISkillBoxVer>HV</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/2/${props.id}/gf/1/skilldesc`}
                                        skill={props.profileData.gskill}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>
                        </UISkill>

                        <UISkill>
                            <UISkillTitle>DM SKILL</UISkillTitle>
                            <UISkillBox>
                                <UISkillBoxVer>HV</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/2/${props.id}/dm/1/skilldesc`}
                                        skill={props.profileData.dskill}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>
                        </UISkill>
                    </UISkillWrapper>

                    <UISkillWrapper show={oldSkill}>
                        <UISkill>
                            <UISkillBox>
                                <UISkillBoxVer>NX</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/12/${props.id}/gf/1/skilldesc`}
                                        skill={props.profileData.gskillnx}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>

                            <UISkillBox>
                                <UISkillBoxVer>EX</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/10/${props.id}/gf/1/skilldesc`}
                                        skill={props.profileData.gskillex}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>

                            <UISkillBox>
                                <UISkillBoxVer>MX</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/8/${props.id}/gf/1/1`}
                                        skill={props.profileData.gskillmx}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>

                            <UISkillBox>
                                <UISkillBoxVer>RE</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/5/${props.id}/gf/1/1`}
                                        skill={props.profileData.gskilltbre}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>

                            <UISkillBox>
                                <UISkillBoxVer>TB</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/6/${props.id}/gf/1/1`}
                                        skill={props.profileData.gskilltb}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>
                        </UISkill>
                        <UISkill>
                            <UISkillBox>
                                <UISkillBoxVer>NX</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/12/${props.id}/dm/1/skilldesc`}
                                        skill={props.profileData.dskillnx}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>

                            <UISkillBox>
                                <UISkillBoxVer>EX</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/10/${props.id}/dm/1/skilldesc`}
                                        skill={props.profileData.dskillex}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>

                            <UISkillBox>
                                <UISkillBoxVer>MX</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/8/${props.id}/dm/1/1`}
                                        skill={props.profileData.dskillmx}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>

                            <UISkillBox>
                                <UISkillBoxVer>RE</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/5/${props.id}/dm/1/1`}
                                        skill={props.profileData.dskilltbre}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>

                            <UISkillBox>
                                <UISkillBoxVer>TB</UISkillBoxVer>
                                <UISkillBoxVal>
                                    <SingleSkillColorChanger
                                        link={`/skill/6/${props.id}/dm/1/1`}
                                        skill={props.profileData.dskilltb}
                                    />
                                </UISkillBoxVal>
                            </UISkillBox>
                        </UISkill>
                    </UISkillWrapper>

                    <UISkillMore onClick={() => setOldSkill(!oldSkill)}>
                        {oldSkill && (
                            <>
                                {txtProfile.oldver.less}&nbsp;
                                <FontAwesomeIcon icon={faAngleDoubleUp} />
                            </>
                        )}
                        {!oldSkill && (
                            <>
                                {txtProfile.oldver.more}&nbsp;
                                <FontAwesomeIcon icon={faAngleDoubleDown} />
                            </>
                        )}
                    </UISkillMore>
                </ContentLayout>

                <ContentLayout title={txtProfile.graph} isHalf>
                    <GraphWrapper>
                        <GraphRow>
                            <GraphType>GF</GraphType>
                            <ProfileRecent type="gf" id={props.id} />
                        </GraphRow>
                        <GraphRow>
                            <GraphType>DM</GraphType>
                            <ProfileRecent type="dm" id={props.id} />
                        </GraphRow>
                    </GraphWrapper>
                </ContentLayout>

                <ContentLayout title={txtProfile.detail} isHalf>
                    <ProfileDetailGrid>
                        <DetailGridVal>#</DetailGridVal>
                        <DetailGridVal>GuitarFreaks</DetailGridVal>
                        <DetailGridVal>DrumMania</DetailGridVal>
                        <DetailGridVal>{txtProfile.detailed.s}</DetailGridVal>
                        <DetailGridVal>{`${props.profileData.gskill.toFixed(2)} (${
                            props.profileData.gskillall
                        })`}</DetailGridVal>
                        <DetailGridVal>{`${props.profileData.dskill.toFixed(2)} (${
                            props.profileData.dskillall
                        })`}</DetailGridVal>
                        <DetailGridVal>{txtProfile.detailed.clv}</DetailGridVal>
                        <DetailGridVal>{`${props.profileData.gclearlv.toFixed(2)} (${
                            props.profileData.gclearnum
                        })`}</DetailGridVal>
                        <DetailGridVal>{`${props.profileData.dclearlv.toFixed(2)} (${
                            props.profileData.dclearnum
                        })`}</DetailGridVal>
                        <DetailGridVal>{txtProfile.detailed.flv}</DetailGridVal>
                        <DetailGridVal>{`${props.profileData.gfclv.toFixed(2)} (${
                            props.profileData.gfcnum
                        })`}</DetailGridVal>
                        <DetailGridVal>{`${props.profileData.dfclv.toFixed(2)} (${
                            props.profileData.dfcnum
                        })`}</DetailGridVal>
                        <DetailGridVal>{txtProfile.detailed.elv}</DetailGridVal>
                        <DetailGridVal>{`${props.profileData.gexclv.toFixed(2)} (${
                            props.profileData.gexcnum
                        })`}</DetailGridVal>
                        <DetailGridVal>{`${props.profileData.dexclv.toFixed(2)} (${
                            props.profileData.dexcnum
                        })`}</DetailGridVal>
                        <DetailGridVal>
                            {txtProfile.detailed.count}
                            <br />
                            {props.openUserInfo === "N" && !props.isOwnAccount ? (
                                <>Closed</>
                            ) : (
                                props.profileData.countgf + props.profileData.countdm
                            )}
                        </DetailGridVal>
                        <DetailGridVal>
                            {props.openUserInfo === "N" && !props.isOwnAccount ? (
                                <>Closed</>
                            ) : (
                                props.profileData.countgf
                            )}
                        </DetailGridVal>
                        <DetailGridVal>
                            {props.openUserInfo === "N" && !props.isOwnAccount ? (
                                <>Closed</>
                            ) : (
                                props.profileData.countdm
                            )}
                        </DetailGridVal>
                    </ProfileDetailGrid>
                    <PlaycountDesc>{txtProfile.detailed.countdesc}</PlaycountDesc>
                </ContentLayout>

                <ContentLayout title={txtProfile.board.title} isHalf>
                    <ProfileBoard id={props.id} />
                </ContentLayout>

                <ContentLayout title={txtProfile.button.title} isHalf>
                    <ButtonFlex>
                        <ThemedLink dark={dark.dark} to={`/mybest/${props.id}`}>
                            <ProfButton>{txtProfile.button.mybest}</ProfButton>
                        </ThemedLink>
                        <ThemedLink dark={dark.dark} to={`/cleartable/${props.id}`}>
                            <ProfButton>{txtProfile.button.clearRankTable}</ProfButton>
                        </ThemedLink>

                        {props.isOwnAccount && (
                            <>
                                <ProfButton onClick={props.infoUpdate}>
                                    {txtProfile.button.countupdate}
                                </ProfButton>
                                <ProfButton onClick={props.setInfoDlgOpen}>
                                    {txtProfile.button.setdataopen}
                                </ProfButton>
                                <ThemedLink dark={dark.dark} to={"/reset"}>
                                    <ProfButton type="submit">{txtProfile.button.reset}</ProfButton>
                                </ThemedLink>
                            </>
                        )}
                    </ButtonFlex>
                </ContentLayout>
            </ProfileWrapper>

            <ModalInfoOpen
                isCountOpen={props.isInfoOpen}
                opencount={props.openUserInfo}
                id={props.id}
                updateOpenValue={props.updateOpenValue}
                submitOpen={props.submitOpen}
                setCountDlgClose={props.setInfoDlgClose}
            />

            <ModalComment
                isCommentOpen={props.isCommentOpen}
                id={props.id}
                submitComment={props.submitComment}
                closeComment={props.closeComment}
                setNextComment={props.setNextComment}
            />
        </CommonLayout>
    );
});

export default ProfilePresenter;
