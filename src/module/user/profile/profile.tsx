import CommonLayout from '@/component/layout/commonLayout';
import Loading from '@/component/loading/loading';
import ModalComment from '@/module/user/profile/modalComment';
import ModalInfoOpen from '@/module/user/profile/modalInfoOpen';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePresenter from './profilePresenter';
import useComment from './useComment';
import useInfoOpen from './useInfoOpen';
import useProfileLoader from './useProfileLoader';

const Profile = () => {
    const [comment, setComment] = useState('');
    const [nextComment, setNextComment] = useState('');
    const [openUserInfo, setOpenUserInfo] = useState('N');
    const { id } = useParams();
    const { profileData, isOwnAccount, isLoading } = useProfileLoader({ id, setComment, setOpenUserInfo });
    const [isCommentOpen, setCommentDlgOpen, closeComment, submitComment] = useComment({
        id,
        nextComment,
        setComment,
    });
    const { isInfoOpen, setInfoDlgOpen, setInfoDlgClose, submitOpen, forceCountUpdate, updateOpenValue } =
        useInfoOpen(setOpenUserInfo);

    return (
        <CommonLayout>
            {isLoading ? <Loading /> : <></>}

            {profileData && id ?
                <ProfilePresenter
                    isInfoOpen={isInfoOpen}
                    openUserInfo={openUserInfo}
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
                    isCountOpen={isInfoOpen}
                    opencount={openUserInfo}
                    id={id}
                    updateOpenValue={updateOpenValue}
                    submitOpen={submitOpen}
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
