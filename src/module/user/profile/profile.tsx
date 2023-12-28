import Error404 from '@/module/error/404';
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
    const { profileData, isOwnAccount } = useProfileLoader({ id, setComment, setOpenUserInfo });
    const [isCommentOpen, setCommentDlgOpen, closeComment, submitComment] = useComment({
        id,
        nextComment,
        setComment,
    });
    const { isInfoOpen, setInfoDlgOpen, setInfoDlgClose, submitOpen, forceCountUpdate, updateOpenValue } =
        useInfoOpen(setOpenUserInfo);

    if (profileData == null) {
        return <>Loading...</>;
    }
    if (id) {
        return (
            <ProfilePresenter
                isInfoOpen={isInfoOpen}
                openUserInfo={openUserInfo}
                updateOpenValue={updateOpenValue}
                submitOpen={submitOpen}
                setInfoDlgClose={setInfoDlgClose}
                comment={comment}
                nextComment={nextComment}
                isCommentOpen={isCommentOpen}
                submitComment={submitComment}
                closeComment={closeComment}
                setNextComment={setNextComment}
                isOwnAccount={isOwnAccount}
                profileData={profileData}
                id={id}
                setCommentDlgOpen={setCommentDlgOpen}
                setInfoDlgOpen={setInfoDlgOpen}
                infoUpdate={forceCountUpdate}
            />
        );
    }
    return <Error404 />;
};

export default Profile;
