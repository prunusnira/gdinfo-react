import React from 'react'
import {Link} from 'react-router-dom';
import ProfileButton from './profileButton';
import ProfileBoard from './profileBoard';
import ProfileRecent from './profileRecent';
import SingleSkillColorChanger from '../../common/skillcolor';
import { BodyContent, BodyHeader, Button, Container, Icon, ItemCol, ItemRow } from '../../../styled/styledCommon';
import ProfileData from './profileData';
import ModalInfoOpen from './modalInfoOpen';
import ModalComment from './modalComment';

import txtProfileKo from '../../../lang/user/profile/txtProfile-ko'
import txtProfileJp from '../../../lang/user/profile/txtProfile-jp'
import txtProfileEn from '../../../lang/user/profile/txtProfile-en'

interface Props {
    lang: string,
    comment: string,

    isCountOpen: boolean,
    openUserInfo: string,
    updateOpenValue: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void,
    submitOpen: (id: string, open: string) => void,
    setCountDlgClose: () => void,

    isCommentOpen: boolean,
    commentInput: React.RefObject<HTMLInputElement>,
    submitComment: (id: string, comment: string) => void,
    closeComment: () => void,

    isOwnAccount: boolean,
    profileData: ProfileData,
    id: string,

    setCommentDlgOpen: () => void,
    countUpdate: () => void,
    setCountDlgOpen: () => void,
}

