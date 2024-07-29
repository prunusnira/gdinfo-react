import CommonLayout from '@/component/layout/commonLayout';
import Loading from '@/component/loading/loading';
import usePopup from '@/component/popup/usePopup';
import { atomLanguage } from '@/jotai/language';
import txtProfileEn from '@/lang/user/profile/txtProfile-en';
import txtProfileJp from '@/lang/user/profile/txtProfile-jp';
import txtProfileKo from '@/lang/user/profile/txtProfile-ko';
import ModalComment from '@/module/user/profile/modalComment';
import ModalInfoOpen from '@/module/user/profile/modalInfoOpen';
import { ItemRow } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePresenter from './profilePresenter';
import useComment from './useComment';
import useInfoOpen from './useInfoOpen';
import useProfileLoader from './useProfileLoader';

const Profile = () => {
    const [comment, setComment] = useState('');
    const [nextComment, setNextComment] = useState('');
    const { id } = useParams();
    const { profileData, isOwnAccount, isLoading } = useProfileLoader({ id, setComment });
    const [isCommentOpen, setCommentDlgOpen, closeComment, submitComment] = useComment({
        id,
        nextComment,
        setComment,
    });
    const {
        isInfoOpen,
        isInfoDlgOpen,
        setInfoDlgOpen,
        setInfoDlgClose,
        setSubmitData,
        forceCountUpdate,
    } = useInfoOpen();
    const {openPopup} = usePopup();

    const lang = useAtomValue(atomLanguage)
    const txtProfile = lang === "ko" ? txtProfileKo : lang === "jp" ? txtProfileJp : txtProfileEn;

    const [infoOpen, setInfoOpen] = useState(isInfoOpen);

    useEffect(() => {
        if(isInfoDlgOpen) {
            openPopup({
                props: {
                    title: txtProfile.button.setdataopen,
                    contents: (
                        <>
                            <ItemRow>
                                <label id="opencntLabelYes" style={{color: "black"}}>
                                    <input type="radio" name="opencount" value="Y"
                                           checked={infoOpen}
                                           onChange={() => {
                                               setInfoOpen(true)
                                           }} />
                                    &nbsp;
                                    {txtProfile.dataopen.yes}
                                </label>
                            </ItemRow>
                            <ItemRow>
                                <label id="opencntLabelNo" style={{ color: 'black' }}>
                                    <input type="radio" name="opencount" value="N"
                                           checked={!infoOpen}
                                           onChange={() => {
                                               setInfoOpen(false);
                                           }} />
                                    &nbsp;
                                    {txtProfile.dataopen.no}
                                </label>
                            </ItemRow>
                        </>
                    ),
                    buttonCount: 2,
                    onClickBtn1: () => {
                        if(id) {
                            setSubmitData(
                                {id, open: infoOpen, submit: true},
                            )
                        }
                    },
                },
            })
        }
    }, [isInfoDlgOpen]);

    return (
        <CommonLayout>
            {isLoading ? <Loading /> : <></>}

            {profileData && id ?
                <ProfilePresenter
                    isInfoOpen={isInfoOpen}
                    comment={comment}
                    nextComment={nextComment}
                    isCommentOpen={isCommentOpen}
                    isOwnAccount={isOwnAccount}
                    profileData={profileData}
                    id={id}
                    setCommentDlgOpen={setCommentDlgOpen}
                    setInfoDlgOpen={setInfoDlgOpen}
                    infoUpdate={forceCountUpdate}
                /> : <></>
            }

            {id ?
                <ModalInfoOpen
                    isInfoDlgOpen={isInfoDlgOpen}
                    isInfoOpen={isInfoOpen}
                    id={id}
                    setSubmitData={setSubmitData}
                    setCountDlgClose={setInfoDlgClose}
                /> : <></>
            }

            {id ?
                <ModalComment
                    isCommentOpen={isCommentOpen}
                    id={id}
                    submitComment={submitComment}
                    closeComment={closeComment}
                    setNextComment={setNextComment}
                /> : <></>
            }
        </CommonLayout>
    );
};

export default Profile;
