import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import ProfileButton from './profileButton';
import axios from 'axios';
import txtProfile from './txtprofile';
import ProfileRecent from './profileRecent';
import SingleSkillColorChanger from '../../Common/skillcolor';
import './profile.css';
import '../../../css/overall-b.css';

import CommonData from '../../Common/commonData';
import ProfileData from './profileData';
import ProfileBoard from './profileBoard';
import store from '../../../../../mobx/store';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Button, Container, Icon, ItemCol, ItemRow } from '../../../../../styled/styledCommon';

interface MatchProps {
    id: string
}

const Profile = observer(() => {
    const [profileData, setProfileData] = useState(new ProfileData())
    const [isOwnAccount, setOwnAccount] = useState(false)
    const [isCommentOpen, setCommentOpen] = useState('none')
    const [isCountOpen, setCountOpen] = useState('none')
    const [commitComment, setCommitComment] = useState(false)
    const [commitCount, setCommitCount] = useState(false)
    const [comment, setComment] = useState('')
    const [opencount, setOpencount] = useState('N')

    const {language, loginStatus, loginUser} = store
    const lang = language.lang

    const {id} = useParams<MatchProps>()

    const commentInput = useRef<HTMLInputElement>(null)

    // function for count
    const setCountDlgOpen = () => {
        setCountOpen('block')
	}
	
	const setCountDlgClose = () => {
        setCountOpen('none')
	}
	
	const submitOpen = (id: string, open: string) => {
        axios.get(`${CommonData.dataUrl}setopencount`, {
            params: {
                open: open,
                id: parseInt(id)
            }
        })
        .then((res) => {
            setCountDlgClose();
        });
    }

    const updateOpenValue = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setOpencount(e.currentTarget.value)
    }
	
	// Functions for comment
	const setCommentDlgOpen = () => {
        setCommentOpen('block')
	}
	
	const closeComment = () => {
        setCommentOpen('none')
	}
	
	const submitComment = (id: string, comment: string) => {
        axios.get(`${CommonData.dataUrl}setcomment`, {
            params: {
                val: comment,
                id: id
            }
        })
        .then((res) => {
            closeComment()
            setComment(comment)
        });
    }
    
    const countUpdate = () => {
		axios.post(`${CommonData.dataUrl}profile/countupdate/${loginUser.user.id}`)
        .then((data) => {
            window.location.reload();
        });
    }

    useEffect(() => {
        if(parseInt(loginUser.user.id) === parseInt(id)) {
            setOwnAccount(true)
        }

        axios.post(`${CommonData.dataUrl}getuserid/${id}`)
        .then((res) => {
            const json = JSON.parse(res.data.mydata);
            setProfileData(json)
            setComment(json.comment)
            setOpencount(json.opencount)
        });
    }, [])

    if(profileData == null) {
        // show loading
        return null;
    }
    else {
        const userinfo = profileData;
        const selfUser = isOwnAccount;
        // upper table
        const title = (userinfo.title === "") ? "No Title" : userinfo.title;
        const name = (userinfo.name === "") ? "(No Name)" : userinfo.name;
        const towertitle = userinfo.titletower;
        const gskill = userinfo.gskill;
        const gskillnx = userinfo.gskillnx;
        const gskillex = userinfo.gskillex;
        const gskillmx = userinfo.gskillmx;
        const gskilltbre = userinfo.gskilltbre;
        const gskilltb = userinfo.gskilltb;
        const dskill = userinfo.dskill;
        const dskillnx = userinfo.dskillnx;
        const dskillex = userinfo.dskillex;
        const dskillmx = userinfo.dskillmx;
        const dskilltbre = userinfo.dskilltbre;
        const dskilltb = userinfo.dskilltb;

        // lower table
        const tdGskill = gskill + " (" + userinfo.gskillall + ")";
        const tdDskill = dskill + " (" + userinfo.dskillall + ")";
        const tdGclear = userinfo.gclearlv+" ("+userinfo.gclearnum+")";
        const tdDclear = userinfo.dclearlv+" ("+userinfo.dclearnum+")";
        const tdGfc = userinfo.gfclv+" ("+userinfo.gfcnum+")";
        const tdDfc = userinfo.dfclv+" ("+userinfo.dfcnum+")";
        const tdGexc = userinfo.gexclv+" ("+userinfo.gexcnum+")";
        const tdDexc = userinfo.dexclv+" ("+userinfo.dexcnum+")";
        const thTotalCnt = userinfo.countgf + userinfo.countdm;
        const tdGcnt = userinfo.countgf;
        const tdDcnt = userinfo.countdm;

        return (
            <>
                <div id="opencount" className="crawler"
                    style={{display: isCountOpen}}>
                    <div>
                        <br/><br/><br/><br/>
                        <h3 style={{color: "black"}}>
                            {(txtProfile.button.setdataopen as any)[lang]}
                        </h3>
                        <div className='div-table'>
                            <div className='div-table-row'>
                                <div className='div-table-cell'>
                                    <label id="opencntLabelYes" style={{color:"black"}}>
                                        {(function() {
                                            if(opencount === "Y") {
                                                return <input type='radio' name='opencount' value='Y' checked />
                                            }
                                            else {
                                                return <input type='radio' name='opencount' value='Y'
                                                    onClick={updateOpenValue} />
                                            }
                                        })()}
                                        {(txtProfile.dataopen.yes as any)[lang]}
                                    </label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label id="opencntLabelNo" style={{color:"black"}}>
                                        {(function() {
                                            if(opencount === "N") {
                                                return <input type='radio' name='opencount' value='N' checked />
                                            }
                                            else {
                                                return <input type='radio' name='opencount' value='N'
                                                    onClick={updateOpenValue} />
                                            }
                                        })()}
                                        {(txtProfile.dataopen.no as any)[lang]}
                                    </label>
                                </div>
                            </div>
                            <div className='div-table-row'>
                                <div className='div-table-cell'>
                                    <Button onClick={() => submitOpen(id, opencount)}>Apply</Button>
                                    <Button onClick={setCountDlgClose}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="commentset" className="crawler" style={{display: isCommentOpen}}>
                    <div>
                        <br/><br/><br/><br/>
                        <h3 style={{color:"black"}}>
                            {(txtProfile.button.changecomment as any)[lang]}
                        </h3>
                        <div className="div-table">
                            <div className="div-table-row">
                                <div className="div-table-cell">
                                    <label style={{color:'black'}} htmlFor="newcomment">
                                        {(txtProfile.changecomment.desc as any)[lang]}<br/>
                                    </label>
                                    <input ref={commentInput}
                                        className="form-control" type="text"
                                        name="newcomment" id="commentInput" />
                                </div>
                            </div>
                            <div className="div-table-row">
                                <div className="div-table-cell">
                                    <Button onClick={() => submitComment(id, commentInput.current!.value)}>Apply</Button>
                                    <Button onClick={closeComment}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Container>
                    <ItemRow setVertical={true}>
                        <BodyHeader>
                            <h3>{(txtProfile.profile as any)[lang]}</h3>
                        </BodyHeader>
                        <BodyContent
                            className="text-center"
                            id="profilescr">
                            <ItemRow>
                                <ItemCol size={7} isFlatUnderLg={true}>
                                    <ItemRow>
                                        <ItemCol size={3}>
                                            {(txtProfile.table1.prof as any)[lang]}<br/>
                                        </ItemCol>
                                        <ItemCol size={7}>
                                            <ItemRow>
                                                ({title})
                                            </ItemRow>
                                            <ItemRow>
                                                <span id="usertowertitle">
                                                    {
                                                        (function() {
                                                            if(towertitle !== "") {
                                                                return (<Icon alt="titletower" src={`${process.env.PUBLIC_URL}/general-img/title/${towertitle}.png`} />)
                                                            }
                                                        })()
                                                    }
                                                </span>
                                                <span className="title">{name}</span>
                                            </ItemRow>
                                        </ItemCol>
                                    </ItemRow>
                                    <ItemRow>
                                        <ItemCol size={3}>
                                            {(txtProfile.table1.comment as any)[lang]}<br/>
                                            {
                                                (function() {
                                                    if(selfUser) {
                                                        return (
                                                            <Button onClick={setCommentDlgOpen}>
                                                                {(txtProfile.button.changecomment as any)[lang]}
                                                            </Button>
                                                        )
                                                    }
                                                })()
                                            }
                                        </ItemCol>
                                        <ItemCol size={7} className="text-left">
                                            {comment}
                                        </ItemCol>
                                    </ItemRow>
                                    <hr className="col-12"/>
                                    <ItemRow style={{justifyContent: 'center'}}>
                                        {(txtProfile.click as any)[lang]}
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
                                                        link={"/skill/2/"+id+"/gf/1/skilldesc"}
                                                        skill={gskill} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">NX</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/2/"+id+"/gf/1/skilldesc"}
                                                        skill={gskillnx} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">EX</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/10/"+id+"/gf/1/skilldesc"}
                                                        skill={gskillex} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">MX</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/8/"+id+"/gf/1/1"}
                                                        skill={gskillmx} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">RE</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/5/"+id+"/gf/1/1"}
                                                        skill={gskilltbre} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">TB</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/6/"+id+"/gf/1/1"}
                                                        skill={gskilltb} />
                                                </ItemCol>
                                            </ItemRow>
                                        </ItemCol>
                                        <ItemCol size={5} className="text-center">
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">HV</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/2/"+id+"/dm/1/skilldesc"}
                                                        skill={dskill} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">NX</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/2/"+id+"/dm/1/skilldesc"}
                                                        skill={dskillnx} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">EX</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/10/"+id+"/dm/1/skilldesc"}
                                                        skill={dskillex} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">MX</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/8/"+id+"/dm/1/1"}
                                                        skill={dskillmx} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">RE</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/5/"+id+"/dm/1/1"}
                                                        skill={dskilltbre} />
                                                </ItemCol>
                                            </ItemRow>
                                            <ItemRow keepDirHor={true}>
                                                <ItemCol size={3} className="text-right">TB</ItemCol>
                                                <ItemCol size={7} className="text-center">
                                                    <SingleSkillColorChanger
                                                        link={"/skill/6/"+id+"/dm/1/1"}
                                                        skill={dskilltb} />
                                                </ItemCol>
                                            </ItemRow>
                                        </ItemCol>
                                    </ItemRow>
                                    <ItemRow keepDirHor={true}>
                                        <ItemCol size={5} className="text-center">
                                            <ProfileRecent type="gf" id={id} />
                                        </ItemCol>
                                        <ItemCol size={5} className="text-center">
                                            <ProfileRecent type="dm" id={id} />
                                        </ItemCol>
                                    </ItemRow>
                                </ItemCol>
                                <ItemCol size={3} className="d-none d-md-block">
                                    <ProfileBoard
                                        id={id}
                                        visibleLg={true} />
                                </ItemCol>
                            </ItemRow>
                        </BodyContent>
                    </ItemRow>

                    <ItemRow className="text-center" id="btnGroups">
                        <ProfileButton isOwnAccount={isOwnAccount} id={id} />
                    </ItemRow>
                    
                    <ItemRow id="targetTable" setVertical={true}>
                        <BodyHeader>
                            <h3>{(txtProfile.detail as any)[lang]}</h3>
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
                                            <th>{(txtProfile.detailed.s as any)[lang]}</th>
                                            <td id="tableGskill">{tdGskill}</td>
                                            <td id="tableDskill">{tdDskill}</td>
                                        </tr>
                                        <tr>
                                            <th>{(txtProfile.detailed.clv as any)[lang]}</th>
                                            <td id="tableGclear">{tdGclear}</td>
                                            <td id="tableDclear">{tdDclear}</td>
                                        </tr>
                                        <tr>
                                            <th>{(txtProfile.detailed.flv as any)[lang]}</th>
                                            <td id="tableGfc">{tdGfc}</td>
                                            <td id="tableDfc">{tdDfc}</td>
                                        </tr>
                                        <tr>
                                            <th>{(txtProfile.detailed.elv as any)[lang]}</th>
                                            <td id="tableGexc">{tdGexc}</td>
                                            <td id="tableDexc">{tdDexc}</td>
                                        </tr>
                                        {
                                            (function() {
                                                if(opencount === "N" && !selfUser) {
                                                    return (
                                                        <tr>
                                                            <th id="tableAcnt">{(txtProfile.detailed.count as any)[lang]}<br/>Closed</th>
                                                            <td id="tableGcnt">Closed</td>
                                                            <td id="tableDcnt">Closed</td>
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <tr>
                                                            <th id="tableAcnt">{(txtProfile.detailed.count as any)[lang]}<br/>{thTotalCnt}</th>
                                                            <td id="tableGcnt">{tdGcnt}</td>
                                                            <td id="tableDcnt">{tdDcnt}</td>
                                                        </tr>
                                                    )
                                                }
                                            })()
                                        }
                                        
                                    </table>
                                    <ItemRow id="countupdate">
                                        {
                                            (function() {
                                                if(selfUser) {
                                                    return (
                                                        <Fragment>
                                                            <Button onClick={countUpdate}>
                                                                {(txtProfile.button.countupdate as any)[lang]}
                                                            </Button>
                                                            <Button onClick={setCountDlgOpen}>
                                                                {(txtProfile.button.setdataopen as any)[lang]}
                                                            </Button>
                                                        </Fragment>
                                                    )
                                                }
                                            })()
                                        }
                                    </ItemRow>
                                    <span className="prof-table" dangerouslySetInnerHTML={{
                                        __html:(txtProfile.detailed.countdesc as any)[lang]
                                    }}>
                                    </span><br/>
                                    <ItemRow id="reset">
                                        {
                                            (function() {
                                                if(selfUser) {
                                                    return (
                                                        <Link to={"/reset"}>
                                                            <Button type="submit">
                                                                {(txtProfile.button.reset as any)[lang]}
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
                                        id={id}
                                        visibleLg={false} />
                                </ItemCol>
                            </ItemRow>
                        </BodyContent>
                    </ItemRow>
                </Container>
            </>
        )
    }
})

export default Profile