const ProfilePresenter = (props: Props) => {
    const txtProfile =
        props.lang === 'ko' ? txtProfileKo :
            props.lang === 'jp' ? txtProfileJp : txtProfileEn

    return (
        <>  
            <Container>
                <ItemRow setVertical={true}>
                    <BodyHeader>
                        <h3>{txtProfile.profile}</h3>
                    </BodyHeader>
                    <BodyContent
                        className="text-center"
                        id="profilescr">
                        <ItemRow>
                            <ItemCol size={7} isFlatUnderLg={true}>
                                <ItemRow>
                                    <ItemCol size={3}>
                                        {txtProfile.table1.prof}<br/>
                                    </ItemCol>
                                    <ItemCol size={7}>
                                        <ItemRow>
                                            ({(props.profileData.title === "") ? "No Title" : props.profileData.title})
                                        </ItemRow>
                                        <ItemRow>
                                            <span id="usertowertitle">
                                                {
                                                    (function() {
                                                        if(props.profileData.titletower !== "") {
                                                            return (<Icon alt="titletower" src={`${process.env.PUBLIC_URL}/general-img/title/${props.profileData.titletower}.png`} />)
                                                        }
                                                    })()
                                                }
                                            </span>
                                            <span className="title">{(props.profileData.name === "") ? "(No Name)" : props.profileData.name}</span>
                                        </ItemRow>
                                    </ItemCol>
                                </ItemRow>
                                <ItemRow>
                                    <ItemCol size={3}>
                                        {txtProfile.table1.comment}<br/>
                                        {
                                            (function() {
                                                if(props.isOwnAccount) {
                                                    return (
                                                        <Button onClick={props.setCommentDlgOpen}>
                                                            {txtProfile.button.changecomment}
                                                        </Button>
                                                    )
                                                }
                                            })()
                                        }
                                    </ItemCol>
                                    <ItemCol size={7} className="text-left">
                                        {props.comment}
                                    </ItemCol>
                                </ItemRow>
                                <hr className="col-12"/>
                                <ItemRow style={{justifyContent: 'center'}}>
                                    {txtProfile.click}
                                </ItemRow>
                                <ItemRow keepDirHor={true}>
                                    <ItemCol size={5} isFlatUnderLg={false} className="text-center">GF</ItemCol>
                                    <ItemCol size={5} isFlatUnderLg={false} className="text-center">DM</ItemCol>
                                </ItemRow>
                                <ItemRow keepDirHor={true}>
                                    <ItemCol size={5} className="text-center">
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">HV</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/2/${props.id}/gf/1/skilldesc`}
                                                    skill={props.profileData.gskill} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">NX</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/12/${props.id}/gf/1/skilldesc`}
                                                    skill={props.profileData.gskillnx} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">EX</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/10/${props.id}/gf/1/skilldesc`}
                                                    skill={props.profileData.gskillex} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">MX</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/8/${props.id}/gf/1/1`}
                                                    skill={props.profileData.gskillmx} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">RE</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/5/${props.id}/gf/1/1`}
                                                    skill={props.profileData.gskilltbre} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">TB</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/6/${props.id}/gf/1/1`}
                                                    skill={props.profileData.gskilltb} />
                                            </ItemCol>
                                        </ItemRow>
                                    </ItemCol>
                                    <ItemCol size={5} className="text-center">
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">HV</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/2/${props.id}/dm/1/skilldesc`}
                                                    skill={props.profileData.dskill} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">NX</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/12/${props.id}/dm/1/skilldesc`}
                                                    skill={props.profileData.dskillnx} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">EX</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/10/${props.id}/dm/1/skilldesc`}
                                                    skill={props.profileData.dskillex} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">MX</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/8/${props.id}/dm/1/1`}
                                                    skill={props.profileData.dskillmx} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">RE</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/5/${props.id}/dm/1/1`}
                                                    skill={props.profileData.dskilltbre} />
                                            </ItemCol>
                                        </ItemRow>
                                        <ItemRow keepDirHor={true}>
                                            <ItemCol size={3} className="text-right">TB</ItemCol>
                                            <ItemCol size={7} className="text-center">
                                                <SingleSkillColorChanger
                                                    link={`/skill/6/${props.id}/dm/1/1`}
                                                    skill={props.profileData.dskilltb} />
                                            </ItemCol>
                                        </ItemRow>
                                    </ItemCol>
                                </ItemRow>
                                <ItemRow keepDirHor={true}>
                                    <ItemCol size={5} className="text-center">
                                        <ProfileRecent type="gf" id={props.id} />
                                    </ItemCol>
                                    <ItemCol size={5} className="text-center">
                                        <ProfileRecent type="dm" id={props.id} />
                                    </ItemCol>
                                </ItemRow>
                            </ItemCol>
                            <ItemCol size={3} className="d-none d-md-block">
                                <ProfileBoard
                                    id={props.id}
                                    visibleLg={true} />
                            </ItemCol>
                        </ItemRow>
                    </BodyContent>
                </ItemRow>

                <ItemRow className="text-center" id="btnGroups">
                    <ProfileButton isOwnAccount={props.isOwnAccount} id={props.id} />
                </ItemRow>
                
                <ItemRow id="targetTable" setVertical={true}>
                    <BodyHeader>
                        <h3>{txtProfile.detail}</h3>
                    </BodyHeader>
                    <BodyContent>
                        <ItemRow>
                            <ItemCol size={7}>
                                <table className="table prof-table text-center" style={{width:100+'%'}}>
                                    <tr>
                                        <th>#</th>
                                        <th>GuitarFreaks</th>
                                        <th>DrumMania</th>
                                    </tr>
                                    <tr>
                                        <th>{txtProfile.detailed.s}</th>
                                        <td id="tableGskill">{`${props.profileData.gskill.toFixed(2)} (${props.profileData.gskillall})`}</td>
                                        <td id="tableDskill">{`${props.profileData.dskill.toFixed(2)} (${props.profileData.dskillall})`}</td>
                                    </tr>
                                    <tr>
                                        <th>{txtProfile.detailed.clv}</th>
                                        <td id="tableGclear">{`${props.profileData.gclearlv.toFixed(2)} (${props.profileData.gclearnum})`}</td>
                                        <td id="tableDclear">{`${props.profileData.dclearlv.toFixed(2)} (${props.profileData.dclearnum})`}</td>
                                    </tr>
                                    <tr>
                                        <th>{txtProfile.detailed.flv}</th>
                                        <td id="tableGfc">{`${props.profileData.gfclv.toFixed(2)} (${props.profileData.gfcnum})`}</td>
                                        <td id="tableDfc">{`${props.profileData.dfclv.toFixed(2)} (${props.profileData.dfcnum})`}</td>
                                    </tr>
                                    <tr>
                                        <th>{txtProfile.detailed.elv}</th>
                                        <td id="tableGexc">{`${props.profileData.gexclv.toFixed(2)} (${props.profileData.gexcnum})`}</td>
                                        <td id="tableDexc">{`${props.profileData.dexclv.toFixed(2)} (${props.profileData.dexcnum})`}</td>
                                    </tr>
                                    {
                                        (function() {
                                            if(props.openUserInfo === "N" && !props.isOwnAccount) {
                                                return (
                                                    <tr>
                                                        <th id="tableAcnt">{txtProfile.detailed.count}<br/>Closed</th>
                                                        <td id="tableGcnt">Closed</td>
                                                        <td id="tableDcnt">Closed</td>
                                                    </tr>
                                                )
                                            }
                                            else {
                                                return (
                                                    <tr>
                                                        <th id="tableAcnt">
                                                            {txtProfile.detailed.count}<br/>
                                                            {props.profileData.countgf + props.profileData.countdm}
                                                        </th>
                                                        <td id="tableGcnt">{props.profileData.countgf}</td>
                                                        <td id="tableDcnt">{props.profileData.countdm}</td>
                                                    </tr>
                                                )
                                            }
                                        })()
                                    }
                                    
                                </table>
                                <ItemRow id="countupdate">
                                    {
                                        (function() {
                                            if(props.isOwnAccount) {
                                                return (
                                                    <>
                                                        <Button onClick={props.countUpdate}>
                                                            {txtProfile.button.countupdate}
                                                        </Button>
                                                        <Button onClick={props.setCountDlgOpen}>
                                                            {txtProfile.button.setdataopen}
                                                        </Button>
                                                    </>
                                                )
                                            }
                                        })()
                                    }
                                </ItemRow>
                                <span className="prof-table" dangerouslySetInnerHTML={{
                                    __html: txtProfile.detailed.countdesc
                                }}>
                                </span><br/>
                                <ItemRow id="reset">
                                    {
                                        (function() {
                                            if(props.isOwnAccount) {
                                                return (
                                                    <Link to={"/reset"}>
                                                        <Button type="submit">
                                                            {txtProfile.button.reset}
                                                        </Button>
                                                    </Link>
                                                )
                                            }
                                        })()
                                    }
                                </ItemRow>
                            </ItemCol>
                            {/* 작은 화면에서만 보임 */}
                            <ItemCol size={3}>
                                <ProfileBoard
                                    id={props.id}
                                    visibleLg={false} />
                            </ItemCol>
                        </ItemRow>
                    </BodyContent>
                </ItemRow>
            </Container>

            <ModalInfoOpen
                lang={props.lang}
                isCountOpen={props.isCountOpen}
                opencount={props.openUserInfo}
                id={props.id}
                updateOpenValue={props.updateOpenValue}
                submitOpen={props.submitOpen}
                setCountDlgClose={props.setCountDlgClose} />
            
            <ModalComment
                lang={props.lang}
                isCommentOpen={props.isCommentOpen}
                commentInput={props.commentInput}
                id={props.id}
                submitComment={props.submitComment}
                closeComment={props.closeComment} />
        </>
    )
}

export default ProfilePresenter